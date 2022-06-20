import React from "react";
import {Container, Row, Col} from 'react-bootstrap';

class OrderLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDate: this.props.orderDate,
            orderTime: this.props.orderTime,
            orderId : this.props.orderId
        }
    }


    render() {
        return (
            <Container fluid>
                <Row className="align-items-center" style={{minHeight: "3em", color:"#015E0D" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thin"}}>
                        <Col>
                            {this.state.orderDate}
                        </Col>
                        <Col>
                            {this.state.orderTime}
                        </Col>
                        <Col>
                            {this.state.orderId}
                        </Col>
                    </Row>
            </Container>
        );
    }
}

export default OrderLine;