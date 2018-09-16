import React, { Component } from 'react';
import LeagueRank from './LeagueRank';
import RecentScores from './RecentScores';

class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {user_name: localStorage.getItem('user_name')};
        if(!this.state.user_name){
            this.props.history.push('/signin');
        }
    }
    
    render() {
        return (
            <div>
                <h1 className="white-text">Rankings:</h1>
                <LeagueRank />
            </div>
    );
  }
}

export default Home;