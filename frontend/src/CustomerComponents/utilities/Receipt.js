import React from 'react';
import {Row, Col, Container, Image} from 'react-bootstrap';
import {AiFillInfoCircle} from 'react-icons/ai';
import Logo from './logo.png';
import ImageModal from './ImageModal';
import numeral from "numeral";

class Receipt extends React.Component{

    constructor(props){
        super(props);
        this.state={
            itemList: [],
        }
    }

    getDate=()=>{
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        return `${month}/${day}/${year}`
    }

    getTime=()=>{
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return `${hours}:${minutes}:${seconds}`
    }

    scanExitCode=()=>{
        alert("SAD")
    }

    render(){
        function toChunkArray(myArray, chunkSize){
            var results = [];

            while (myArray.length) {
                results.push(myArray.splice(0, chunkSize));
            }

            return results;
        }
        let itemList = this.props.itemList.filter(item=>item.brand===null);
        let imgContent = toChunkArray(itemList, 4);
        
        return(
            <>
            <div style={{backgroundColor: "#BDE8D1", padding:"2.5em 1em 1.6em 1em" ,color:"#015E0D",}}>
                <h5 style={{maxWidth:"70%", marginLeft:"auto", marginRight:"auto", fontWeight:"bold"}}>Please scan the exit code before you leave the store</h5>
            </div>

            <div 
                    style={{width:"50%", padding:"1em", borderRadius:"1em", margin:"auto", backgroundColor:"#015E0D", color:"white", marginTop: '30px'}}
                    onClick={()=>this.props.feedback(4)}
                    >
                    Scan Exit Code
                </div>

            <div className="container" style={{color:"#015E0D"}}>
                    <Container style={{marginTop:"2em", borderRadius:"1em", boxShadow:"rgba(0,0,0,0.8) 0 0 2px"}}>
                        <Row style={{height:"5em", borderBottom:"2px solid #015E0D"}}>
                            <Col xs = {4} style={{textAlign:"left"}}>
                                <Image src={Logo} alt="logo" style={{height:"4em", width:"6em"}} fluid/>
                            </Col>
                            <Col style={{textAlign:"right"}}>
                                <p style={{margin:0}}>6133 University BLVD</p>
                                <p style={{margin:0}}>Vancouver, BC V6T 1Z1</p>
                                <b>
                                    {this.getDate()} {this.getTime()}
                                </b>
                            </Col>
                        </Row>
                        <Row className="align-items-center" style={{padding:".5em 0"}}>
                            <Col>
                            <h6>Purchase Receipt</h6>
                            </Col>
                            <Col>
                            <p style={{margin:0}}>Order ID {this.props.orderId}</p>
                            </Col>
                        </Row>
                        <Row  style={{padding:".25em 0", backgroundColor:"#BDE8D1"}}>
                            <Container fluid>
                                <Row className="align-items-center">
                                    <Col xs ={1}>
                                        <AiFillInfoCircle/>
                                    </Col>
                                    <Col style={{textAlign:"left", fontSize: ".8em"}}>
                                        A copy of this Receipt has been sent to your email address.
                                    </Col>
                                </Row>
                            </Container>
                        </Row>
                        <Row>
                            <Container style={{marginTop:"1em"}}>
                                {
                                    imgContent.map((rowArray, index)=>(
                                        <Row key={index} >
                                            {rowArray.map((item, index)=>(
                                                <Col key={index} xs={3} style={{marginBottom:"1em"}}>
                                                    <ImageModal image={item.image} height="3em"/>
                                                </Col>
                                            ))}
                                        </Row>
                                    ))
                                }
                            </Container>
                        </Row>
                        <Row style={{padding:".5em 0"}}>
                            <Container fluid style={{paddingBottom:".5em"}}>
                                <Row style={{borderBottom:"1px solid #BDE8D1"}}>
                                    <Col style={{textAlign:"left"}} xs={5}>
                                        <h6>Items</h6>
                                    </Col>
                                    <Col>
                                        <h6>Qty</h6>
                                    </Col>
                                    <Col>
                                        <h6>Price</h6>
                                    </Col>
                                    <Col>
                                        <h6>Total</h6>
                                    </Col>
                                </Row>
                                {this.props.itemList.map((item, index)=>{
                                    return(
                                    <Row className="align-items-center" style={{borderBottom:"1px solid #BDE8D1", padding:".25em 0"}} key={index}>
                                    <Col style={{textAlign:"left"}} xs={5}>
                                        <p style={{margin:0}}>{item.name}</p>
                                        {item.brand ? <p style={{margin:0}}>{item.brand}</p> : <p style={{margin:0}}>Brand, Weight</p>}
                                    </Col>
                                    <Col>
                                        <h6>{numeral(item.amount).format("0.00")}</h6>
                                    </Col>
                                    <Col>
                                        <h6>${numeral(item.price).format("0.00")}</h6>
                                    </Col>
                                    <Col>
                                        {/* <h6>{"$"+(item.price * item.amount).toFixed(2)}</h6> */}
                                        <h6>${numeral(item.price * item.amount).format("0.00")}</h6>
                                    </Col>
                                    </Row>
                                    )}
                                )}
                            </Container>
                        </Row>
                        <Row style={{padding:".5em 0", textAlign:"right"}}>
                            <Col xs ={9} >
                                <h6 style={{margin:0}}>Subtotal</h6>
                                <p style={{margin:0}}>Promo Code</p>
                                <p style={{margin:0}}>Tax</p>
                            </Col>
                            <Col>
                                <h6 style={{margin:0}}>${numeral(this.props.subTotal).format("0.00")}</h6>
                                <p style={{margin:0}}>${numeral(this.props.promoCode).format("0.00")}</p>
                                <p style={{margin:0}}>${numeral(this.props.tax).format("0.00")}</p>
                            </Col>
                        </Row>
                        <Row className="align-items-center" style={{height:"3em", backgroundColor:"#105E0D", color:"white"}}>
                            <Col xs ={9} style={{textAlign:"right"}}>
                                <h6 style={{margin:0}}>Order Total</h6>
                            </Col>
                            <Col>
                                <h6 style={{margin:0, textAlign:"right" }}>${numeral(this.props.total).format("0.00")}</h6>
                            </Col>
                        </Row>
                        <Row style={{padding:"1em 0"}} className="align-items-center">
                            <Col style={{textAlign:"right"}} >
                                Payment Method : 
                            </Col>
                            <Col>
                                <p style={{margin:0, textAlign:"right"}}>{this.props.payDescription}</p>
                            </Col>
                        </Row>
                    </Container>
                    {/* <button onClick={()=>this.props.feedback(3)}>I've exited the store</button> */}
                </div> 
            </>
        )
    }
}

export default Receipt;