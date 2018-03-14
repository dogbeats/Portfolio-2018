import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import logo from './logo.svg';
import './App.css';
import './style/style.css';

class Menu extends React.Component {	
	constructor(props) {
		super(props);
		this.state = {opened:false};
		
		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.setState({opened:true});
		console.log(this.state.opened);
		console.log(this.props.className);
		console.log('handle click');
	}
	
	render() {
		//let bgColor = this.state.color_black ? this.props.color : this.props.color2		
		var classes = classNames({
			'menu-option':true,
			'menu-opened': this.state.opened
		});
		
		return (
			<div>
				<div id='menu-option-1' className={classes} onClick={this.handleClick.bind(this)} optionchoice='test' style={{width:this.state.width}}>1</div>
				<div id='menu-option-2' className={classes} onClick={this.handleClick.bind(this)} optionchoice='test' style={{width:this.state.width}}>2</div>
				<div id='menu-option-3' className={classes} onClick={this.handleClick.bind(this)} optionchoice='test' style={{width:this.state.width}}>3</div>
				<div id='menu-option-4' className={classes} onClick={this.handleClick.bind(this)} optionchoice='test' style={{width:this.state.width}}>4</div>
			</div>
		);
	}
}

export default Menu;

/*class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);*/