import React, { Component } from 'react';
import axios from 'axios';
import { DB_INFO } from '../db';

class LeagueRank extends Component {
    
    constructor(props){
        super(props);
        this.state = {user_name: localStorage.getItem('user_name'), users: [], ranks: {wins: 0, last: 0, total: 0}};
        this.getUsers = this.getUsers.bind(this);
        this.userRank = this.userRank.bind(this);
        this.setRank = this.setRank.bind(this);
        this.getUsers();
    }
    
    getUsers(){
        axios.get(DB_INFO.address + '/users')
          .then((response) => {
                this.getRanks(response.data);
            })
          .catch((error) => {
            console.log(error);
          });
    }

    getRanks(users){
        console.log('getting ranks');
        users.map((object, i) => {
            console.log(object.user_id);
            var ranks = {};
            axios.get(DB_INFO.address + '/users/rank/' + object.user_id)
            .then((response) => {
                console.log('got rank for ' + object.user_id);
                object.wins = response.data.wins;
                object.last = response.data.last;
                object.total = response.data.total;
                this.setState({users: users});
                })
            .catch((error) => {
                console.log(error);
            });
        });
    }

    setRank(name, id, i){
        axios.get(DB_INFO.address + '/users/rank/' + id)
          .then((response) => {
              console.log(response.data.total);
            
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
                    <td>{object.wins}</td>
                    <td>{object.last}</td>
                    <td>{object.total}</td>
                </tr>
            );
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
                            <th>This Week</th>
                            <th>Last Week</th>
                            <th>All Time</th>
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