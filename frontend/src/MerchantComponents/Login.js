import React from 'react';
import './css/style.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    

    render() {
        return(
            <div style={{textAlign:"left"}}>
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Email"  onChange={(e)=>this.props.onInputChange('email', e.target.value)} required />
                    <label htmlFor="email" className="form__label">Email</label>
                </div>
                <div className="form__group field">
                    <input type="password" className="form__field" placeholder="Password" onChange={(e)=>this.props.onInputChange('password', e.target.value)} required />
                    <label htmlFor="password" className="form__label">Password</label>
                </div>
            </div>
        )
    }
}

export default Login;