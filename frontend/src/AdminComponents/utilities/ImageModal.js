import React from "react";
import {Modal, Button} from "react-bootstrap";
import {AiOutlineClose} from "react-icons/ai";

class ImageModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            image: this.props.image,
            height: this.props.height,
            width: this.props.width
        };
    }

    render() {
        return (
            <div>
                <img src={this.state.image} style={{height: `${this.state.height}`}} alt="" onClick={() => this.setState({show: true})}/>
                <Modal show={this.state.show} onHide={() => this.setState({show: false})} 
                  aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body style={{textAlign:"center"}}>
                        <div style={{paddingTop:"1em"}}>
                            <Button variant="link" style={{position:"absolute", top:"-.5em", right:"-0.5em"}} onClick={()=>this.setState({show: false})}><AiOutlineClose/></Button>
                            <img src={this.state.image} style={{width: "100%"}} alt=""/>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default ImageModal;