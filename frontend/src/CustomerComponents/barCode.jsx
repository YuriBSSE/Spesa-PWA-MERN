import React from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Modal from "react-bootstrap/Modal";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {Container, Col, Row, Image} from 'react-bootstrap';
import Logo from './images/logo.png';

class BarCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barcodeData: "",
            showModal: false,
            modalInput: "",
            itemName: "",
            itemPrice: 0,
            itemImgSrc: null,
            itemBrand: null,
            itemWeight: null,
            barProducts: this.props.barProducts,
            itemGST: false
        }
    }

    onAdd = () =>{
        this.props.addItem({
            name: this.state.itemName, 
            amount: this.state.modalInput, 
            price: this.state.itemPrice, 
            itemImgSrc: this.state.itemImgSrc, 
            brand: this.state.itemBrand,
            itemWeight: this.state.itemWeight,
            itemTotal: this.state.itemPrice * this.state.modalInput,
            image: null,
            GST:this.state.itemGST

        });
        this.setState({showModal: false});
    }

    hideModal = () => {
        this.setState({showModal: false});
    }

    showModal = (result) => {
        let obj = this.state.barProducts.find(o=>o.upc===result);
        if (obj != null) {
            console.log()
            this.setState({
                showModal: true,
                itemName: obj.name,
                itemPrice: obj.price,
                itemImgSrc: obj.image,
                itemBrand: obj.brand,
                itemWeight: obj.weight,
                modalInput: 1,
                itemGST: obj.gst
            });
        } else {
            alert("Product barcode not found!");
        }
    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: "#BDE8D1", padding: "3%", color:"#015E0D", paddingTop:"2em"}}>
                    <h4 style={{fontWeight:"bold"}}>Add product</h4>
                    <h6>Scan barcode to add product</h6>
                </div>
                <Image src={Logo} alt="logo" className="barLogo" style={{height:"6em", width:"10em"}} fluid/>
                {this.state.showModal!== true && <BarcodeScannerComponent
                    width={"100%"}
                    height={"auto"}
                    onUpdate={(err, result) => {
                        if (result) {
                            console.log(result);
                            this.showModal(result.text);
                        }
                    }}
                /> }
                <Modal show={this.state.showModal} centered style={{color: "white"}}>
                    <Modal.Header style={{backgroundColor:"#015E0D"}}>
                        <Modal.Title style={{width:"100%", fontSize:"1em"}}>
                            <Container>
                                <Row>
                                    <Col xs="8" style={{paddingLeft:"0"}}>
                                        {this.state.itemName}
                                    </Col>
                                    <Col>
                                        <span style={{float: "right"}}>
                                            {"$ " + this.state.itemPrice + " /pc"}
                                        </span>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer style={{display: 'flex', justifyContent:"space-around", backgroundColor:"#015E0D", color:"white", height:50}}>
                        <button style={{color: "white"}} onClick={this.onAdd}>Add to <AiOutlineShoppingCart /></button>
                        <button style={{color:"orange"}} onClick={this.hideModal}>Delete</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default BarCode;