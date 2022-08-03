import { Component } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default class Movie extends Component {
    render (){
        return (
            <>
                <Col>

    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${this.props.path}`} />
    <Card.Body>
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Text>
        {this.props.date}
        </Card.Text>
        <Card.Text>
        {this.props.des}
        </Card.Text>
        <Card.Text>
        {this.props.rate}
        </Card.Text>
    </Card.Body>
    </Card>


    </Col>
            </>
        )
    }
}