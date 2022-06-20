import React from "react";
import {AiFillPlusSquare} from "react-icons/ai";
import {Container, Row, Col} from 'react-bootstrap';
import bullet from '../images/bullet.svg'

class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
            sourceData: this.props.weightProducts || [],
            filterData: this.props.weightProducts || [],
        }
    }

    handleChange = (e) => {
        this.setState({
            filterData: this.state.sourceData
        });
    };

    filterList = (e) => {
        const updatedList = this.state.sourceData.filter((item) => {
        return (
            item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
            );
        });
        this.setState({ filterData: updatedList });
    };

    render(){
        const searchBox = (
            <input
                type="text"
                onClick={this.handleChange}
                onChange={this.filterList}
                className="form-control"
                placeholder="Search"
                style={{ width: "90%", margin:"auto", marginTop:"1em" }}
            />
        );
        
        const selectBox = this.state.filterData.map((option, index) => (
            // <div key={option.continent} className="container">
            //     <h6 style={{display:"flex", justifyContent:"flex-start", marginTop:"1.2em"}}>{option.continent}</h6>
            //     {option.countries.map((country, index) => {
            //     return (
            //         <div key={index} style={{height:"2.1em", marginTop:".9em"  ,display:"flex", justifyContent:"space-between", borderBottomColor:"#BDE8D1", borderBottomWidth:"thin", borderBottomStyle:"solid", paddingBottom:0}}>
            //             <p> <img src={country.imgsrc} alt="dum" height="100%" /> {country.name}</p>
            //             <div style={{display:"flex", flexDirection:"row"}}>
            //                 {"$" + country.price}
            //                 <button onClick={()=>this.props.onSelect({name: country.name, price: country.price, imgsrc: country.imgsrc, brand: country.brand})}>
            //                     <AiFillPlusSquare />
            //                 </button>
            //             </div>
            //         </div>
            //     );
            // })}
            // </div>
            // <div className="container" key={index} style={{minHeight:"2.1em", marginTop:".9em"  ,display:"flex", justifyContent:"space-between", borderBottomColor:"#BDE8D1", borderBottomWidth:"thin", borderBottomStyle:"solid", paddingBottom:0}}>
            //     <p> <img src={option.image} alt="dum" height="27em" width="27em"/> {option.name}</p>
            //     <div style={{display:"flex", flexDirection:"row"}}>
            //         <p style={{minWidth:"4em", textAlign:"right", marginTop:"0.45em", marginBottom:0}}>{"$" + option.price + " /lb"}</p>
            //         <button onClick={()=>this.props.onSelect({name: option.name, price: option.price, imgsrc: option.image, brand: option.brand})}>
            //             <AiFillPlusSquare />
            //         </button>
            //     </div>
            // </div>
            <Row className="align-items-center" key={index} style={{borderBottom:"1px solid #BDE8D1", margin:"0 0.5em", padding:"1em 0"}}>
                <Col xs ={1}>
                    {/* <img src={option.image} alt="img" height="30em" width="30em" /> */}
                    <img
                    alt="bullet"
                    src={bullet}
                     height="15em"
                      width="15em"
                        style={{
                        color:"#BDE8D1",
                        fill:"#BDE8D1",
                    }}></img>
                </Col>
                <Col style={{textAlign:"left", fontSize:"1em", }}>
                    {option.name}
                </Col>
                <Col xs ={4} style={{textAlign:"right", fontWeight:"bold", paddingRight:"0"}}>
                    <span>{"$" + option.price + " /lb"}</span>
                </Col>
                <Col xs ={2}>
                    <button onClick={()=>this.props.onSelect({name: option.name, price: option.price, imgsrc: option.image, brand: option.brand})}>
                        <AiFillPlusSquare 
                        color="#F7BE9E"
                        style={{fontSize:"1.2em",
                         marginTop:"45%"}} />
                    </button>
                </Col>
            </Row>
        ));
        return(
            
            <div style={{marginBottom: "1em", color:"#015E0D"}}>
                <div style={{ padding:"1.5em", backgroundColor:"#015E0D", color:"white"}}>
                    <h6 style={{margin:0}}>Grocery Checkout UBC</h6>
                </div>
                {searchBox}
                <Container>
                {selectBox}
                </Container>
            </div>
        )
    }
}

export default Filter;