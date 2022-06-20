import React from 'react';

class Register extends React.Component {
    render() {
        return(
            <div style={{textAlign:"left"}}>
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="merchant"  onChange={(e)=>this.props.onInputChange('merchant', e.target.value)} required />
                    <label htmlFor="email" className="form__label">Merchant</label>
                </div>
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="userName"  onChange={(e)=>this.props.onInputChange('username', e.target.value)} required />
                    <label htmlFor="email" className="form__label">User Name</label>
                </div>                
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Email"  onChange={(e)=>this.props.onInputChange('email', e.target.value)} required />
                    <label htmlFor="email" className="form__label">Email</label>
                </div>
                <div className="form__group field">
                    <input type="password" className="form__field" placeholder="Password" onChange={(e)=>this.props.onInputChange('password', e.target.value)} required />
                    <label htmlFor="password" className="form__label">Password</label>
                </div>
                <div className="form__group field">
                    <input type="password" className="form__field" placeholder="Password" onChange={(e)=>this.props.onInputChange('repassword', e.target.value)} required />
                    <label htmlFor="password" className="form__label">Re-enter Password</label>
                </div>
            </div>
        )
    }
}

export default Register;