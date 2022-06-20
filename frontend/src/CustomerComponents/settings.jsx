import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {MdFeedback} from 'react-icons/md';
import axios from 'axios';
import {FURL} from './config'

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
    };
  }

  handleSend = () => {
        if(this.state.feedback.length > 0) {
            axios.post(FURL + "user", {
                feedback: this.state.feedback,
            }).then(res => {
                if(res.data.staus) {
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            }).catch(err => {
                alert("Feedback sending failed");
            });
        } else {
            alert("Please enter feedback");
        }
    }

  render() {
    return(
      <div>
        <div style={{backgroundColor: "#BDE8D1", padding: "3%", paddingTop:"2em"}}>
          <h4 style={{color:"#015E0D", fontWeight:"bold"}}>Settings</h4>
        </div>
        <div className="container" style={{color:"#015E0D", textAlign:"left"}}>
          <Container style={{marginTop:"2em", borderRadius:"1em", overflow:"hidden", boxShadow:"rgba(0,0,0,0.8) 0 0 2px"}}>
              <Row>
                  <Col xs="2" style={{backgroundColor: "#BDE8D1", display:"flex", justifyContent:"center"}}><MdFeedback style={{marginTop:"1.5em", fontSize:"1.2em", color:"#015E0D"}} /></Col>
                  <Col style={{paddingLeft:"2em"}}>
                      <Container style={{padding:".5em"}}>
                          <Row>
                            <h6 style={{fontWeight:"bold", marginTop:"1em"}}>Feedback</h6>
                          </Row>
                          <Row>
                            Please Let us know how we can serve you better! (Optional)
                          </Row>
                          <Row>
                            <textarea type="textarea" className="form__field" placeholder="feedback"  onChange={(e)=>this.setState({feedback: e.target.value})} style={{width:"90%"}} required />
                          </Row>
                          <Row>
                            <div 
                              style={{width:"30%", padding:"0.5em", borderRadius:".5em", backgroundColor:"#015E0D", color:"white", marginTop:"1em", cursor:"pointer", textAlign:"center"}}
                              onClick={this.handleSend}
                              >Send</div>
                          </Row>
                          <Row>
                            <div style={{marginTop:"3em"}}>
                              <a className="setting" href="https://www.spesa-app.com/privacy-policy">
                                Privacy Policy
                              </a>
                            </div>
                          </Row>
                          <Row>
                            <div style={{marginTop:"2em", marginBottom:'1em'}}>
                              <a className="setting" href="https://www.spesa-app.com/contact-us">
                              Contact us
                              </a>
                            </div>
                          </Row>
                      </Container>
                  </Col>
              </Row>
          </Container>
      </div> 
      </div>
    );
  }
}

export default Setting;