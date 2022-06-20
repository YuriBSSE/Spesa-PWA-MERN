import React from "react";
import LoadingScreen from '../images/loadingScreen.png'
class LogoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.log(this.props.page)
    if(this.props.page === 0){
      const interval = setTimeout(() => {
        this.props.nextPage()
      }, 2000);
      return () => clearInterval(interval);
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#BDE8D1",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          alt="Loading Screen"
            style={{
              position: "relative",
              width: "100vw",
            height: "100vh",
            }}
            src={LoadingScreen}
          />
      </div>
    );
  }
}

export default LogoScreen;

