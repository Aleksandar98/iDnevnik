import React, { Component } from 'react'
import '../login.css'
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             response: '',
             email:'',
             password: ''
        }
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }
    naKlik(e) {
        e.preventDefault();
        const zaSlanje = { email: this.state.email, password: this.state.password}
         axios.post('http://localhost:8080/profesori/login', zaSlanje)
        .then(profesor => {
            profesor.data ?             this.props.history.push({
                pathname: '/Profesor',
                state: {podaciProfesor: profesor.data}
            }) : this.setState({response:'Proverite svoje podatke!'})
            // this.props.history.push({
            //     pathname: '/Profesor',
            //     state: {podaciProfesor: profesor.data}
            // })
        })
    }
  
    render() {
        return (
            <div className="container">
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt='slika' />
                    <p id="profile-name" className="profile-name-card"></p>
                    <form className="form-signin" onSubmit={this.naKlik.bind(this)}>
                        <span id="reauth-email" className="reauth-email"></span>
                        <input type="text" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus 
                        value={this.state.email}
                        onChange={this.handleChangeEmail.bind(this)}
                        />
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required 
                        value={this.state.password}
                        onChange={this.handleChangePassword.bind(this)}
                        />
                        <div style={{textAlign:"center"}}>
                        <label style={{color:"red"}}>{this.state.response}</label>
                        </div>
                        <button  className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Prijavi se</button>
                    </form>
                </div>
        </div>
        )
    }
}
