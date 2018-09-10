import React, { Component } from 'react';
import axios from 'axios';
import { DB_INFO } from '../db';

class LeagueRank extends Component {
    
    constructor(props){
        super(props);
        this.state = {user_name: localStorage.getItem('user_name'), users: []};
        this.getUsers = this.getUsers.bind(this);
        this.userRank = this.userRank.bind(this);
        this.getUsers();
    }
    
    getUsers(){
        axios.get(DB_INFO.address + '/users')
          .then((response) => {
                this.setState({users: response.data});
            })
          .catch((error) => {
            console.log(error);
          });
    }
    
    userRank(){
      if(this.state.users instanceof Array){
        return this.state.users.map(function(object, i){
            return (
                    <tr key={i}>
                        <td>{object.user_name}</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                )
        })
      }
    }
    
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Week</th>
                            <th>All Time</th>
                            <th>Wins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userRank()}
                    </tbody>
                </table>
                
            </div>
    );
  }
}

export default LeagueRank;