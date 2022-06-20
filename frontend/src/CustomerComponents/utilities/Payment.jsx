import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { FaPercentage, FaShoppingCart } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { CartURL } from "../config";
import Receipt from "./Receipt";
import { PushSpinner } from "react-spinners-kit";
import { IURL } from "../config";
import "../css/checkout.css";
import CheckoutForm from "./StripeCheckout";
import numeral from "numeral";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subTotal: this.getTotal(),
      promoCode: 0,
      taxes: this.getTax(),
      itemList: this.props.itemList,
      isReceipt: false,
      total: this.getTax() + this.getTotal(),
      receiptId: null,
      payDescription: "",
      isLoading: false,
      email: null,
    };
  }
  s;
  getTotal = () => {
    let itemList = this.props.itemList;
    let sum = 0;
    console.log(itemList);
    itemList.forEach((item, i) => (sum += item.amount * item.price));

    return sum;
  };

  getTax = () => {
    let total = 0;
    let itemList = this.props.itemList;
    itemList.forEach((item, i) => {
      if (item.GST === true) {
        total += item.amount * item.price * 0.12;
      } else {
        total += item.amount * item.price * 0.07;
      }
    });
    return total;
  };

  submitCart = () => {
    this.setState({ isLoading: true });
    axios
      .post(`${CartURL}cart`, {
        itemList: this.state.itemList,
        subTotal: this.state.subTotal,
        promoCode: this.state.promoCode,
        tax: this.state.taxes,
        total: this.state.total,
      })
      .then((res) => {
        if (res.data.status) {
          this.props.onPaid();
          this.setState({
            isReceipt: true,
            receiptId: res.data._id,
          });
          axios
            .post(`${IURL}`, {
              id: this.state.receiptId,
              itemList: this.state.itemList,
              email: this.state.email,
            })
            .then((res) => {
              if (res.data.status) {
                this.setState({ isLoading: false });
              }
            });
        } else {
          alert("payment Not succeed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  paySuccess = (email) => {
    this.setState({
      email: email,
      payDescription: "********",
    });
    this.submitCart();
  };

  render() {
    return (
      <>
        {this.state.isReceipt === false ? (
          <div>
            <div className="loader">
              {" "}
              <PushSpinner
                size={50}
                color="#BDE8D1"
                loading={this.state.isLoading}
              />{" "}
            </div>
            <div
              style={{
                backgroundColor: "#BDE8D1",
                padding: "3%",
                paddingTop: "2em",
              }}
            >
              <button
                style={{
                  float: "left",
                  fontSize: "1em",
                  position: "absolute",
                  left: ".2em",
                }}
                onClick={this.props.unclickPayment}
              >
                {" "}
                <TiArrowBack />{" "}
              </button>
              <h4 style={{ color: "#015E0D", fontWeight: "bold" }}>Payment</h4>
            </div>
            <div
              style={{
                padding: "1.5em",
                backgroundColor: "#015E0D",
                color: "white",
              }}
            >
              <h6 style={{ margin: 0 }}>Grocery Checkout UBC</h6>
            </div>
            <div
              className="container"
              style={{ color: "#015E0D", textAlign: "left" }}
            >
              <Container
                style={{
                  marginTop: "2em",
                  borderRadius: "1em",
                  overflow: "hidden",
                  boxShadow: "rgba(0,0,0,0.8) 0 0 2px",
                }}
              >
                <Row>
                  <Col
                    xs="2"
                    style={{
                      backgroundColor: "#BDE8D1",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FaPercentage
                      style={{
                        marginTop: "1em",
                        fontSize: "1.2em",
                        color: "white",
                        backgroundColor: "#015E0D",
                        borderRadius: "20px",
                        padding: "3px",
                      }}
                    />
                  </Col>
                  <Col style={{ paddingLeft: "2em" }}>
                    <Container style={{ padding: ".5em" }}>
                      <Row style={{ marginBottom: ".9em" }}>
                        <h6 style={{ fontWeight: "bold" }}>Enter Promo Code</h6>
                      </Row>
                      <input
                        placeholder="Promo Code (Optional)"
                        onChange={(e) => {
                          if (e.target.value === "launch5off") {
                            this.setState({ promoCode: 5.0 });
                            this.setState({ total: this.state.total - 5 });
                          }
                        }}
                        style={{
                          position: "relative",
                          marginLeft: "auto",
                          paddingLeft: "0",
                          left: "-12px",
                          border: "none",
                          borderBottom: "1px solid #BDE8D1",
                          borderRadius: "0px",
                          outline: "none",
                        }}
                      ></input>
                      {/* <Row style={{height:"2.1em", display:"flex", justifyContent:"space-between", paddingBottom:0, paddingRight:"1em"}}>
                                        <p>SubTotal</p>
                                        <p>$ {this.state.subTotal}</p>
                                    </Row> */}
                    </Container>
                  </Col>
                </Row>
              </Container>
              <Container
                style={{
                  marginTop: "2em",
                  borderRadius: "1em",
                  overflow: "hidden",
                  boxShadow: "rgba(0,0,0,0.8) 0 0 2px",
                }}
              >
                <Row>
                  <Col
                    xs="2"
                    style={{
                      backgroundColor: "#BDE8D1",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FaShoppingCart
                      style={{
                        marginTop: "1em",
                        fontSize: "1.2em",
                        color: "#015E0D",
                      }}
                    />
                  </Col>
                  <Col style={{ paddingLeft: "2em" }}>
                    <Container style={{ padding: ".5em" }}>
                      <Row style={{ marginBottom: ".9em" }}>
                        <h6 style={{ fontWeight: "bold" }}>Order Summary</h6>
                      </Row>
                      <Row
                        style={{
                          height: "2.1em",
                          display: "flex",
                          justifyContent: "space-between",
                          paddingBottom: 0,
                          paddingRight: "1em",
                        }}
                      >
                        <p>SubTotal</p>
                        <p>${numeral(this.state.subTotal).format("0.00")}</p>
                      </Row>
                      <Row
                        style={{
                          height: "2.1em",
                          display: "flex",
                          justifyContent: "space-between",
                          paddingBottom: 0,
                          paddingRight: "1em",
                        }}
                      >
                        <p>Promo Code</p>
                        <p>- $ {this.state.promoCode}</p>
                      </Row>
                      <Row
                        style={{
                          height: "2.1em",
                          display: "flex",
                          justifyContent: "space-between",
                          paddingBottom: 0,
                          paddingRight: "1em",
                        }}
                      >
                        <p>Taxes</p>
                        <p>${numeral(this.state.taxes).format("0.00")}</p>
                      </Row>
                      <Row
                        style={{
                          height: "2.1em",
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: ".5em",
                          paddingBottom: 0,
                          paddingRight: "1em",
                          border: "none",
                          borderTopColor: "#BDE8D1",
                          borderTopStyle: "solid",
                          borderTopWidth: "thin",
                        }}
                      >
                        <h6 style={{ fontWeight: "bold" }}>Order Total</h6>
                        <p>${numeral(this.state.total).format("0.00")}</p>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row
                  style={{
                    marginTop: "2em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Col>
                    <CheckoutForm
                      total={this.state.total}
                      paySuccess={this.paySuccess}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        ) : (
          <Receipt
            feedback={this.props.feedback}
            total={this.state.total}
            payDescription={this.state.payDescription}
            itemList={this.state.itemList}
            orderId={this.state.receiptId}
            subTotal={this.state.subTotal}
            promoCode={this.state.promoCode}
            tax={this.state.taxes}
            paymentMethod
          />
        )}
      </>
    );
  }
}

export default Payment;
