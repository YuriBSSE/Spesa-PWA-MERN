import React from 'react';
import WebCam from 'react-webcam';
import {RiCameraLensLine} from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import {AiOutlineShoppingCart} from "react-icons/ai";
import Filter from './utilities/FilterWeight';
import InfoWeight from './utilities/infoWeight';
import {TiArrowBack} from "react-icons/ti";

class WeightProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      webcamRef: React.createRef(),
      imageSrc: null,
      modalInput: "",
      itemName: "",
      itemPrice: 0,
      showModal: false,
      showMain: true,
      showInfo: true,
      itemImgSrc: null,
      itemBrand: null
    };
  }

  onAdd = () =>{
    if(this.state.modalInput !== "" && this.state.itemName !== ""){
        this.props.addItem({
          name: this.state.itemName, 
          amount: this.state.modalInput, 
          price: this.state.itemPrice, 
          itemImgSrc: this.state.itemImgSrc,
          brand: null,
          image: this.state.imageSrc,
          itemWeight: null,
          itemTotal: this.state.itemPrice * this.state.modalInput
        });
        this.setState({
          showModal: false,
          modalInput: "",
          itemName: "",
        });
      } else {
        alert("Please enter a valid amount");
      }
    }

  hideModal = () =>{
    this.setState({
      showModal: false,
    });
  }

  turnOnMain = () =>{
    this.setState({
      showMain: true,
      showInfo: false,
    });
  }

  capture = () => {
    const imageSrc = this.state.webcamRef.current.getScreenshot();
    this.setState({ imageSrc });
  }
  showModal = () => {
      this.setState({showModal: true, imageSrc: this.state.webcamRef.current.getScreenshot()});
  }
  handleChange(e) {
      const target = e.target;
      const value = target.value;
      this.setState({
          modalInput: value,
      });
  }
  handleFilter = (e) => {
      e.preventDefault();
      this.setState({
          showMain: false
      });
  }
  selectItem = (item) => {
      this.setState({
          itemName: item.name,
          itemPrice: item.price,
          itemImgSrc: item.imgsrc,
          itemBrand: item.brand,
          showMain: true
      });
  }
  turnOffInfo = () => {
      this.setState({
        showInfo: false
      });
  }
  
  render() {
    return (        
      <div>
        <div style={{backgroundColor: "#BDE8D1", padding: "3%", paddingTop:"2em"}}>
            {this.state.showMain ? <h4 style={{color:"#015E0D", fontWeight:"bold"}}>Add Weighted Product</h4> : 
            <>
            <h4 style={{color:"#015E0D", fontWeight:"bold"}}>Search Produce</h4>
            <button style={{float:"left", fontSize:"1.4em", position:"absolute", left:".2em", top:"1.2em"}} onClick={this.turnOnMain}> <TiArrowBack /> </button>
            </>}
        </div>   
        {this.state.showInfo?<InfoWeight turnOffInfo={this.turnOffInfo}/>
        :<div>
          {this.state.showMain ?
          <div>
            <div style={{backgroundColor:"black", paddingTop:"3em"}}>
              <WebCam
                audio={false}
                width={"100%"}
                ref={this.state.webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{facingMode: "environment"}}
              />
              <button onClick={this.showModal}><RiCameraLensLine style={{color:"white", fontSize:"2em"}}/></button>
            </div>
            <Modal show={this.state.showModal} centered style={{color: "white"}}>
                  <Modal.Body style={{backgroundColor:"#015E0D"}}>
                      <p style={{marginBottom: "1em" }}>Please Enter the item type</p>
                      <input value={this.state.itemName} readOnly onClick={this.handleFilter} className="form-control" style={{marginBottom: ".5em"}} />
                      <p style={{marginBottom: "1em" }}>Please enter item weight in lbs</p>
                      <input
                          type="number"
                          value={this.state.modalInput}
                          onChange={e => this.handleChange(e)}
                          className="form-control"
                          style={{marginBottom: ".5em"}}
                          />
                  </Modal.Body>
                  <Modal.Footer style={{display: 'flex', justifyContent:"space-around", backgroundColor:"#015E0D", color:"white", height:50}}>
                      <button style={{color: "white"}} onClick={this.onAdd}>Add to <AiOutlineShoppingCart /></button>
                      <button style={{color:"#F53C30"}} onClick={this.hideModal}>Delete</button>
                  </Modal.Footer>
              </Modal>
            </div>:<Filter weightProducts={this.props.weightProducts} onSelect={this.selectItem}/>}
          </div>}
      </div>
    );
  }
}

export default WeightProduct;