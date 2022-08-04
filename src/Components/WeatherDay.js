import { Component } from "react";

export default class WeatherDay extends Component{

    render(){

        return (
            <>
            <p>{this.props.date} {this.props.description} <br></br> Data saved at: {this.props.dataSaveDate}</p>
            </>
        )
    }
}