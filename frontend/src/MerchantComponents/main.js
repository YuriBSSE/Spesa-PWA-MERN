import React from 'react';
import { Navbar, Nav, Image} from 'react-bootstrap';
import Login from './Login';
import Register from './Register';
import axios from 'axios';
import MerchantDashboard from './Dashboard';
import Unauthorized from './Unauthorized';
import {URL, EMAIL_URI} from './config'
import {setUserSession, removeUserSession} from './utilities/common';
import Logo from './images/logo.png';
import { PushSpinner } from "react-spinners-kit";

class MerchantMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDashboard: this.props.isMerchant,
            isLogin: (this.props.isUser && this.props.isMerchant) ? false : true,
            isRegister: false,
            isUnauthorized: false,
            isLoading: false,
            merchant: '',
            username: '',
            email: '',
            password: '',
            repassword: '',
        };
    }

    onInputChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    handleSignOut = () => {
        removeUserSession();
        this.setState({
            isDashboard: false,
            isLogin: true,
            isRegister: false,
            isUnauthorized: false,
        });
    }

    handleLogin = () => {
        this.setState({
            isLoading: true
        });
        if(this.state.email!=='' && this.state.password!==''){
            axios.post(`${URL}login`, {email: this.state.email, password: this.state.password}).then(
                res => {
                    this.setState({
                        isLoading: false
                    });                    
                    if(res.data.status) {
                        setUserSession(res.data.user_id);
                        this.setState({
                            isLogin: false,
                            isRegister: false,
                        });
                        if(res.data.isMerchant) {
                            this.setState({
                                isDashboard: true
                            });
                        } else{
                            this.setState({
                                isUnauthorized: true
                            });
                        }
                    } else {
                        alert(res.data.message);
                    }
                }
            )
        } else {
            alert('Please fill all the fields');
            this.setState({
                isLoading: false
            });
        }
    }

    handleRegister = () => {
        this.setState({
            isLoading: true
        });
        if(this.state.email!=='' && this.state.merchant!=='' && this.state.username!=='' && this.state.password!=='' && this.state.repassword!==''){
            if(this.state.password === this.state.repassword){
                axios.get(`${EMAIL_URI}&email=${this.state.email}`)
                .then(response => {
                    if(response.data.quality_score >=0.5){
                        axios.post(`${URL}register`, {email: this.state.email, password: this.state.password, merchant: this.state.merchant, userName: this.state.username}).then(
                            res => {
                                this.setState({
                                    isLoading: false
                                });                                
                                setUserSession(res.data.user_id);
                                if(res.data.status) {
                                    this.setState({
                                        isLogin: false,
                                        isRegister: false
                                    });
                                    if(res.data.isMerchant) {
                                        this.setState({
                                            isDashboard: true
                                        });
                                    } else{
                                        this.setState({
                                            isUnauthorized: true
                                        });
                                    }
                                } else {
                                    alert(res.data.message);
                                }
                            }
                        )
                    } else alert("Email is not valid")
                })
                .catch(error => {
                    console.log(error);
                });
            } else alert("Password is not match")
        } else {
            alert("Please enter all fields");
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        return(
            <div>
                <div className="dLoader"><PushSpinner size={50} color="#BDE8D1" loading={this.state.isLoading} /></div>
                <div style={{borderBottomColor:"#015E0D", borderBottomWidth:"thick", borderBottomStyle:"solid", color:"#015E0D"}} >
                    <Navbar bg="light" expand="lg">
                    <Navbar.Brand style={{paddingTop:"1.8%", marginRight: "4em", marginLeft:"1.3em"}}>
                        <Image src={Logo} alt="logo" style={{height:"2em", width:"8em"}} fluid/>
                    </Navbar.Brand>
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ height: '75px' }}
                    navbarScroll
                    >
                    <h3 style={{margin:0, marginTop: "auto", marginBottom:"auto"}}>Merchant Portal</h3>
                    </Nav>
                    {(this.state.isDashboard || this.state.isUnauthorized) && <div className="hoverDiv" onClick={this.handleSignOut} style={{margin:0, marginTop: "auto", marginBottom:"auto"}}><h5 style={{margin:0}}>Sign out</h5></div>}
                    </Navbar>
                </div>
                
                {this.state.isLogin && 
                <div>
                    <div style={{backgroundColor:"#015E0D", padding:"3em", paddingLeft:"10%", textAlign:"left", color:"white", fontSize:"2.5em"}}>
                        Welcome to the Merchant Portal
                    </div>
                    <div style={{paddingLeft:"10%", paddingBottom:"10%"}}>
                        <Login onInputChange={this.onInputChange}/>
                        <div style={{flexDirection:"row", display:"flex", marginTop:"2em"}}>
                        <div 
                            style={{width:"20%", padding:"0.5em", borderRadius:".5em", backgroundColor:"#015E0D", color:"white", marginTop:"1em", cursor:"pointer", textAlign:"center"}} onClick={this.handleLogin}
                            >Login</div>
                        <div 
                            style={{width:"20%", padding:"0.5em", borderRadius:".5em", marginLeft:"3em", boxShadow:"rgba(0,0,0,0.8) 0 0 2px", marginTop:"1em", cursor:"pointer", textAlign:"center"}} onClick={() => this.setState({isLogin: false, isRegister: true})}
                            >Sign Up</div>
                        </div>
                    </div>
                </div>}
                {this.state.isRegister && 
                <div>
                    <div style={{backgroundColor:"#015E0D", padding:"3em", paddingLeft:"10%", textAlign:"left", color:"white", fontSize:"2.5em"}}>
                        Welcome to the Merchant Portal
                    </div>
                    <div style={{paddingLeft:"10%", paddingBottom:"10%"}}>
                        <Register onInputChange={this.onInputChange} />
                        <div style={{flexDirection:"row", display:"flex", marginTop:"2em"}}>
                        <div 
                            style={{width:"20%", padding:"0.5em", borderRadius:".5em", backgroundColor:"#015E0D", color:"white", marginTop:"1em", cursor:"pointer", textAlign:"center"}} onClick={this.handleRegister}
                            >Register</div>
                        <div 
                            style={{width:"20%", padding:"0.5em", borderRadius:".5em", marginLeft:"3em", boxShadow:"rgba(0,0,0,0.8) 0 0 2px", marginTop:"1em", cursor:"pointer", textAlign:"center"}} onClick={() => this.setState({isLogin: true, isRegister: false})}
                            >Sign In</div>  
                        </div>                  
                    </div>
                </div>}
                {this.state.isDashboard && <MerchantDashboard />}
                {this.state.isUnauthorized && <Unauthorized />}
            </div>
        )
    }
}

export default MerchantMain;