import { Component } from "react";
import Row from 'react-bootstrap/Row';
import Movie from "./Movie";

export default class MoviesRec extends Component{

    render (){
        return (
            <>
           
           <Row xs={1} sm={1} md={3} className="g-4">
                { this.props.moviesArr.data.map(mov => {

                    return (
                        <>
                        <Movie  path ={mov.path} title={mov.title} date={mov.date} des={mov.des} rate={mov.rate} />
                        </>

                     )
                })
                }   
            </Row>
            </>
        )
    }
}