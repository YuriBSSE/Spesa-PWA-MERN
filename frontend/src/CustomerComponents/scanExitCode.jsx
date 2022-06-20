import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MdFeedback } from "react-icons/md";
import axios from "axios";
import { FURL } from "./config";
import Logo from "./images/logo.png";
import Main from "./images/main.png";
import { Navbar, Nav, Image } from "react-bootstrap";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
class ScanExitCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
    };
  }

  render() {
    return (
      <div style={{}}>
        <div
          style={{
            backgroundColor: "#BDE8D1",
            padding: "3%",
            paddingTop: "2em",
          }}
        >
          <h4 style={{ color: "#015E0D", fontWeight: "bold", fontSize: 20 }}>
            Exit Code
          </h4>
        </div>
        <div
          className="bottomBorderColor"
          style={{ height: 10, backgroundColor: "#015E0D" }}
        ></div>
        <Image src={Logo} alt="logo" className="barLogo" style={{height:"6em", width:"10em"}} fluid/>
          {/* <div
            style={{
              height: "8em",
              width: "12em",
              backgroundColor: "white",
              borderRadius: 12,
              margin: "0 auto",
              marginTop: 15,
            }}
          >
            <img src={Logo} alt="logo" />
          </div> */}
          {/* <Container
            style={{
              marginTop: "6em",
  
              backgroundColor: "#BDE8D1",
              paddingBottom: '15px'

            }}
          > */}
          {/* <Col
              style={{
                height: "80px",
                paddingTop: "25px",
              }}
            >
              <h4
                style={{
                  color: "#015E0D",
                  fontWeight: "bold",
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                Exit Code
              </h4>
            </Col> */}

          {/* <div
            style={{
              heigth: "200px",
              backgroundColor: "white",
              width: "100%",
              padding: 10,
            }}
          > */}
          <div style={{}}>
            <BarcodeScannerComponent
              width={"100%"}
              height={'auto'}
              onUpdate={(err, result) => {
                if (result) {
               
                  // if (result == "0940313015327") {
                    this.props.feedback(5);
                  // } else {
                  //   alert("not valid");
                  // }

                  // console.log(result);
                }
              }}
            />
  </div>

          {/* </Container> */}
        
        <div className="fixed-bottom">
          <div
            className="bottomBorderColor"
            style={{ height: 10, backgroundColor: "#015E0D" }}
          ></div>
          <div
            style={{
              backgroundColor: "white",
              padding: "3%",
              //   paddingTop: "2em",
              height: 140,
            }}
          >
            <div>
              <h4
                style={{
                  color: "#015E0D",
                  fontWeight: "normal",
                  fontSize: 15,
                  marginTop: "35px",
                }}
              >
                POWERED BY
              </h4>
              
                <img
                  src={Main}
                  style={{ height: "1.5em", width: "4.5em" }}
                  alt="logo"
                />
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScanExitCode;
