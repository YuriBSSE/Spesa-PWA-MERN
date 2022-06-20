import React from "react";
import Basket from "./basket";
import BarCode from "./barCode";
import WeightProduct from "./weigh";
import Setting from "./settings";
import ScanExitCode from "./scanExitCode";
import Feedback from "../MerchantComponents/panels/Feedback";
import "./css/style.css";
import {
  AiFillShopping,
  AiOutlineBarcode,
  AiFillSetting,
} from "react-icons/ai";
import UnactiveWeightScale from "./images/tabbar/weightscale_tabbar_icon.png";
import ActiveWeightScale from "./images/tabbar/weightscale_tabbar_icon_active.png";
import Payment from "./utilities/Payment";
import { URL } from "./config";
import axios from "axios";
import { PushSpinner } from "react-spinners-kit";
import OnboardOne from "./onboarding/onboardOne";
import LogoScreen from "./onboarding/LogoScreen";

class CustomerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
      isLoading: true,
      itemList: [],
      imgSrc: null,
      showPayment: false,
      barProducts: [],
      weightProducts: [],
      hasPaid: false,
      onboardingPage: null,
    };
  }

  async componentDidMount() {
    // Check local storage for visit
    let visit = localStorage.getItem("visit");
    if (visit == null) {
      this.setState({ onboardingPage: 0 });
    } else {
      this.setState({ onboardingPage: null });
    }
    try {
      await axios.get(`${URL}barcode`).then((res) => {
        console.log(res.data.barcodes);
        this.setState({
          barProducts: res.data.barcodes,
        });
      });

      await axios.get(`${URL}weightProduct`).then((res) => {
        this.setState({
          weightProducts: res.data.products,
        });
      });

      this.setState({
        isLoading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  onPaid = () => {
    this.setState({
      hasPaid: true,
    });
  };
  basketBadge = () => {
    let sum = 0;
    console.log(this.state.itemList);
    this.state.itemList.forEach((item) => {
      if (typeof item.amount == "string") {
        sum += 1;
      } else {
        sum += Math.round(item.amount);
      }
    });
    return sum;
  };

  handleTabChange = (option) => {
    this.setState({
      selectedTab: option,
    });
  };

  onDelete = (id) => {
    this.setState({
      itemList: this.state.itemList.filter((_, i) => i !== id),
    });
  };

  addItem = (item) => {
    let index = this.state.itemList.findIndex((x) => x.name === item.name);
    let items_ = [...this.state.itemList];
    if (index !== -1) {
      items_[index].amount =
        parseFloat(items_[index].amount) + parseFloat(item.amount);
      items_[index].itemTotal =
        parseFloat(items_[index].itemTotal) + parseFloat(item.itemTotal);
      this.setState({
        itemList: items_,
      });
    } else {
      this.setState({
        itemList: [...this.state.itemList, item],
      });
    }
  };

  clickPayment = () => {
    if (this.state.itemList.length > 0) {
      this.setState({
        showPayment: true,
      });
    } else {
      alert("Please add items to the basket");
    }
  };
  unclickPayment = () => {
    this.setState({
      showPayment: false,
    });
  };

  updateImage = (imgSrc) => {
    this.setState({ imgSrc: imgSrc });
  };

  getOnboardTab = () => {
    if (this.state.selectedTab === 0) {
      return "9%";
    }
    if (this.state.selectedTab === 1) {
      return "34%";
    } else if (this.state.selectedTab === 2) {
      return "59%";
    } else if (this.state.selectedTab === 3) {
      return "84%";
    }
  };
  //   renderSwitch() {
  //     switch (this.state.onboardingPage) {
  //       case 1:
  //         return (

  //         );

  //       default:
  //         return 2;
  //     }
  //   }

  

  render() {
    return (
      <>
        {this.state.onboardingPage <= 1 && this.state.onboardingPage != null ? (
          <>
            {this.state.onboardingPage === 1 && (
              <>
                {
                  <OnboardOne
                    nextPage={() => {
                      this.setState({
                        onboardingPage: 2,
                      });
                    }}
                  />
                }
              </>
            )}
            {this.state.onboardingPage === 0 && (
              <>
                {
                  <LogoScreen
                    page={this.state.onboardingPage}
                    nextPage={() => {
                      this.setState({
                        onboardingPage: 1,
                      });
                    }}
                  />
                }
              </>
            )}
          </>
        ) : (
          <>
            {this.state.isLoading ? (
              <div className="loader">
                {" "}
                <PushSpinner
                  size={50}
                  color="#BDE8D1"
                  loading={this.state.isLoading}
                />{" "}
              </div>
            ) : (
              <div
                style={{
                  height: "100vh",
                  backgroundColor: this.state.selectedTab === 4 ? 'black' : 'white'
                }}
              >
                <div style={{ paddingBottom: "15vh", overflow: "scroll" }}>
                  {this.state.selectedTab === 0 &&
                    this.state.showPayment !== true && (
                      <Basket
                        itemList={this.state.itemList}
                        onDelete={this.onDelete}
                        clickPayment={this.clickPayment}
                      />
                    )}
                  {this.state.selectedTab === 0 && this.state.showPayment && (
                    // <ScanExitCode /> 
                     <Payment
                       feedback={this.handleTabChange}
                       onPaid={this.onPaid}
                       unclickPayment={this.unclickPayment}
                       itemList={this.state.itemList}
                    /> 
                  )}
                  {this.state.selectedTab === 1 && (
                    <BarCode
                      addItem={this.addItem}
                      barProducts={this.state.barProducts}
                    />
                  )}
                  {this.state.selectedTab === 2 && (
                    <WeightProduct
                      updateImg={this.updateImage}
                      addItem={this.addItem}
                      weightProducts={this.state.weightProducts}
                    />
                  )}
                  {this.state.selectedTab === 3 && <Setting />} 
                  {this.state.selectedTab === 4 && <ScanExitCode   feedback={this.handleTabChange}  />}
                  {this.state.selectedTab === 5 && <Feedback   feedback={this.handleTabChange}  />}
                </div>
                {this.state.onboardingPage && (
                  <>
                    <div style={styles.overlay}></div>

                    <div
                      style={{
                        backgroundColor: "#015E0D",
                        bottom: "9.2vh",
                        position: "fixed",
                        height: "17vh",
                        width: "100%",
                        zIndex: 5000,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        {this.state.selectedTab === 0 && (
                          <div
                            style={{
                              position: "absolute",
                              display: "flex",
                              fontSize: 17,
                              paddingRight: 60,
                              paddingTop: 30,
                              paddingLeft: 20,
                              zIndex: 5000,
                            }}
                          >
                            <div
                              style={{
                                color: "white",
                                textAlign: "left",
                                lineHeight: 1.1,
                                fontFamily: "Avenir",
                                fontSize: 15,
                                // fontWeight: "bolder",
                              }}
                            >
                              View basket and complete payment here. Please be
                              sure to scan the exit code near the entrance
                              before you leave.
                            </div>
                            <button
                              onClick={() => {
                                this.setState({
                                  selectedTab: 0,
                                });

                                this.setState({
                                  onboardingPage: null,
                                });
                                localStorage.setItem("visit", "true");
                              }}
                              style={{
                                position: "relative",
                                marginTop: "auto",
                                left: "15vw",
                                //   bottom: "1vh",
                                color: "#BDE8D1",
                                fontSize: 17,
                                fontWeight: "bolder",
                                // marginLeft: 30,
                              }}
                            >
                              Start
                            </button>
                          </div>
                        )}
                        {this.state.selectedTab === 1 && (
                          <div
                            style={{
                              position: "absolute",
                              display: "flex",

                              // padding: 5,/
                              fontSize: 15,
                              paddingRight: 100,
                              paddingTop: 24,
                              paddingLeft: 20,
                              zIndex: 5000,
                            }}
                          >
                            <div
                              style={{
                                color: "white",
                                textAlign: "left",
                                lineHeight: 1.1,
                                fontFamily: "Avenir",
                                fontSize: 17,
                                // fontWeight: "bolder",
                              }}
                            >
                              Scan barcoded items here. For items with varying
                              weights or no barcodes, please scan barcode on the
                              shelf tag.
                            </div>
                            <button
                              onClick={() => {
                                this.setState({
                                  selectedTab: 2,
                                });
                                // this.setState({
                                //   onboardingPage: 3
                                // })
                              }}
                              style={{
                                position: "relative",
                                marginTop: "auto",
                                left: "15vw",
                                //   bottom: "1vh",
                                color: "#BDE8D1",
                                fontSize: 17,
                                // fontWeight: "bolder",
                                // marginLeft: 30,
                              }}
                            >
                              Next
                            </button>
                          </div>
                        )}
                        {this.state.selectedTab === 2 && (
                          <div
                            style={{
                              position: "absolute",
                              display: "flex",

                              // padding: 5,/
                              fontSize: 15,
                              paddingRight: 100,
                              paddingTop: 50,

                              paddingBottom: 40,
                              paddingLeft: 40,
                              zIndex: 5000,
                            }}
                          >
                            <div
                              style={{
                                color: "white",
                                textAlign: "left",
                                lineHeight: 1.1,
                                fontFamily: "Avenir",
                                fontSize: 17,
                                // fontWeight: "bolder",
                              }}
                            >
                              Add weighted fresh produce here.
                            </div>
                            <button
                              onClick={() => {
                                this.setState({
                                  selectedTab: 0,
                                });
                                // this.setState({
                                //   onboardingPage: 3
                                // })
                              }}
                              style={{
                                position: "relative",
                                marginTop: "auto",
                                left: "15vw",
                                //   bottom: "1vh",
                                color: "#BDE8D1",
                                fontSize: 17,
                                // fontWeight: "bolder",
                              }}
                            >
                              Next
                            </button>
                          </div>
                        )}
                        {this.state.selectedTab === 3 && (
                          <div
                            style={{
                              position: "absolute",
                              display: "flex",

                              fontSize: 15,
                              paddingRight: 100,
                              paddingTop: 50,

                              paddingBottom: 40,
                              paddingLeft: 40,
                              zIndex: 5000,
                            }}
                          >
                            <div
                              style={{
                                color: "white",
                                textAlign: "left",
                                lineHeight: 1.1,
                                fontFamily: "Avenir",
                                fontSize: 17,
                                // fontWeight: "bolder",
                              }}
                            >
                              Add weighted fresh produce here.
                            </div>
                            <button
                              onClick={() => {
                                this.setState({
                                  selectedTab: 2,
                                });
                              }}
                              style={{
                                position: "relative",
                                marginTop: "auto",
                                left: "15vw",
                                color: "#BDE8D1",
                                fontSize: 17,
                                fontWeight: "bolder",
                              }}
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          // top: "85%",
                          bottom: -15,
                          zIndex: 5000,

                          left: this.getOnboardTab(),
                          width: 20,
                          height: 20,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderTopWidth: 0,
                          borderRightWidth: 15,
                          borderBottomWidth: 25,
                          borderLeftWidth: 15,
                          borderTopColor: "transparent",
                          borderRightColor: "transparent",
                          borderBottomColor: "#015E0D",
                          borderLeftColor: "transparent",
                          transform: "rotate(180deg)",
                          // transform: [{ rotate: '180' }]
                        }}
                      ></div>
                    </div>
                  </>
                )}
                {this.state.hasPaid !== true && (
                  <div
                    className="fixed-bottom"
                    style={{
                      display: this.state.selectedTab === 4 ? 'none' : "flex",
                      justifyContent: "space-around",
                      backgroundColor: "white",
                    }}
                  >
                    {["basket", "barcode", "weight", "setting"].map(
                      (option, i) => (
                        <button
                          className="Button"
                          key={i}
                          onClick={() => this.handleTabChange(i)}
                        >
                          {option === "basket" && (
                            <div>
                              <AiFillShopping
                                className={
                                  this.state.selectedTab === 0
                                    ? "IconYes"
                                    : "IconNo"
                                }
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  backgroundColor: "red",
                                  width: "15px",
                                  height: "15px",
                                  top: "25%",
                                  left: "15%",
                                  borderRadius: "50%",
                                }}
                              >
                                <span
                                  style={{
                                    position: "absolute",
                                    top: -2,
                                    left: 3,
                                    fontSize: 12,
                                    color: "white",
                                    fontWeight: "bold",
                                    fontFamily: "#FFFFFF",
                                  }}
                                >
                                  {this.basketBadge()}
                                </span>
                              </div>
                            </div>
                          )}
                          {option === "barcode" && (
                            <AiOutlineBarcode
                              className={
                                this.state.selectedTab === 1
                                  ? "IconYes"
                                  : "IconNo"
                              }
                            />
                          )}
                          {option === "weight" && (
                            <>
                              {this.state.selectedTab === 2 ? (
                                <img
                                className=" "
                                style={{
                                  width: "2.5rem",
                                  marginBottom:"5px"
                                }}
                                  alt="Weight Scale"
                                  src={ActiveWeightScale}
                                  
                                />
                              ) : (
                                <img
                                style={{
                                  width: "2.5rem",
                                  marginBottom:"5px"
                                }}
                                alt="Weight Scale"
                                src={UnactiveWeightScale}
                                  
                                />
                              )}
                            </>
                          )}
                          {option === "setting" && (
                            <AiFillSetting
                              className={
                                this.state.selectedTab === 3
                                  ? "IconYes"
                                  : "IconNo"
                              }
                            />
                          )}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default CustomerMain;

const styles = {
  triangle: {
    width: 0,
    height: 0,
  },
  overlay: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: "73%",
    opacity: "0.5",
    backgroundColor: "#F6F6F6",
    zIndex: 50,
  },
};
