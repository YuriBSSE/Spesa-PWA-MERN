import React from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
// import axios from 'axios';
// import {URL} from '../../config';
import ImageModal from '../../utilities/ImageModal';

class WeightInfo extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.gst);
        this.state = {
            isEdit: false
        };
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
            this.props.updateChange(e.target.name, e.target.files[0], this.props.id);
        } else this.props.updateChange(e.target.name, e.target.value, this.props.id);
    }
    updateItem = () => {
       this.props.updateItem(this.props.id);
    }
    render(){
        return(
            <div>
                <Container fluid>
                    {this.state.isEdit===false ?
                    <Row className="align-items-center" style={{minHeight: "3em", color:"#015E0D" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thin"}}>
                        <Col xs={1}>
                            <ImageModal image={this.props.image} height="2em" />
                        </Col>
                        <Col >
                            {this.props.product}
                        </Col>
                        <Col >
                            {this.props.brand}
                        </Col>
                        <Col >
                            {this.props.price}
                        </Col>
                        <Col>
                        {this.props.gst ? "Yes" : "No"}
                        </Col>
                        <Col xs={1}>
                            <div className="hoverDiv" onClick={()=>this.setState({isEdit: !this.state.isEdit})}>{this.state.isEdit ? "Save" : "Edit"}</div>
                        </Col>
                        <Col xs={1}>
                            <div className="hoverDiv" onClick={()=>this.props.deleteItem("weightProduct",this.props.id)}>Delete</div>
                        </Col>
                    </Row>
                    :<Form>
                        <Row className="align-items-center" style={{minHeight: "3em", color:"#015E0D" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thin"}}>
                            <Col xs={1}>
                                <Form.Control  type="file" value={this.props.image === null ? "Y" : ""} name="image" onChange={this.onChange}/>
                            </Col>
                            <Col >
                                <Form.Control value={this.props.product} type="text" name="product" onChange={this.onChange} />
                            </Col>
                            <Col >
                                <Form.Control type="number" value={this.props.price} name="price" onChange={this.onChange}/>
                            </Col>
                            <Col xs={1}>
                                <div className="hoverDiv" onClick={this.updateItem}>{this.state.isEdit ? "Save" : "Edit"}</div>
                            </Col>
                            <Col xs={1}>
                                <div className="hoverDiv" onClick={()=>this.setState({isEdit: !this.state.isEdit})}>Cancel</div>
                            </Col>
                        </Row>
                    </Form>}
                </Container>
            </div>
        )
    }
}

export default WeightInfo;