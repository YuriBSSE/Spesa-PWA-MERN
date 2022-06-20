import React from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import ImageModal from '../../utilities/ImageModal';

class BarcodeInfo extends React.Component{
    constructor(props){
        super(props);
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
        } else if(e.target.type === "checkbox") {
            this.props.updateChange('gst', e.target.checked, this.props.id);
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
                        <Col xs={3}>
                            {this.props.barcode}
                        </Col>
                        <Col xs={2}>
                            {this.props.product}
                        </Col>
                        <Col xs={1}>
                            {this.props.brand}
                        </Col>
                        <Col xs={1}>
                            {this.props.weight}
                        </Col>
                        <Col xs={1}>
                            {this.props.price}
                        </Col>
                        <Col xs={1}>
                            <Form.Check type="checkbox" checked={this.props.gst} name="GST" label="GST" onChange={this.onChange} disabled />
                        </Col>
                        <Col xs={1}>
                            <div className="hoverDiv" onClick={()=>this.setState({isEdit: !this.state.isEdit})}>{this.state.isEdit ? "Save" : "Edit"}</div>
                        </Col>
                        <Col xs={1}>
                            <div className="hoverDiv" onClick={()=>this.props.deleteItem("barcode",this.props.id)}>Delete</div>
                        </Col>
                    </Row>
                    :<Form>
                        <Row className="align-items-center" style={{minHeight: "3em", color:"#015E0D" ,borderBottomStyle: "solid", borderBottomColor: "#015E0D", borderBottomWidth:"thin"}}>
                            <Col xs={1}>
                                <Form.Control  type="file" value={this.props.image || ""} name="image" onChange={this.onChange}/>
                            </Col>
                            <Col xs={3}>
                                <Form.Control value={this.props.barcode} type="text" name="barcode" onChange={this.onChange} />
                            </Col>
                            <Col xs={2}>
                                <Form.Control value={this.props.product} type="text" name="product" onChange={this.onChange} />
                            </Col>
                            <Col xs={1}>
                                <Form.Control value={this.props.brand} type="text" name="brand" onChange={this.onChange}/>
                            </Col>
                            <Col xs={1}>
                                <Form.Control type="number" value={this.props.weight} name="weight" onChange={this.onChange}/>
                            </Col>
                            <Col xs={1}>
                                {this.props.price}
                            </Col>
                            <Col xs={1}>
                                <Form.Check type="checkbox" checked={this.props.gst} name="GST" label="GST" onChange={this.onChange} />
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

export default BarcodeInfo;