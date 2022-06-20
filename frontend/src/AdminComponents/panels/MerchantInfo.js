import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import MerchantLine from './merchantLine/MerchantLine';

class MerchantInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            merchant: [],
        }
    }

    render(){
        return(         
            <Container fluid>
                <Row className="align-items-center" style={{height: "6em", color:"#015E0D" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thick"}}>
                    <Col>
                        <h5 style={{fontWeight:"bold"}}>Merchant</h5>
                    </Col>
                    <Col>
                        <h5 style={{fontWeight:"bold"}}>Contact Name</h5>
                    </Col>
                    <Col>
                        <h5 style={{fontWeight:"bold"}}>Email</h5>
                    </Col>
                    <Col xs={2}>
                        <h5 style={{fontWeight:"bold"}}>Activation Status</h5>
                    </Col>
                </Row> 
                <Row>
                    {this.props.merchant.map((item, index) => (
                        <MerchantLine key={index} handleSwitchChange={this.props.handleSwitchChange} id={item._id} activationStatus={item.isMerchant} merchant={item.merchant} contactName={item.username} email={item.email}/>
                        ))}
                </Row>
            </Container>
        )
    }
}

export default MerchantInfo;