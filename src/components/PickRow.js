import React, { Component } from 'react';
import { Button } from 'mdbreact';
import axios from 'axios';
import { DB_INFO } from '../db';

class PickRow extends Component {
    
    constructor(props){
        super(props);
        this.state = {user_id: localStorage.getItem('user_id'), key: this.props.k, obj: this.props.obj, winner: 'none'};
        this.getPick = this.getPick.bind(this);
        this.getColor = this.getColor.bind(this);
        this.makePick = this.makePick.bind(this);
        this.pickHome = this.pickHome.bind(this);
        this.pickAway = this.pickAway.bind(this);
        this.getPick();
    }
    
    getPick(){
        axios.get(DB_INFO.address + '/picks/' + this.state.user_id + '/' + this.state.key)
          .then((response) => {
                if(response.data.winner){
                    this.setState({winner: response.data.winner});   
                }
            })
          .catch((error) => {
            console.log(error);
          });
    }
    
    getColor(team){
        if(this.state.winner == team){
            return 'success';
        } else {
            return 'danger';
        }
    }
    
    pickHome(){
        this.makePick(this.state.obj.home);
    }
    
    pickAway(){
        this.makePick(this.state.obj.visitor);
    }
    
    makePick(team){
        const data = {user_id: this.state.user_id, game_id: this.state.key, winner: team};
        console.log(data.user_id);
        if(this.state.winner == 'none'){
            axios.post(DB_INFO.address + '/picks', {
            data
          })
          .then((response) => {
                console.log(response);
                this.setState({winner: team});
          })
          .catch((error) => {
            console.log(error);
          });
        } else {
            axios.put(DB_INFO.address + '/picks', {
            data
          })
          .then((response) => {
                console.log(response);
                this.setState({winner: team});
          })
          .catch((error) => {
            console.log(error);
          });
        }
        
    }
    
    render() {
        var obj = this.state.obj;
        var visitor = obj.vnn.charAt(0).toUpperCase() + obj.vnn.substr(1);
        var home = obj.hnn.charAt(0).toUpperCase() + obj.hnn.substr(1);
        return (
            <div className="login-card col-md-6" style={{marginTop:20}}>
                <h4>{obj.day} {obj.time}</h4>
                <Button size="lg" block outline color={this.getColor(obj.visitor)} onClick={this.pickAway}>{visitor}</Button>
                <Button size="lg" block outline color={this.getColor(obj.home)} onClick={this.pickHome} style={{marginTop:10}}>{home}</Button>
            </div>
    );
  }
}

export default PickRow;