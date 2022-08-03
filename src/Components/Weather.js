import { Component } from "react";
import WeatherDay from "./WeatherDay";

export default class WeatherInfo extends Component{

    render (){
        return (
            <>
                { this.props.weather.data.map(day => {

                    return (
                        <>
                                {console.log(day)}
                                <WeatherDay date={day.date} description={day.description}/>                      
                        </>

                    )
                })


                }
            </>
        )
    }
}