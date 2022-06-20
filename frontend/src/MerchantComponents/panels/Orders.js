import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import OrderLine from "./orderTab/OrderLine";
import SwitchView from "./orderTab/SwitchView";
import OrderInfo from './orderTab/OrderInfo';
import "../css/style.css";


class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderView: false,
            selectedItem : {},
            
        };
    }

    getTime = (obj) => {
        var d = new Date(obj);
        return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }
    getDate = (obj) => {
        var d = new Date(obj);
        return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    }
    handleItemView = (id) => {
        let arr = this.props.order.find(x => x._id === id);
        this.setState({
            selectedItem: arr,
            orderView: true
        });
    }
    closeItemView = () => {
        this.setState({
            orderView: false
        });
    }


    render() {
        
        return(
            <>
            <div>
                <div className="search__container_merchant">
                    <input className="search__input_merchant" type="text" placeholder="search" name="search" onChange={this.props.orderFilter} />
                </div>
                <Container fluid>
                    <Row className="align-items-center" style={{height: "6em", color:"#015E0D" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thick"}}>
                        <Col>
                            <h5 style={{fontWeight:"bold", margin:0}}>Order Date</h5>
                        </Col>
                        <Col>
                            <h5 style={{fontWeight:"bold", margin:0}}>Order Time</h5>
                        </Col>
                        <Col>
                            <h5 style={{fontWeight:"bold", margin:0}}>Order Id</h5>
                        </Col>
                        <Col xs={2}>
                            <h5 style={{fontWeight:"bold", margin:0}}>Order List</h5>
                        </Col>
                        <Col xs ={2}>
                            <h5 style={{fontWeight:"bold", margin:0}}>Order Total</h5>
                        </Col>
                    </Row> 
                    <Row>
                        <Col style={{padding:0}}>
                            {this.props.order!==[] && this.props.order.map((item, index) => (
                                <OrderLine key={index} orderDate={this.getDate(item.createdAt)} orderId={item._id} orderTime={this.getTime(item.createdAt)} />
                            ))}
                        </Col>
                        {this.state.orderView===false ? <Col style={{padding:0}} xs ={4}>
                            {this.props.order!==[] && this.props.order.map((item, index) => (
                                <SwitchView key={index} orderId={item._id} handleItemView={this.handleItemView} orderTotal={item.total}  selectedItem={this.selectedItem} />
                            ))}
                        </Col>
                        : <Col style={{padding:0, minHeight:"88vh", backgroundColor:"#BDE8D1", color:"#015E0D"}} xs ={4}>
                            <OrderInfo closeItemView={this.closeItemView}  selectedItem={this.state.selectedItem}/>
                        </Col> }
                    </Row>
                </Container>
            </div>
            </>
        )
    }
}

export default Order;