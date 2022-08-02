import { Component } from 'react';
import './App.css';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WeatherInfo from './weather';
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
      this.showWeather()
      this.setState({cityInfo: resp})
    })
    .catch(err => {
      console.error(err)
        alert(`${err}`)
    });
    const cityInfo = await axios.get(`https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_MAP_API_KEY}&q=${e.target.userSearch.value}&format=json`);      
    
    this.setState({user: cityInfo.data[0]})
    
    
    const res = await fetch(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAP_API_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=16`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    this.setState({image: imageObjectURL});

    console.log(this.state.weather.data)
  }

else return swal("Please choose a valid city, Example: Amman, Seattle or Paris")
}

showWeather = async(lat,lon)=> {
  try {
    const getBack = await  axios.get(`http://localhost:3000/weather?name=${this.state.searchQuery}`)
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
          
        <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    > 
      <Tab eventKey="home" title="City Name">
      <p> {this.state.user.display_name}</p>
      </Tab>
      <Tab eventKey="profile" title="Geographic coordination">
      <p>City latitude {this.state.user.lat} </p>
      <p>City longitude {this.state.user.lon}</p> 
      </Tab>
    </Tabs>

        </div>
      <div id='weather'>
        </div>
        
        <div>
       
        <img src={this.state.image} width="30%" />

      </div>
      {this.state.weather!=''&&
      <>
      <WeatherInfo weather={this.state.weather} />
      </>
      }

    </div>
  );
}
}

export default App;
