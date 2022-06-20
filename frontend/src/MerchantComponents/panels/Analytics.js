import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import Chart from "react-google-charts";

class Analytics extends React.Component {

    render() {
        console.log(this.props.mostScanned);
        let container = [];
        this.props.transData.forEach(e => container.push([new Date(e[0]), e[1]]))
        return(
            <div>
                <Container>
                    <Row style={{marginBottom:"3em", marginTop:"3em"}} className="align-items-center">
                        <Col xs = {4}>
                            <Container style={{borderRadius:"1em",color:"#015E0D", minHeight:"28vh", overflow:"hidden", border:"3px solid #BDE8D1", textAlign:"left" }}>
                                <Row style={{marginTop:"0.8em"}}>
                                    <Col>
                                    <b>Total Transactions</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <b style={{fontSize:"4em"}}>{this.props.total_transactions}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <div style={{display:"Flex", margin: ".8em 0" ,flexDirection:"row", justifyContent:"space-between", padding:"1em", borderRadius:"10px", backgroundColor:"#F7BE9E"}}>
                                        <b style={{margin:0}}>Average Basket</b>
                                        <b style={{margin:0}}>{Math.round(this.props.avg_basket)}</b>
                                    </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs ={4}>
                            <Container style={{borderRadius:"1em", minHeight:"28vh", overflow:"hidden",border:"3px solid #BDE8D1", color:"#015E0D", textAlign:"left"}}>
                                <Row style={{marginTop:"0.8em", marginBottom:"0.8em"}}>
                                    <Col>
                                        <b>Most Scanned Products</b>
                                    </Col>
                                </Row>

                                {this.props.mostScanned!==[] ? this.props.mostScanned.map((item, index) => {
                                    return(
                                        <Row key={index} style={{marginBottom:".5em"}}>
                                            <Col xs={9}>
                                                {item.name}
                                            </Col>
                                            <Col style={{textAlign:"right"}}>
                                                ${item.price}
                                            </Col>
                                        </Row>)}) : null}
                            </Container>
                        </Col>
                        <Col xs={4}>
                            <Container style={{borderRadius:"1em",color:"#015E0D", minHeight:"28vh", overflow:"hidden", border:"3px solid #BDE8D1", textAlign:"left" }}>
                                <Row style={{marginTop:"0.8em"}}>
                                    <Col>
                                    <b>Total Items Sold</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <b style={{fontSize:"4em"}}>{this.props.total_sold}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <div style={{display:"Flex", margin: ".8em 0" ,flexDirection:"row", justifyContent:"space-between", padding:"1em", borderRadius:"10px", backgroundColor:"#F7BE9E"}}>
                                        <b style={{margin:0}}>Items Scanned</b>
                                        <b style={{margin:0}}>{this.props.items_scanned}</b>
                                    </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row className="align-items-center" >
                        <Col xs = {8}>
                            <Container style={{borderRadius:"1em", overflow:"hidden", border:"3px solid #BDE8D1", minHeight:"50vh"}}>
                                <Row  className="align-items-center">
                                    <Col style={{paddingTop:"1em", textAlign:"left", color:"#105E0D"}}>
                                        <p style={{marginBottom:"1em", fontWeight:"bold"}}>Transaction History</p>
                                    <Chart
                                        height={'40vh'}
                                        chartType="Line"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            [{ type: 'date', label: 'Date' },'Transactions',],
                                            ...container
                                        ]}
                                        options={{
                                            titleTextStyle: {
                                                color: '#015E0D',
                                            },title: 'Transactions',
                                            legend: { position: 'none' },
                                            colors: ['#015E0D'],
                                            width: "100%",
                                            height:"100%",
                                            series: {
                                            // Gives each series an axis name that matches the Y-axis below.
                                            0: { axis: 'Transactions' },
                                            1: { axis: 'Date' },
                                            },
                                            axes: {
                                            // Adds labels to each axis; they don't have to match the axis names.
                                            y: {
                                                Temps: { label: 'Transactions' },
                                                Daylight: { label: 'Daylight' },
                                            },
                                            },
                                        }}
                                        rootProps={{ 'data-testid': '4' }}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs ={4}>
                            <Container style={{borderRadius:"1em",color:"#015E0D", minHeight:"50vh", overflow:"hidden", border:"3px solid #BDE8D1", textAlign:"left" }}>
                                <Row style={{marginTop:"0.8em", marginBottom:"1em"}}>
                                    <Col>
                                    <b>Latest Orders</b>
                                    </Col>
                                </Row>
                                {this.props.order.map((item, index) => {
                                    return(
                                        <Row className="align-items-center" key={index} style={{marginBottom:".75em"}}>
                                            <Col>
                                                {item._id}
                                            </Col>
                                            <Col style={{textAlign:"right"}}>
                                                ${item.total}
                                            </Col>
                                        </Row>)})}
                            </Container>
                        </Col>
                    </Row>
                </Container>                
            </div>
        )
    }
}

export default Analytics;