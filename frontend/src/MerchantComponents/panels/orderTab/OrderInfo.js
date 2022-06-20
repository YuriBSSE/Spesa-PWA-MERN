import React from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import ImageModal from "../../utilities/ImageModal";
import {AiOutlineClose} from "react-icons/ai";


class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            item: this.props.selectedItem,
        };
    }
    render() {
        return(
            <div>
                <Container>
                    <Row className="align-items-center" style={{height: "5em", textAlign:"left"}}>
                        <Col xs ={3}>
                            <h6 style={{margin:0}}>Order ID:</h6>
                        </Col>
                        <Col >
                            {this.state.item._id}
                        </Col>
                        <Col xs={2}>
                            <Button variant="link" onClick={this.props.closeItemView}><AiOutlineClose style={{fontSize:"2em", color:"#015E0D"}} /></Button>
                        </Col>
                    </Row>
                    <Row style={{textAlign:"left"}}>
                        <Col>
                            <h6 style={{margin:0}}>Grocery List</h6>
                        </Col>
                    </Row>
                    {this.state.item.itemList.map((item, index) => (
                        <Row key={index} className="bottomBorderColor" style={{paddingTop: "1em", paddingBottom:"1em"}}>
                            <Col style={{textAlign: "left"}}>
                                <p className="itemM">{item.name}</p>
                                {item.brand && <p className="itemM">{item.brand}</p>}
                                {item.image && <div style={{marginLeft:"0.25em"}}><ImageModal image={item.image} height="1.5em"/></div>}
                            </Col>
                            <Col style={{textAlign: "right"}}>
                                <p className="itemM">{"$ "  + item.price * item.amount}</p>
                                <p className="itemM">{item.brand === null ? `${item.amount} kg` : `Qty: ${item.amount}`}</p>
                            </Col>
                        </Row>))}
                    <div style={{marginTop: "6em"}}>
                        <Row style={{textAlign: "left"}}>
                            <Col>
                                <h6>Order Summary</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{textAlign: "left"}}>
                                <p className="itemM">Subtotal</p>
                                <p className="itemM">Promo Code</p>
                                <p className="itemM">Delivery Fee</p>
                                <p className="itemM">Service Fee</p>
                                <p className="itemM">Taxes</p>
                            </Col>
                            <Col style={{textAlign: "right"}}>
                                <p className="itemM">{"$ " + this.state.item.subTotal}</p>
                                <p className="itemM">{"$ " + this.state.item.promoCode}</p>
                                <p className="itemM">$ 0.00</p>
                                <p className="itemM">{"$ "}</p>
                                <p className="itemM">{"$ " + this.state.item.tax}</p>
                            </Col>
                        </Row>
                        <Row style={{marginTop: ".5em"}}>
                            <Col style={{textAlign: "left"}}>
                                <h6>Order Total</h6>
                            </Col>
                            <Col style={{textAlign: "right"}}>
                                <h6 style={{paddingRight: ".25em"}}>{"$ " + this.state.item.total}</h6>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}

export default OrderInfo;