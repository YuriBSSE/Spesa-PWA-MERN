import React from 'react';
import {Row, Container, Col} from 'react-bootstrap';
import Switch from 'react-switch';
import '../../css/style.css';

class MerchantLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "activationStatus" : this.props.activationStatus
        };
    }

    handleChange =() =>{
        this.props.handleSwitchChange(this.props.id, this.props.activationStatus);
        this.setState({
            "activationStatus" : !this.state.activationStatus
        });
    }

    render(){
        return(
            <Container fluid >
                <Row className="align-items-center merInfoDiv" style={{minHeight: "3.5em", paddingLeft:0, paddingRight:0}}>
                    <Col>
                        {this.props.merchant}
                    </Col>
                    <Col>
                        {this.props.contactName}
                    </Col>
                    <Col>
                        {this.props.email}
                    </Col>
                    <Col xs ={2}>
                        <Switch onChange={this.handleChange} checked={this.state.activationStatus} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MerchantLine;