import React from "react";
import "../css/style.css";
import axios from "axios";
import { FURL } from "../config";
import Main from "../images/logo.png";
class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
    };
  }

  handleSend = () => {
    if (this.state.feedback.length > 0) {
      axios
        .post(FURL + "merchant", {
          feedback: this.state.feedback,
        })
        .then((res) => {
          if (res.data.staus) {
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
          this.props.feedback(1);
        })
        .catch((err) => {
          alert("Feedback sending failed");
        });
    } else {
      alert("Please enter feedback");
    }
  };

  render() {
    return (
      <>
        <div
          style={{
            backgroundColor: "#BDE8D1",
            padding: "3%",
            paddingTop: "2em",
          }}
        >
          <h4 style={{ color: "#015E0D", fontWeight: "bold", fontSize: 20 }}>
            Thank you for
          </h4>
          <h4 style={{ color: "#015E0D", fontWeight: "bold", fontSize: 20 }}>
            shopping with us!
          </h4>
        </div>
        <div
          className="bottomBorderColor"
          style={{ height: 10, backgroundColor: "#015E0D" }}
        ></div>
        <div
          style={{
            padding: "2em",
            textAlign: "left",
            color: "#015E0D",
            fontSize: "1.5em",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>We'd love to hear from you.</h2>
          <p>Please let us know how we can serve you better.</p>
          <div
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <textarea
              type="textarea"
              className="form__field"
              placeholder="Email"
              onChange={(e) => this.setState({ feedback: e.target.value })}
              required
            />
          </div>
          <div
            style={{
              width: "30%",
              padding: "0.5em",
              borderRadius: ".5em",
              backgroundColor: "#015E0D",
              color: "white",
              marginTop: "1em",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={this.handleSend}
          >
            Send
          </div>
          <div className="fixed-bottom">
            <div
              className="bottomBorderColor"
              style={{ height: 10, backgroundColor: "#015E0D" }}
            ></div>
            <div
              style={{
                backgroundColor: "white",
                padding: "3%",
                margin: "0 auto",
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
                    textAlign: "center",
                  }}
                >
                  POWERED BY
                </h4>

                <img
                  src={Main}
                  style={{
                    height: "1.5em",
                    width: "4.5em",
                    margin: "0 auto",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Feedback;
