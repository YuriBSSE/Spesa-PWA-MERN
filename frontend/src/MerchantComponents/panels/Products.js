import Button from "@restart/ui/esm/Button";
import React from "react";
import {Container, Row, Col, Form} from 'react-bootstrap';
import "../css/style.css";
import BarcodeInfo from './productTab/barcodeTab';
import WeightInfo from './productTab/weighTab';
import {PushSpinner} from 'react-spinners-kit';
import axios from 'axios';
import {URL} from '../config';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isSelected: "barcode",
            barcode: '',
            product: '',
            brand: '',
            weight: '',
            price: '',
            image: '',
            csvfile: '',
            barProducts: [],
            weightProducts: [], 
            unit: '',
            gst: true
        };
        this.baseState = {
            barcode: '',
            product: '',
            brand: '',
            weight: '',
            price: '',
            image: '',
            csvfile: '',
            unit: '',
            gst: true
        }
    }

    async componentDidMount() {
        await axios.get(`${URL}barcode`).then(res => {
            this.setState({
                barProducts: res.data.barcodes,
            })
        });

        await axios.get(`${URL}weightProduct`).then(res => {
            this.setState({
                weightProducts: res.data.products,
            })
        });
        this.setState({
            isLoading: false
        });
    }


    updateBarChange = (name, value, id) => {
        let index = this.state.barProducts.findIndex(item => item._id === id);
        let items = [...this.state.barProducts];
        if (index !== -1) {
            let item = {...items[index]};
            if(name === 'barcode')
            item.upc = value;
            if(name === 'brand')
            item.name = value;
            if(name === 'product')
            item.product = value;
            if(name === 'weight')
            item.weight = value;
            if(name === 'price')
            item.price = value;
            if(name === 'gst')
            item.gst = value;
            if(name === 'image' && value !== ""){
                this.getBase64(value, (result) => {
                    item.image = result;
            });
        }
        items[index] = item;
        this.setState({
            barProducts: items,
        });
        }
    }

    updateWeightChange = (name, value, id) => {
        let index = this.state.weightProducts.findIndex(item => item._id === id);
        let items = [...this.state.weightProducts];
        if (index !== -1) {
            let item = {...items[index]};
            if(name === 'product')
            item.name = value;
            if(name === 'price')
            item.price = value;
            if(name === 'image' && value !== ""){
                this.getBase64(value, (result) => {
                    item.image = result;
                });
            }
            items[index] = item;
            this.setState({
                weightProducts: items
            });
        }
    }
    
    updateBarItem = (id) => {
        this.setState({
            isLoading: true
        });
        let item = this.state.barProducts.find(item => item._id === id);
        
        axios.put(`${URL}barcode`, {
            _id: id,
            upc: item.upc,
            name: item.product,
            brand: item.brand,
            weight: item.weight,
            price: item.price,
            image: item.image,
            gst: item.gst
        }).then(res => {
            this.setState({
                isLoading: false,
            });
            if(res.data.status){
                alert(res.data.message);
            } else{
                alert(res.data.message);
            }
        }
            ).catch(err => {
                console.log(err)
                alert("Something went wrong");
        })
    }

    updateWeightItem = (id) => {
        this.setState({
            isLoading: true
        });
        let item = this.state.weightProducts.find(item => item._id === id);
        axios.put(`${URL}weightProduct`, {
            _id: item._id,
            name: item.name,
            price: item.price,
            image: item.image
        }).then(res => {
            this.setState({
                    isLoading: false});
            if(res.data.status){
                alert(res.data.message);
            } else{
                alert(res.data.message);
            }
        }
            ).catch(err => {
                console.log(err)
                alert("Something went wrong");
        })
    }

    deleteItem = (type, id) =>{
        this.setState({
            isLoading: true
        });
        axios.delete(`${URL}${type}/${id}`).then(res => {
            if(res.data.status){
                this.setState({
                    isLoading: false
                });
                if(type === 'barcode'){
                this.setState(prevState => ({
                    barProducts: prevState.barProducts.filter(item => item._id !== id )
                }));
                }else{
                    this.setState(prevState => ({
                        weightProducts: prevState.weightProducts.filter(item => item._id !== id )
                    }));
                }
            }else{
                alert(res.data.message)
            }
        })      
    }

    addBar = (upc, name, brand, weight, unit, price, image, gst) => {
        this.setState({
            isLoading: true
        });
        if(upc!=="" && name!=="" && brand!=="" && price!=="" && unit!=="" && gst!==""){
            axios.post(`${URL}barcode`, {
                upc: upc,
                name: name,
                brand: brand,
                weight: weight + ' ' + unit,
                price: price,
                image: image,
                gst: gst
            }).then(res => {
                this.setState({
                    isLoading: false
                });
                if(res.data.status){
                    this.setState(prevState => ({
                        barProducts: [...prevState.barProducts, res.data.barcodes]
                    }));
                    this.setState(this.baseState);
                } else{
                    alert(res.data.message);
                }
            }
                ).catch(err => {
                    console.log(err)
                    alert("Something went wrong");
                })
            } else {
                alert("Please fill all the fields!");
            }
    }

    addBarBulk = (csvfile) => {
        this.setState({
            isLoading: true
        });
        if(csvfile!==""){
            const formData = new FormData();
            formData.append("csvfile", csvfile);

            axios.post(
                    `${URL}barcodes`,
                    formData,
                    { headers: {'Content-Type': 'multipart/form-data' } }
                ).then(res => {
                this.setState({
                    isLoading: false
                });
                if(res.data.status){
                    this.setState(prevState => ({
                        barProducts: [...prevState.barProducts, res.data.barcodes]
                    }));
                    this.setState(this.baseState);
                } else{
                    alert(res.data.message);
                }
            }
            ).catch(err => {
                console.log(err)
                alert("Something went wrong");
            })
        } else {
            alert("Please select a spreadsheet!");
        }
    }

    addWeight =(name, price,brand,gst, image) =>{
        this.setState({
            isLoading: true
        });
        if(name !== '' && price !== ''){
            axios.post(`${URL}weightProduct`, {
                name: name,
                price: price,
                image: image,
                brand: brand,
                gst:gst
            }).then(res => {
                this.setState(this.baseState);
                this.setState({
                        isLoading: false
                    });
                if(res.data.status){                    
                    this.setState(prevState => ({
                        weightProducts: [...prevState.weightProducts, res.data.products]
                    }));
                    this.setState(this.baseState);
                } else{
                    alert(res.data.message);
                }
            }
                ).catch(err => {
                    console.log(err)
                    alert("Something went wrong!");
                })
        } else {
            alert("Please fill all the fields!");
        }
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    onChange = (e) => {
        e.preventDefault();
        if(e.target.name === "image" && e.target.value !== ""){
            this.getBase64(e.target.files[0], (result) => {
                this.setState({
                    image: result
                })
            });
        } else if(e.target.name === "csvfile" && e.target.value !== "") {
            this.setState({
                csvfile: e.target.files[0]
            })
        } else if(e.target.type === "checkbox") {
            this.setState({
                gst: e.target.checked
            })
        } else this.setState({ [e.target.name]: e.target.value });
    }

    // barFilter = (e) => {
    //     console.log(this.state.filterBar);
    //     var letterNumber = /^[0-9a-zA-Z]+$/;
    //     if(e.target.value === "" || e.target.value === null){
    //         this.setState({
    //             filterBar: this.state.barProducts
    //         })
    //     } else if(e.target.value.match(letterNumber)) {
    //         let arr = this.state.barProducts.filter((item)=>{
    //             return(
    //                 (item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1) || (item.upc.search(e.target.value) !== -1)
    //             )
    //         })
    //         this.setState({filterBar: arr});
    //     }
    // }

    
    

    render() {
        console.log(this.state.unit);
        return(
            <div>
                <Container fluid>
                    <Row style={{height: "4em", borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thick"}}>
                        <Col className={this.state.isSelected === "barcode" ? "tabHighlight" : "tabNotHighlight"} onClick={()=>this.setState({isSelected:"barcode"})}>
                            <h6 className="tabHeader hoverDiv">Barcoded Items</h6>
                        </Col>
                        <Col className={this.state.isSelected === "weight" ? "tabHighlight" : "tabNotHighlight"} onClick={()=>this.setState({isSelected: "weight"})}>
                            <h6 className="tabHeader hoverDiv">Weighted Product</h6>
                        </Col>
                    </Row>
                    {this.state.isSelected === "barcode" ? <div>
                    <Row className="align-items-center" style={{height: "8em", color:"#015E0D", backgroundColor:"#BDE8D1" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thick", textAlign:"left"}}>
                        <Col style={{ paddingInlineStart: "2em" }}>
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control value={this.state.barcode} type="text" name="barcode" onChange={this.onChange} />
                        </Col>
                        <Col>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control value={this.state.product} type="text" name="product" onChange={this.onChange} />
                        </Col>
                        <Col>
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control value={this.state.brand} type="text" name="brand" onChange={this.onChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control type="number" value={this.state.weight} name="weight" onChange={this.onChange}/>
                        </Col>
                        <Col xs={1} style={{paddingTop:"1.9em", paddingLeft: 0}}>
                            <Form.Select size="sm" value={this.state.unit} name="unit" onChange={this.onChange}>
                                <option></option>
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="g">mg</option>
                                <option value="l">l</option>
                                <option value="ml">ml</option>
                                <option value="l">m</option>
                                <option value="ml">mm</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={this.state.price} name="price" onChange={this.onChange}/>
                        </Col>
                        <Col>
                            <Form.Check type="checkbox" checked={this.state.gst} label="GST?" onChange={this.onChange} />
                        </Col>
                        <Col>
                            <Form.Label>Image</Form.Label>
                            <Form.Control  type="file"  name="image" onChange={this.onChange}/>
                        </Col>
                        <Col xs={1}>
                            <Button className="hoverDiv" onClick={()=>this.addBar(this.state.barcode, this.state.product, this.state.brand, this.state.weight, this.state.unit, this.state.price, this.state.image, this.state.gst)}><h6 style={{margin:0, paddingTop: "1.5em"}}>Save</h6></Button>
                        </Col>
                    </Row>
                    {/* <Row className="align-items-center" style={{height: "8em", color:"#015E0D", backgroundColor:"#BDE8D1" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thick", textAlign:"left"}}>
                        <Col>
                            <Form.Label>Or Upload a spreadsheet</Form.Label>
                        </Col>
                        <Col>
                            <Form.Label>COLUMNS (Barcode, Name, Brand, Size, Unit, Price, GSTApplies[true or false])</Form.Label>
                            <Form.Control  type="file"  name="csvfile" onChange={this.onChange}/>
                        </Col>
                        <Col xs={1}>
                            <Button className="hoverDiv" onClick={()=>this.addBarBulk(this.state.csvfile)}><h6 style={{margin:0, paddingTop: "1.5em"}}>Bulk Save</h6></Button>
                        </Col>
                    </Row> */}
                    <Row className="align-items-center" style={{height: "6em", color:"#015E0D" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thick"}}>
                        <Col xs={1} style={{ textAlign:"center" }}>
                            <h5 style={{fontWeight:"bold", margin:0}}>Image</h5>
                        </Col>
                        <Col xs={3}>
                            <h5 style={{fontWeight:"bold", margin:0}}>Product Barcode</h5>
                        </Col>
                        <Col xs={2}>
                            <h5 style={{fontWeight:"bold", margin:0}}>Product Name</h5>
                        </Col>
                        <Col xs={1}>
                            <h5 style={{fontWeight:"bold", margin:0}}>Brand Name</h5>
                        </Col>
                        <Col xs={1}>
                            <h5 style={{fontWeight:"bold", margin:0}}>Weight</h5>
                        </Col>
                        <Col xs={1}>
                            <h5 style={{fontWeight:"bold", margin:0}}>Price</h5>
                        </Col>
                        <Col xs={1}>
                            <h5 style={{fontWeight:"bold", margin:0}}>GST</h5>
                        </Col>
                        <Col xs={2}>
                            <h5 style={{fontWeight:"bold", margin:0}}>Action</h5>
                        </Col>
                    </Row> 
                    {this.state.isLoading ?
                        <div className="dLoader"><PushSpinner size={50} color="#BDE8D1" loading={this.state.isLoading} /></div> :
                    <Row>
                        <Col style={{padding:0}}>
                            {this.state.barProducts!==[] && this.state.barProducts.map((item, index) => (
                                <BarcodeInfo updateItem={this.updateBarItem} updateChange={this.updateBarChange} key={index} barcode={item.upc} product={item.name} brand={item.brand} weight={item.weight} price={item.price} gst={item.gst} image={item.image} id={item._id} deleteItem={this.deleteItem}/>
                            ))}
                        </Col>
                    </Row> }
                    </div> : <div>
                    <Row className="align-items-center" style={{height: "8em", color:"#015E0D", backgroundColor:"#BDE8D1" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thick", textAlign:"left"}}>
                        <Col style={{ paddingInlineStart: "2em" }}>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control value={this.state.product} type="text" name="product" onChange={this.onChange} />
                        </Col>
                        <Col>
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control value={this.state.brand} type="text" name="brand" onChange={this.onChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Price Per pound</Form.Label>
                            <Form.Control value={this.state.price} type="number" name="price" onChange={this.onChange} />
                        </Col>
                        <Col>
                            <Form.Check type="checkbox" checked={this.state.gst} name="gst" label="GST?" onChange={this.onChange} />
                        </Col>
                        <Col>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="image" onChange={this.onChange}/>
                        </Col>
                        
                        <Col xs ={1}>
                            <Button onClick={()=>this.addWeight(this.state.product, this.state.price,this.state.brand,this.state.gst, this.state.image)}><h6 style={{margin:0, paddingTop: "1.5em"}}>Save</h6></Button>
                        </Col>    
                    </Row>
                    <Row className="align-items-center" style={{height: "6em", color:"#015E0D" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thick"}}>
                        <Col xs={1} style={{ textAlign:"center" }}>
                        Image
                        </Col>
                        <Col>
                        Product Name
                        </Col>
                        <Col>
                        Brand Name
                        </Col>
                        <Col>
                        Price per pound
                        </Col>
                        <Col>
                        GST
                        </Col>
                        <Col xs={2}>
                        Action
                        </Col>
                    </Row> 
                    {this.state.isLoading ?
                        <div className="dLoader"><PushSpinner size={50} color="#BDE8D1" loading={this.state.isLoading} /></div> :
                    <Row>
                        <Col style={{padding:0}}>
                            {this.state.weightProducts!==[] && this.state.weightProducts.map((item, index) => (
                                <WeightInfo updateItem={this.updateWeightItem} updateChange={this.updateWeightChange} index={index} key={index}  product={item.name} brand={item.brand} gst={item.gst}  price={item.price} image={item.image} id={item._id} deleteItem={this.deleteItem}/>
                            ))}
                        </Col>
                    </Row> }
                    </div>}
                </Container>
            </div>
        )
    }
}

export default Product;