import { Component } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default class CityTabs extends Component{
    render(){
        return(
            <>
            <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    > 
      <Tab eventKey="home" title="City Name">
      <p> {this.props.display_name}</p>
      </Tab>
      <Tab eventKey="profile" title="Geographic coordination">
      <p>City latitude {this.props.lat} </p>
      <p>City longitude {this.props.lon}</p> 
      </Tab>
    </Tabs>
    </>
        )
    }
}