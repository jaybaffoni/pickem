import React, { Component } from 'react';
import { Button, Input } from 'mdbreact';
import axios from 'axios';
import logo from '../logo.svg';
import { DB_INFO } from '../db';

class SignIn extends Component {
    
    constructor(props){
        super(props);
        this.state = {error: false, message: '', user_name: '', password: '', loading: false};
        this.handleChange = this.handleChange.bind(this);
        this.checkCreds = this.checkCreds.bind(this);
        this.checkAcct = this.checkAcct.bind(this);
        
    }
    
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    
    checkCreds(){
        //make sure passwords match and nothing is empty
        if(this.state.user_name == "" || this.state.password == ""){
            this.setState({error: true, message: "All fields are required"});
        } else {
            this.setState({error: false, message: '', loading: true});
            this.checkAcct();
        }
    }
    
    checkAcct(){
        axios.get(DB_INFO.address + '/users/' + this.state.user_name)
          .then((response) => {
                
                if(response.data.length === 0){
                    this.setState({loading: false});
                     this.setState({error: true, message: 'No user found with that name'});
                } else if(this.state.password != response.data.password){
                    this.setState({loading: false});
                    this.setState({error: true, message: 'Incorrect password'});
                } else {
                    this.setState({user_id: response.data.user_id});
                    this.signIn();
                }
            })
          .catch((error) => {
            console.log(error);
            this.setState({error: true, message: 'Could not sign in', loading: false});
          });
    }
    
    signIn(){
        var millisecondsToWait = 1000;
        setTimeout(() => {
            this.setState({loading: false});
            localStorage.setItem("user_name", this.state.user_name);
            localStorage.setItem("user_id", this.state.user_id);
            this.props.history.push('/');
        }, millisecondsToWait);
        
    }
    
    render() {
        return (
            <div className="login-card">
                    <h1>Pick 'Em</h1>
                    {this.state.loading ? <img src={logo} className="App-logo" alt="loading" />: 
                    <div>
                    <form>
                      <div className="grey-text">
                        <Input label="Enter username" group type="email" name="user_name" onChange={this.handleChange} validate error="wrong" success="right" value={this.state.user_name}/>
                        <Input label="Enter password" group type="password" name="password" onChange={this.handleChange} validate value={this.state.password}/>
                      </div>
                    {this.state.error && (<p className="error-text">{this.state.message}</p>)}
                    <Button block color="primary" onClick={this.checkCreds}>Sign In</Button>
                    </form>
                    <p style={{marginTop: 15}} >Don't have an account? <a href="/signup">Sign up here</a></p>
                    </div>}
                </div>
    );
  }
}

export default SignIn;