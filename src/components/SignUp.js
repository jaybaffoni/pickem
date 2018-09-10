import React, { Component } from 'react';
import { Button, Input } from 'mdbreact';
import axios from 'axios';
import { DB_INFO } from '../db';

class SignUp extends Component {
    
    constructor(props){
        super(props);
        this.state = {error: false, message: '', user_name: '', password: '', confirm: '', loading: false};
        this.handleChange = this.handleChange.bind(this);
        this.checkCreds = this.checkCreds.bind(this);
        this.checkAcct = this.checkAcct.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        
    }
    
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    
    checkCreds(){
        //make sure passwords match and nothing is empty
        if(this.state.user_name == "" || this.state.password == "" || this.state.confirm == ""){
            this.setState({error: true, message: "All fields are required"});
        } else if (this.state.password != this.state.confirm){
            this.setState({error: true, message: "Passwords don't match"});
        } else {
            this.setState({error: false, message: '', loading: true});
            this.checkAcct();
        }
    }
    
    checkAcct(){
        axios.get(DB_INFO.address + '/users/' + this.state.user_name)
          .then((response) => {
                
                if(response.data.length === 0){
                    this.signUp();
                } else {
                    this.setState({error: true, message: "A user already exists with that name"});;
                }
            })
          .catch((error) => {
            console.log(error);
            this.setState({error: true, message: "Could not sign up"});
          });
    }
    
    signUp() {
        const data = {user_name: this.state.user_name, password: this.state.password};
        axios.post(DB_INFO.address + '/users', {
            data
          })
          .then((response) => {
                this.signIn();

          })
          .catch((error) => {
            console.log(error);
            this.setState({error: true, message: "Could not sign up"});
          });
    }
    
    signIn() {
        axios.get(DB_INFO.address + '/users/' + this.state.user_name)
          .then((response) => {
                localStorage.setItem("user_name", this.state.user_name);
                localStorage.setItem("user_id", response.data.user_id);
                this.props.history.push('/');
            })
          .catch((error) => {
            console.log(error);
            this.setState({error: true, message: 'Could not sign in', loading: false});
          });
    }
    
    render() {
        return (
            <div className="login-card">
                    <h1>Pick 'Em</h1>
                    <form>
                      <div className="grey-text">
                        <Input label="Enter a username" group type="email" name="user_name" onChange={this.handleChange} validate error="wrong" success="right" value={this.state.user_name}/>
                        <Input label="Enter a password" group type="password" name="password" onChange={this.handleChange} validate value={this.state.password}/>
                        <Input label="Confirm your password" group type="password" name="confirm" onChange={this.handleChange} validate value={this.state.confirm}/>
                      </div>
                    {this.state.error && (<p className="error-text">{this.state.message}</p>)}
                    <Button block color="primary" onClick={this.checkCreds}>Sign Up</Button>
                    </form>
                    <p style={{marginTop: 15}} >Already have an account? <a href="/signin">Sign in here</a></p>
                </div>
    );
  }
}

export default SignUp;