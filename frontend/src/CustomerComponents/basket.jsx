import React from "react";
// import Swipe from 'react-easy-swipe';
import { Container, Row, Col } from "react-bootstrap";
import Swipe from "react-easy-swipe";
import bullet from './images/bullet.svg'
import numeral from "numeral";
// import {useSwipeable} from 'react-swipeable'

class Basket extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: "#BDE8D1",
            padding: "3%",
            paddingTop: "2em",
          }}
        >
          <h4 style={{ color: "#015E0D", fontWeight: "bold" }}>Basket</h4>
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
        <div style={{ padding: "0 1em" }}>
          <Container style={{ color: "#105E0D" }}>
            {this.props.itemList.map((item, index) => {
              return (
                // <Swipe
                // key={index}
                // tolerance={10}
                // onSwipeLeft={()=> {
                //   this.props.onDelete(index)
                // }}
                // onSwipeRight={()=> this.props.onDelete(index)} >
                <Swipe
                  tolerance={20}
                  onSwipeLeft={() => {
                    this.props.onDelete(index);
                  }}
                  onSwipeRight={() => this.props.onDelete(index)}
                >
                  {/* <div style={{height:"3.3em", marginTop:".9em"  ,display:"flex", justifyContent:"space-between", borderBottomColor:"#BDE8D1", borderBottomWidth:"thin", borderBottomStyle:"solid", paddingBottom:"0.5em"}}>
                    <div style={{display:"flex", flexDirection:"row", textAlign:"start", width:"50%"}}>
                      <img src={item.itemImgSrc} alt="" height="45em" width="45em" style={{marginRight:".5em"}} />
                      <div style={{display:"flex", flexDirection:"column"}}>
                        <p style={{margin:0}}>{item.name}</p>
                        <p style={{margin:0}}>{item.brand || ''} {item.amount}</p>
                      </div>
                    </div>
                    {item.brand ?
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <p style={{marginTop:".4em"}}>${item.price * item.amount} ea</p>
                    </div> : 
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <p style={{marginTop:".4em"}}>${item.price * item.amount}</p>
                    </div>}
                </div> */}
                  <Row
                    style={{
                      borderBottom: "1px solid #BDE8D1",
                      padding: "0.5em 0",
                      // minHeight: "4.5em",
                    }}
                  >
                    <Col xs={1} style={{ paddingLeft: 0 }}>
                      <img
                        src={bullet}
                        alt=""
                        height="10em"
                        width="10em"
                        // style={{ marginTop: "100%"}}
                      />
                      
                      {/* <span style={{
                        // height:"50em",
                        // width:"50em",
                        fontSize:"5em"
                      }}>•</span> */}
                    </Col>
                    <Col style={{ textAlign: "left", paddingLeft: "1.5em" }}>
                      <p style={{ margin: 0, fontSize: "1.1em" }}>
                        {item.name}
                      </p>
                      <p style={{ margin: 0 }}>
                        {item.brand !== null
                          ? item.brand + ", " + item.itemWeight
                          : null}
                      </p>
                    </Col>
                    {/* <Col xs={2} style={{ paddingLeft: 0 }}>
                      {item.brand !== null ? (
                        <p style={{ textAlign: "left" }}>Qty:{item.amount}</p>
                      ) : (
                        <p style={{ margin: 0, textAlign: "left" }}>
                          {item.amount} lbs
                        </p>
                      )}
                    </Col> */}
                    <Col xs={5}>
                      <p style={{ margin: 0, textAlign: "right",fontWeight:"bold" }}>
                        {/* {String(item.itemTotal)} */}
                        ${numeral(item.itemTotal).format("0.00")}
                        {/* ${item.itemTotal.toFixed(2)} */}
                      </p>
                      <p>
                      {item.brand !== null ? (
                        <p style={{  margin: 0, textAlign: "left",float:"right"}}>Qty:{item.amount}</p>
                      ) : (
                        <p style={{ margin: 0, textAlign: "left",float:"right"}}>
                          {item.amount} lbs
                        </p>
                      )}
                      </p>
                    </Col>
                    {/* <Col xs={1}>
                    {item.brand!==null && <p style={{margin:0, textAlign:"left"}}>ea</p>}
                  </Col> */}
                  </Row>
                </Swipe>
              );
            })}
          </Container>
        </div>
        <div
          style={{
            margin: "auto",
            width: "30%",
            padding: "0.5em",
            borderRadius: ".5em",
            backgroundColor: "#015E0D",
            color: "white",
            marginTop: "1em",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => {
            this.props.clickPayment();
          }}
        >
          Payment
        </div>
      </div>
    );
  }
}

export default Basket;
