import React from "react";
import OnboardImage1 from "../images/onboard1.png";

class Onboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#BDE8D1",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          alt="Onboard One"
            style={{
              position: "relative",
              // left: -54,
              left:-5,
              // marginLeft: "auto",
              // marginRight: "auto",
              top: 45,
              width: 380,
              height: "40%",
            }}
            src={OnboardImage1}
          />
        <div
          style={{
            position: "relative",
          }}
        >
          
        </div>
        <div
          style={{
            position: "",
            marginTop: 45,
            height: "32%",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "#015E0D",
              marginLeft: 75,
              marginRight: 75,
              paddingTop: 25,
              fontWeight: "bold",
              fontFamily: "Avenir",
            }}
          >
            Shop & check out with your phone in-store.
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "",
              fontFamily: "Avenir Book",
              color: "#015E0D",
              paddingTop: 10,
            }}
          >
            Just scan, pay & go!
          </div>
          <div
            style={{
              textAlign: "left",
              paddingTop: 10,
              position: "relative",
              bottom: 10,
            }}
          >
            <span
              style={{
                position: "relative",
                marginRight: "auto",
                textAlign: "left",
                fontSize: 30,
                paddingLeft: 30,
                bottom: 0,
                color: "#015E0D",
              }}
            >
              •
            </span>
            <span
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "",
                fontFamily: "Avenir Book",
                color: "#015E0D",
                marginLeft: 35,
              }}
            >
              Contactless checkout
            </span>
          </div>
          <div
            style={{
              textAlign: "left",
              position: "relative",
              bottom: 20,
            }}
          >
            <span
              style={{
                position: "relative",
                marginRight: "auto",
                textAlign: "left",
                fontSize: 30,
                paddingLeft: 30,
                color: "#015E0D",
              }}
            >
              •
            </span>
            <span
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "",
                fontFamily: "Avenir Book",
                color: "#015E0D",
                marginLeft: 35,
              }}
            >
              Skip the time at the register
            </span>
          </div>
          <div
            style={{
              textAlign: "left",
              position: "relative",
              bottom: 30,
            }}
          >
            <span
              style={{
                marginRight: "auto",
                textAlign: "left",
                fontSize: 30,
                paddingLeft: 30,
                color: "#015E0D",
              }}
            >
              •
            </span>
            <span
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "",
                fontFamily: "Avenir Book",
                color: "#015E0D",
                marginLeft: 35,
              }}
            >
              Streamlined store shopping
            </span>
          </div>
        </div>
        <div
          style={{
            // height:400,
            position: "relative",

            // display: "flex",
            justifyContent: "center",
            textAlign: "center",
            // height: "100%",
          }}
        >
          <button
            onClick={() => {
              this.props.nextPage();
            }}
            style={{
              position: "",
              height: "100%",
              // margin: "20%",
              // marginTop: "20%",
              // margin: "auto",
              // marginTop: "100%",
              color: "#166B00",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Onboard;

