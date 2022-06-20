import React from 'react';
import { Navbar, Nav, Image} from 'react-bootstrap';
import Login from './Login';
import AdminDashboard from './Dashboard';
import {setUserSession, removeUserSession, getUser} from './utilities/common';
import Logo from './images/logo.png';
class AdminPortal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDashboard: false,
            isLogin: true,
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        if(getUser()==='admin'){
            this.setState({isDashboard: true, isLogin: false});
        }
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
        });
    }

    handleLogin = () => {
        if(this.state.email==='admin' && this.state.password==='admin'){
            setUserSession('admin');
            this.setState({
                isDashboard: true,
                isLogin: false,
            });
        } else {
            alert('Invalid Credentials');
        }
    }

    render() {
        return(
            <div>
                <div style={{borderBottomColor:"#015E0D", borderBottomWidth:"thick", borderBottomStyle:"solid", color:"#015E0D"}} >
                    <Navbar bg="light" expand="lg">
                    <Navbar.Brand style={{paddingTop:"1%", marginRight: "4em", marginLeft:"1.3em"}}>
                        <Image src={Logo} alt="logo" style={{height:"2em", width:"8em"}} fluid/>
                    </Navbar.Brand>
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ height: '75px' }}
                    navbarScroll
                    >
                    <h3 style={{margin:0, marginTop: "auto", marginBottom:"auto"}}>Admin Portal</h3>
                    </Nav>
                    {(this.state.isDashboard || this.state.isUnauthorized) && <div className="hoverDiv" onClick={this.handleSignOut} style={{margin:0, marginTop: "auto", marginBottom:"auto"}}><h5 style={{margin:0}}>Sign out</h5></div>}
                    </Navbar>
                </div>

                {this.state.isLogin && <>
                 <div>
                    <div style={{backgroundColor:"#015E0D", padding:"3em", paddingLeft:"10%", textAlign:"left", color:"white", fontSize:"2.5em"}}>
                        Welcome to the Admin Portal
                    </div>
                    <div style={{paddingLeft:"10%"}}>
                        <Login onInputChange={this.onInputChange}/>
                        <div style={{flexDirection:"row", display:"flex", marginTop:"2em"}}>
                        <div 
                            style={{width:"20%", padding:"0.5em", borderRadius:".5em", backgroundColor:"#015E0D", color:"white", marginTop:"1em", cursor:"pointer", textAlign:"center"}} onClick={this.handleLogin}
                            >Login</div>
                        </div> 
                    </div>
                </div> </>}
                {this.state.isDashboard && <AdminDashboard />}
            </div>
        )
    }
}

export default AdminPortal;