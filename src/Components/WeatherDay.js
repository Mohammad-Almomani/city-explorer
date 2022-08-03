import { Component } from "react";

export default class WeatherDay extends Component{

    render(){

        return (
            <>
            <p>{this.props.date} {this.props.description}</p>
            </>
        )
    }
}