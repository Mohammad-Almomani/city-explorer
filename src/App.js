import { Component } from 'react';
import './App.css';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      user:'',
      image:''
    }
  }


  handleSubmit = async(e) => {
    e.preventDefault();
    console.log(e.target.userSearch.value);
    const key = (process.env.REACT_APP_MAP_API_KEY);

    const cityInfo = await axios.get(`https://eu1.locationiq.com/v1/search?key=${key}&q=${e.target.userSearch.value}&format=json`);
    this.setState({user: cityInfo.data[0]})
    console.log(process.env.REACT_APP_MAP_API_KEY);


    
    const res = await fetch(`https://maps.locationiq.com/v3/staticmap?key=${key}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=1-18`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    this.setState({image: imageObjectURL});

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
      {/* <Tab eventKey="contact" title="Contact" disabled>
      </Tab> */}
    </Tabs>
        
          
         
          
        </div>
      <img src={this.state.image} />
    </div>
  );
}
}

export default App;
