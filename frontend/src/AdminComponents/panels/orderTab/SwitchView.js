import React from "react";
import {Container, Row, Col} from 'react-bootstrap';

class SwitchView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId : this.props.orderId,
            orderTotal : this.props.orderTotal
        }
    }


    render() {
        return (
            <Container fluid>
                <Row className="align-items-center" style={{minHeight: "3em", color:"#015E0D" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thin"}}>
                        <Col>
                            <div className="hoverDiv" onClick={()=>this.props.handleItemView(this.state.orderId)}>View</div>
                        </Col> 
                        <Col>
                            {this.state.orderTotal}
                        </Col>
                    </Row>
            </Container>
        );
    }
}

export default SwitchView;