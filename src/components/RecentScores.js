import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, Button } from 'mdbreact';
import { DB_INFO } from '../db';

class RecentScores extends Component {
    
    constructor(props){
        super(props);
        this.state = {loaded: 0, games: []};
        this.getGames = this.getGames.bind(this);
        this.getQtr = this.getQtr.bind(this);
        this.getData = this.getData.bind(this);
        this.getData();
    }
    
    getData(){
        axios.get(DB_INFO.address + '/games')
          .then((response) => {
                this.setState({games: response.data});
                
            })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
    }
    
    getQtr(key){
        if(this.state.games[key].qtr){
            return (this.state.games[key].qtr);
        } else {
            return 'Pre-Game';
        }
    }
    
    getGames(){

        return (
            Object.keys(this.state.games).map((key) => {
                if(this.getQtr(key) != 'Pre-Game'){
                    
                
                return(
                    <div className="col-md-6" style={{marginBottom: 20}}>
                    <Card>
                        <CardBody>
                            <table className="table dark-table">
                              <tr>
                                <th></th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>T</th>
                              </tr>
                              <tr>
                                <td><h4>{this.state.games[key].away.abbr}</h4></td>
                                <td>{this.state.games[key].away.score[1]}</td>
                                <td>{this.state.games[key].away.score[2]}</td>
                                <td>{this.state.games[key].away.score[3]}</td>
                                <td>{this.state.games[key].away.score[4]}</td>
                                <td>{this.state.games[key].away.score[5]}</td>
                                <td><h3>{this.state.games[key].away.score.T}</h3></td>
                              </tr>
                              <tr>
                                <td><h4>{this.state.games[key].home.abbr}</h4></td>
                                <td>{this.state.games[key].home.score[1]}</td>
                                <td>{this.state.games[key].home.score[2]}</td>
                                <td>{this.state.games[key].home.score[3]}</td>
                                <td>{this.state.games[key].home.score[4]}</td>
                                <td>{this.state.games[key].home.score[5]}</td>
                                <td><h3>{this.state.games[key].home.score.T}</h3></td>
                              </tr>
                            </table>
                            <h4>{this.getQtr(key)}</h4>
                        </CardBody>
                    </Card>
                    </div>);
            }
            })
            
        )
    }
    
  render() {
    return (
        <div className="row">
          {this.getGames()}
        </div>
    );
  }
}

export default RecentScores;