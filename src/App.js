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
      user:''
    }
  }


  handleSubmit = async(e) => {
    e.preventDefault();
    console.log(e.target.userSearch.value);
    const aa = await axios.get(`${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${e.target.userSearch.value}&format=json`);
    this.setState({user: aa.data[0]})
    console.log(aa.data[0].lon)
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
      defaultActiveKey="profile"
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
    </div>
  );
}
}

export default App;
