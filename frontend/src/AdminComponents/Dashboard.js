import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import Order from "./panels/Orders";
import MerchantFeed from "./panels/MerchantFeed";
import UserFeed from "./panels/UserFeed";
import MerchantInfo from "./panels/MerchantInfo";
import axios from "axios";
import {CartURL, mFURL, usrFURL, URL} from "./config";
import { PushSpinner } from "react-spinners-kit";
import "./css/style.css";

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            rightPanel : 0,
            isLoading: true,
            order: [],
            forder: [],
            mfeed: [],
            fmfeed: [],
            ufeed: [],
            fufeed: [],
            merchant: [],
        }
    }

    async componentDidMount() {
        try{
        await axios.get(`${CartURL}cart`).then(res => {
            this.setState({
                order: res.data.cartDetails,
                forder: res.data.cartDetails    
            })
        });
        await axios(`${mFURL}`).then(
            (res) => {
                if(res.data.status){
                    this.setState({
                        mfeed: res.data.feedback,
                        fmfeed: res.data.feedback
                    })
                } else{
                    alert(res.data.message);
                }
            }).catch(
            (err) => {
                alert(err);
            }
        );
        await axios(`${usrFURL}`).then(
            (res) => {
                if(res.data.status){
                    this.setState({
                        ufeed: res.data.feedback,
                        fufeed: res.data.feedback,
                        isLoading: false
                    })
                } else{
                    alert(res.data.message);
                }
            }).catch(
            (err) => {
                alert(err);
            }
        );
        await axios.get(URL + 'user').then(res => {
            if(res.data.status){
                this.setState({
                    merchant: res.data.users,
                    isLoading: false
                })
            } else {
                console.log(res.data.message);
            }
        });
        this.setState({
            isLoading: false
        });
        }catch (e) {
            console.log(e);
        }
    }

    handleSwitchChange = (id, activationStatus) => {
        const arrIndex = this.state.merchant.findIndex(item => item._id === id);
        axios.put(URL + 'user/' + id, {isMerchant: !activationStatus}).then(res => {
            if(res.data.status){
                alert('Merchant status changed successfully');
            } else {
                alert(res.data.message);
            }
        }).catch(err => {
            alert(err);
        });
        let updatedArr = this.state.merchant;
        updatedArr[arrIndex].isMerchant = !activationStatus;
        this.setState({
            merchant: updatedArr
        });
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

    filterSearch = (e) => {
        var letterNumber = /^[0-9a-zA-Z]+$/;
        if(e.target.value === "" || e.target.value === null){
            this.setState({
                fmfeed: this.state.mfeed,
                fufeed: this.state.ufeed,
                forder: this.state.order
            })
        } else if(e.target.value.match(letterNumber) && this.state.rightPanel === 1) {
            let arr = this.state.order.filter((item)=>{
                return(
                    item._id.toLowerCase().search(e.target.value.toLowerCase()) !== -1
                )
            })
            this.setState({forder: arr});
        } else if(e.target.value.match(letterNumber) && this.state.rightPanel === 2) {
            let arr = this.state.mfeed.filter((item)=>{
                return(
                    item.feedback.toLowerCase().search(e.target.value.toLowerCase()) !== -1
                )
            })
            this.setState({fmfeed: arr});
        } else if(e.target.value.match(letterNumber) && this.state.rightPanel === 3) {
            let arr = this.state.ufeed.filter((item)=>{
                return(
                    item.feedback.toLowerCase().search(e.target.value.toLowerCase()) !== -1
                )
            })
            this.setState({fufeed: arr});
        }
    } 

    render() {
        return (
            <div>
                {this.state.rightPanel !== 0 &&
                <div className="search__container_admin">
                    <input className="search__input_admin" type="text" placeholder="search" name="search" onChange={this.filterSearch} />
                </div>}
                {this.state.isLoading ?
                <div className="dLoader">
                    <PushSpinner size={50} color="#BDE8D1" loading={this.state.isLoading} />
                </div> :
                <Container fluid>
                    <Row>
                        <Col md={2} style={{minHeight:"100vh", backgroundColor:"#BDE8D1", borderRightColor:"#015E0D", borderRightStyle:"solid", borderRightWidth:"thick", textAlign:"left"}}>
                            <div style={{marginTop:"3%"}}>
                                <button style={{margin:"1.5em"}} className={this.state.rightPanel===0 ? "sidePanelHighlight" : ""} onClick={() => this.handleClick(0)}><h5 className="hoverDiv" style={{fontWeight:"bold"}}>Merchant Info</h5></button>
                                <button style={{margin:"1.5em"}} className={this.state.rightPanel===1 ? "sidePanelHighlight" : ""} onClick={() => this.handleClick(1)}><h5 className="hoverDiv" style={{fontWeight:"bold"}}>Orders</h5></button>
                                <button style={{margin:"1.5em"}} className={this.state.rightPanel===2 ? "sidePanelHighlight" : ""} onClick={() => this.handleClick(2)}><h5 className="hoverDiv" style={{textAlign:"left", fontWeight:"bold"}}>Merchant Feedback</h5></button>
                                <button style={{margin:"1.5em"}} className={this.state.rightPanel===3 ? "sidePanelHighlight" : ""} onClick={() => this.handleClick(3)}><h5 className="hoverDiv" style={{fontWeight:"bold"}}>User Feedback</h5></button>
                            </div>
                        </Col>
                        <Col style={{padding: 0}}>
                            {this.state.rightPanel === 0 && <MerchantInfo merchant={this.state.merchant} handleSwitchChange={this.handleSwitchChange} />}
                            {this.state.rightPanel === 1 && <Order order={this.state.forder}/>}
                            {this.state.rightPanel === 2 && <MerchantFeed feed={this.state.fmfeed}/>}
                            {this.state.rightPanel === 3 && <UserFeed feed={this.state.fufeed}/>}
                        </Col>
                    </Row>
                </Container>}
            </div>
        );
    }
}

export default AdminDashboard;