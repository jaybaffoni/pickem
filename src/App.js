import React, { Component } from 'react';
import './App.css';

import { Navbar, NavbarToggler, NavbarNav, NavItem, NavLink, NavbarBrand, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Picks from './components/Picks';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem('user_name'),
            collapse: false,
            isWideEnough: false,
        };
        this.onClick = this.onClick.bind(this);
        this.signOut = this.signOut.bind(this);
        this.account = this.account.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    
    signOut(){
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
        this.props.history.push('/signin');
        this.setState({user_name: ''});
    }
    
    account(){
        this.props.history.push('/account');
    }
    
    render() {
        this.state.user_name = localStorage.getItem('user_name');
        return (
            <div>
                <Navbar fixed="top" color="primary-color" dark expand="md" >
                    <NavbarBrand href="/">
                        <strong>Pick 'Em</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        {this.state.user_name && (
                        <NavbarNav left>
                          <NavItem>
                              <NavLink to="/">Home</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/picks">Picks</NavLink>
                          </NavItem>
                          
                        </NavbarNav>)}
                        <NavbarNav right>
                            {this.state.user_name && (
                            <NavItem>
                                <Dropdown>
                                    <DropdownToggle nav caret>{this.state.user_name}</DropdownToggle>
                                    <DropdownMenu>
                                    <DropdownItem onClick={this.account}>My Account</DropdownItem>
                                    <DropdownItem onClick={this.signOut}>Sign Out</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem> )}
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/signin" component={SignIn}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/picks" component={Picks}/>
                        <Route path="*" render={() => <Redirect to="/" />} />
                    </Switch>
                </div>
            </div>
    );
  }
}

export default App;
