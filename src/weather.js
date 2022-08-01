import { Component } from "react";


export default class WeatherInfo extends Component{
    constructor(props){
        super(props);
    }

    render (){
        return (
            <>
            <p> {this.props.weather.data[0].datetime}</p>
            {console.log(this.props.weather.data[0].datetime)}
            </>
        )
    }
}