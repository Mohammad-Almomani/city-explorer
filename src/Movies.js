import { Component } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default class MoviesRec extends Component{

    render (){
        return (
            <>
           
           <Row xs={1} sm={2} md={3} className="g-4">
                { this.props.moviesArr.data.map(mov => {

                    return (
                        <>
                    <Col>

                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${mov.path}`} />
                        <Card.Body>
                            <Card.Title>{mov.title}</Card.Title>
                            <Card.Text>
                            {mov.date}
                            </Card.Text>
                            <Card.Text>
                            {mov.des}
                            </Card.Text>
                            <Card.Text>
                            {mov.rate}
                            </Card.Text>
                        </Card.Body>
                        </Card>


                        </Col>
                             
                        {/* <p>{mov.title} {mov.date}</p> */}
                        </>

)
})


}
</Row>

           {/* <p>{this.props.weather.de.movscription}</p> */}
            </>
        )
    }
}