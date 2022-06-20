import React from 'react';
import MerchantMain from './main';
import axios from 'axios';
import {getUser} from './utilities/common'
import {URL} from './config'

class MerchantAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isUser: false,
            isMerchant: false,
        };
    }

    componentDidMount() {
        if(getUser()){
            axios.get(`${URL}user/${getUser()}`).then(res => {
                if(res.data.status){
                    if(res.data.isMerchant){
                        this.setState({isLoading: false, isMerchant: true, isUser: true});
                    }else{
                        this.setState({isLoading: false, isUser: true, isMerchant: false});
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        }else{
            this.setState({
                isLoading: false,
                isUser: false,
                isMerchant: false
            });
        }
    }

    render() {
        return (
              <div>
                  {this.state.isLoading ? <div>Loading...</div> : <MerchantMain isMerchant={this.state.isMerchant} isUser={this.state.isUser} />}
              </div>
          );
      }
}

export default MerchantAuth;