import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import Product from "./panels/Products";
import Order from "./panels/Orders";
import Analytics from "./panels/Analytics";
import Feedback from "./panels/Feedback";
import axios from "axios";
import {CartURL, AURL} from "./config";
import { PushSpinner } from "react-spinners-kit";


class MerchantDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            rightPanel : 0,
            isLoading: true,
            order: [],
            buffering: false,
            totalTransaction: null,
            avgBasket: null,
            occurrences: null,
            totalScanned: null,
            totalItems: null,
            transData: null,
            filteredOrders: []
        }
    }
    

    async componentDidMount() {
        //Make all synchronous call using Promise
        try{
            await Promise.all([
                axios.get(`${CartURL}cart`).then(res => {
                    this.setState({
                        order: res.data.cartDetails,
                        filteredOrders: res.data.cartDetails,
                    })
                }),

                axios.get(`${AURL}tTrans`).then(res => {
                    this.setState({
                        totalTransaction: res.data
                    });
                }),
            
                axios.get(`${AURL}avgBasket`).then(res => {
                    this.setState({
                        avgBasket: res.data.avg,
                        totalItems: res.data.total
                    });
                }),
            
                axios.get(`${AURL}mostScanned`).then(res => {
                    this.setState({
                        occurrences: res.data.occurrences,
                        totalScanned: res.data.total,
                    });
                }),

                axios.get(`${AURL}TransactionSeries`).then(res => {
                    this.setState({
                        transData: res.data.data,
                    });
                }),
            ]);

            this.setState({
                isLoading: false,
            });
        }catch (e) {
            console.log(e);
        }
    }

    orderFilter = (e) => {
        var letterNumber = /^[0-9a-zA-Z]+$/;
        if(e.target.value === "" || e.target.value === null){
            this.setState({
                filteredOrders: this.state.order
            })
        } else if(e.target.value.match(letterNumber)) {
            let arr = this.state.order.filter((item)=>{
                return(
                    item._id.toLowerCase().search(e.target.value.toLowerCase()) !== -1
                )
            })
            this.setState({filteredOrders: arr});
        }
    }    

    handleClick = (val) =>{
        switch(val){
            case 0:
                this.setState({
                    rightPanel: 0
                });
                break;
            case 1:
                this.setState({
                    rightPanel: 1
                });
                break;
            case 2:
                this.setState({
                    rightPanel: 2
                });
                break;
            case 3:
                this.setState({
                    rightPanel: 3
                });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading ? <div className="dLoader"><PushSpinner size={50} color="#BDE8D1" loading={this.state.isLoading} /></div>  :
                <Container fluid>
                    <Row>
                        <Col md={2} style={{minHeight:"100vh",backgroundColor:"#BDE8D1", borderRightColor:"#015E0D", borderRightStyle:"solid", borderRightWidth:"thick",  textAlign:"left"}}>
                            <div style={{marginTop:"3%"}}>
                                <button style={{margin:"1.5em"}} className={this.state.rightPanel===0 ? "sidePanelHighlight" : ""} onClick={() => this.handleClick(0)}><h5 className="hoverDiv" style={{fontWeight:"bold"}}>Analytics</h5></button>
                                <button style={{margin:"1.5em"}} className={this.state.rightPanel===1 ? "sidePanelHighlight" : ""} onClick={() => this.handleClick(1)}><h5 className="hoverDiv" style={{fontWeight:"bold"}}>Orders</h5></button>
                                <button style={{margin:"1.5em"}} className={this.state.rightPanel===2 ? "sidePanelHighlight" : ""} onClick={() => this.handleClick(2)}><h5 className="hoverDiv" style={{fontWeight:"bold"}}>Products</h5></button>
                                <button style={{margin:"1.5em"}} className={this.state.rightPanel===3 ? "sidePanelHighlight" : ""} onClick={() => this.handleClick(3)}><h5 className="hoverDiv" style={{fontWeight:"bold"}}>Feedback</h5></button>
                            </div>
                        </Col>
                        <Col style={{padding: 0}}>
                            {this.state.rightPanel === 0 && <Analytics 
                                total_transactions = {this.state.totalTransaction}
                                avg_basket = {this.state.avgBasket}
                                total_sold = {this.state.totalItems}
                                items_scanned = {this.state.totalScanned}
                                order = {this.state.order.slice(0,5)}
                                transData = {this.state.transData}
                                mostScanned = {this.state.occurrences}
                                />}
                            {this.state.rightPanel === 1 && <Order order={this.state.filteredOrders} orderFilter={this.orderFilter}/>}
                            {this.state.rightPanel === 2 && <Product />}
                            {this.state.rightPanel === 3 && <Feedback/>}
                        </Col>
                    </Row>
                </Container>}
            </div>
        );
    }
}

export default MerchantDashboard;