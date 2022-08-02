import { Component } from 'react';
import './App.css';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WeatherInfo from './weather';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      user:'',
      cityInfo:'',
      image:'',
      key:'',
      weather:[],
      clouds:[],
      test:'',
    }
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    console.log(e.target.userSearch.value);
    this.setState({key: process.env.REACT_APP_MAP_API_KEY});
    if (e.target.userSearch.value !='' && (e.target.userSearch.value=='Amman' || e.target.userSearch.value=='Seattle' || e.target.userSearch.value=='Paris' )){
      axios.get(`https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_MAP_API_KEY}&q=${e.target.userSearch.value}&format=json`)
    .then(resp => {
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

    
    if (e.target.userSearch.value!='Amman' || e.target.userSearch.value!= "Seattle" || e.target.userSearch.value!= "Paris"){
    axios.get(`http://localhost:3000/weather?name=${e.target.userSearch.value}&lot=${cityInfo.data[0].lat}&lat=${cityInfo.data[0].lon}`)
   
    const getBack = await axios.get('http://localhost:3000/weather')
    let usefullData = getBack.data.data.splice(-3)[1]
    this.setState ({weather: this.state.weather = usefullData})
    console.log(this.state.weather)
    console.log (usefullData.data[0].weather.description)
    
    const displayData = [`day: ${this.state.weather.data[0].valid_date} `,`description: ${this.state.weather.data[0].weather.description} `,`day: ${this.state.weather.data[1].valid_date} `,`description: ${this.state.weather.data[1].weather.description} `]
    this.setState({clouds: this.state.clouds=displayData})
    
    console.log(displayData)
    }

    }

else return alert("Please choose a valid city: Amman, Seattle or Paris")
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
       
        <img src={this.state.image} />

      </div>
      {/* <WeatherInfo {...this.props} {...this.state} /> */}
      <a>{this.state.clouds[0]}</a>
      <a>{this.state.clouds[1]}</a>
      <a>{this.state.clouds[2]}</a>
      <a>{this.state.clouds[3]}</a>
    </div>
  );
}
}

export default App;
