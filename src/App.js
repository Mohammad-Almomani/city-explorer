import { Component } from 'react';
import './App.css';
import axios from 'axios';
import WeatherInfo from './Components/Weather';
import MoviesRec from './Components/Movies';
import CityTabs from './Components/CityTabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      user:'',
      cityInfo:'',
      image:'',
      key:'',
      weather:'',
      clouds:[],
      test:'',
      searchQuery:'',
      moviesArr:'',
    }
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    console.log(e.target.userSearch.value);
  
    this.setState({key: process.env.REACT_APP_MAP_API_KEY,
    searchQuery: e.target.userSearch.value
    });
    if (e.target.userSearch.value !=''){
      axios.get(`https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_MAP_API_KEY}&q=${e.target.userSearch.value}&format=json`)
    .then(resp => {
      this.setState({cityInfo: resp})
    })
    .catch(err => {
      console.error(err)
      swal(`${err}`);
    });
    const cityInfo = await axios.get(`https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_MAP_API_KEY}&q=${e.target.userSearch.value}&format=json`);      
    this.showWeather(cityInfo.data[0].lat,cityInfo.data[0].lon)
    this.setState({user: cityInfo.data[0]})
    
    
    const res = await fetch(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAP_API_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=16`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    this.setState({image: imageObjectURL});
    
    console.log(this.state.weather.data)
    
    this.findMovies(e.target.userSearch.value)

    // console.time("dbsave");
    // console.timeEnd("dbsave");
  }

else return swal("Please choose a valid city, Amman, Seattle or Paris")
}

showWeather = async(lat,lon)=> {
  try {
    const getBack = await  axios.get(`${process.env.REACT_APP_SERVER_LINK}/weather?name=${this.state.searchQuery}&lon=${lon}&lat=${lat}`)
    console.log(getBack) 
    this.setState({
      weather: getBack,
    })
  } catch (err){
    swal(`We can't show weather info for ${this.state.searchQuery} \n ${err} \n click ok to show the map without weather info`)
    this.setState({
      weather: '',
    })
  };
}

findMovies = async(a)=> {
  try {
    const getMovie = await  axios.get(`${process.env.REACT_APP_SERVER_LINK}/movies?movieName=${a}`)
    this.setState({
      moviesArr: getMovie,
    })
  } catch (err){
    this.setState({
      moviesArr: '',
    })
  };
}

  render () {
    return (
      <div className="App"> 
      <div>
        <br></br>
      <h1>City Explore</h1>
      <br></br>
      </div>
      <div >
        <form onSubmit={this.handleSubmit}>
         <input type='text' id='userSearch' placeholder='Search for a city'></input>
          <button type='submit'>Explore!</button>
        </form>
      <br></br>

    </div>
        <div>
        {this.state.weather!=''&&(
          <CityTabs display_name={this.state.user.display_name} lat={this.state.user.lat} lon={this.state.user.lon} />
        )}
        </div>
      <div id='weather'>
        </div>
        
        <div>
        {this.state.weather!=''&&(
       
        <img src={this.state.image} width="30%" />
          )}
      </div>
      {this.state.weather==''&&(
        <p>Please choose a valid city, Example: Amman, Seattle or Paris</p>
      )}

      {this.state.weather!=''&&(
      <div id='weatherInfo'>
      <br></br>
      <WeatherInfo weather={this.state.weather} />
      <br></br>
      </div>
      )
      }
      {this.state.moviesArr!=''&&(
      <>
      <MoviesRec moviesArr={this.state.moviesArr} />
      </>
      )
      }

    </div>
  );
}
}

export default App;
