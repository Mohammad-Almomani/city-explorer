import { Component } from "react";


export default class WeatherInfo extends Component{

    render (){
        return (
            <>
            {/* {
                this.props.weather.data
            } */}

                { this.props.weather.data.map(day => {

                    return (
                        <>
                                {console.log(day)}
                        <p>{day.date} {day.description}</p>
                      
                        </>

                    )
                })


                }

           {/* <p>{this.props.weather.de.dayscription}</p> */}
            </>
        )
    }
}