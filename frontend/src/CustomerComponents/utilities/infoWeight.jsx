import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import {AiFillSetting, AiFillInfoCircle} from 'react-icons/ai';

class InfoWeight extends React.Component {
    render(){
        return(
            <div>
                 <Container style={{backgroundColor:"#BDE8D1", marginTop:"1em", padding:"1em", textAlign:"left", color:"#015E0D", marginBottom:"1em"}}>
                    <Row>
                        <Col xs="1">
                            <AiFillInfoCircle style={{fontSize:"1.5em", color:"#015E0D"}} />
                        </Col>
                        <Col>
                            <Container>
                                <Row style={{marginBottom:"1em"}}>
                                    Please ensure the weight displayed on the scale is displayed on the scale is visible in the photo
                                </Row>
                                <Row>
                                    <h6>The photo will appear on your digital receipt as proof of your purchase.</h6>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <div 
                    style={{width:"50%", padding:"1em", borderRadius:"1em", margin:"auto", backgroundColor:"#015E0D", color:"white"}}
                    onClick={this.props.turnOffInfo}
                    >
                    Launch Camera
                </div>
                <div className="container" style={{color:"#015E0D", textAlign:"left"}}>
                    <Container style={{marginTop:"2em", borderRadius:"1em", overflow:"hidden", boxShadow:"rgba(0,0,0,0.8) 0 0 2px"}}>
                        <Row>
                            <Col xs="2" style={{backgroundColor: "#BDE8D1", display:"flex", justifyContent:"center"}}><AiFillSetting style={{marginTop:"1em", fontSize:"1.2em", color:"#015E0D"}} /></Col>
                            <Col>
                                <Container style={{padding:"1em .5em", textAlign:"left"}}>
                                    <Row style={{marginBottom:"1em", fontWeight:"bold"}}>
                                        <Col xs="12">Here's How it works</Col>
                                    </Row>
                                    <Row style={{marginBottom:"1em"}}>
                                        <Col sm="3" xs="5"><h6>Step 1</h6></Col>
                                        <Col>Place the item on a nearby scale without any plastic bag</Col>
                                    </Row>
                                    <Row style={{marginBottom:"1em"}}>
                                        <Col sm="3" xs="5"><h6>Step 2</h6></Col>
                                        <Col>Take a photo of the scale with the item on them using Spesa app</Col>
                                    </Row>
                                    <Row style={{marginBottom:"1em"}}>
                                        <Col sm="3" xs="5"><h6>Step 3</h6></Col>
                                        <Col>Enter the produce and the weight displayed on the scale to add item to your basket</Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </div> 
               
            </div>
            
        )
    }
}

export default InfoWeight;