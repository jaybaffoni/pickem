import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'mdbreact';
import PickRow from './PickRow';
import { DB_INFO } from '../db';

export default class Picks extends Component {
    
    constructor(props){
        super(props);
        this.state = {done: false, user_id: localStorage.getItem('user_id'), games: [], picks: {}};
        this.getGames = this.getGames.bind(this);
        this.tabRow = this.tabRow.bind(this);
        this.getGames();
    }
    
    getGames(){                       
        axios.get(DB_INFO.address + '/games')
          .then((response) => {
                
                this.setState({games: response.data});
            })
          .catch((error) => {
            console.log(error);
          });
    }
    
    tabRow(){
        console.log('loading picks to row');
        var count = Object.keys(this.state.games).length;
        return this.state.games.map((object, i) => {
            //var object = this.state.games[key];
            return(
                    <PickRow key={i} obj={object} k={object.game_id} />
                )
            
        })
    }
    
    render(){
        return (
            <div className="row">
                {this.tabRow()}
            </div>
        )
    }
    
    
}