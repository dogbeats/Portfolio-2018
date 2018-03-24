import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import data from './data/pa.json';
import Img from 'react-image';

var all_pa = data.pixelart;
var init_loaded = false;
//var visible_pa = [];

class PA extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page:0,
			per_page:10,
			visible_pa:[],
			sort_option:'',
			sort_display:'none'
		
		};
		
		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this);
		this.changePage = this.changePage.bind(this);
		this.heapSwap = this.heapSwap.bind(this);
		this.heapMaxHeapify = this.heapMaxHeapify.bind(this);
		this.changeSortOptionField = this.changeSortOptionField.bind(this);
		this.toggleHiddenField = this.toggleHiddenField.bind(this);
	}
	//document.getElementById('menu-option-1').addEventListener('click',function(){ModifyOutput('menu-option-1');});

	handleClick() {
		//this.setState({per_page:5});
		//this.setState({page:5});
		//console.log(this.state.page);
		//console.log(this.state.per_page);
	}
	
	heapSwap(i, j) {
		var temp = all_pa[i];
		all_pa[i] = all_pa[j];
		all_pa[j] = temp;
	}
	
	heapMaxHeapify(i, length) {
		while(true) {
			var left = i*2 + 1;
			var right = i*2 + 2;
			var largest = i;
			if (left < length && all_pa[left]['ymd_date'] < all_pa[largest]['ymd_date']) {
				largest = left;
			}

			if (right < length && all_pa[right]['ymd_date'] < all_pa[largest]['ymd_date']) {
				largest = right;
			}

			if (i == largest) {
				break;
			}

			this.heapSwap(i, largest);
			i = largest;
		}
	}
	
	heapHeapify(length) {
		for (var i = Math.floor(length/2); i >= 0; i--) {
			this.heapMaxHeapify(i, length);
		}
	}
	
	heapSort() {
		this.heapHeapify(all_pa.length);
		for (var i = all_pa.length - 1; i > 0; i--) {
			this.heapSwap(i, 0);
			this.heapMaxHeapify(0, i-1);
		}
	}
	
	changeSortOptionField(value) {
		switch(value)
		{
			case '1':
				this.setState({sort_option:'most recent first'});
			break;
			case '2':
				this.setState({sort_option:'most recent last'});
			break;
			default:
				this.setState({sort_option:'error processing sort'});
		}
	}
	
	changePage(num)	{
		var number = num;
		console.log('called');
		this.heapSort();
		this.state.visible_pa = [];
		for(var i = number*this.state.per_page; i < number*this.state.per_page + this.state.per_page; i++)
		{
			console.log(number*this.state.per_page + ' : ' + (number*this.state.per_page + this.state.per_page));
			if(all_pa[i])
				this.state.visible_pa.push(all_pa[i]);
			else
				break;
		}
		this.setState({page:number});
	}
	
	toggleHiddenField(id) {
		switch(id)
		{
			default:
				if(this.state.sort_display=='none')
					this.setState({sort_display:'inline-block'})
				else
					this.setState({sort_display:'none'})
		}
	}
	
	render() {
	var page = this.state.page;
	var per_page = this.state.per_page;
	var number_of_pages = [];
	
	for(var i = 0;i < all_pa.length/10; i++)
	{
		number_of_pages.push(i);
	}
	
	if(!init_loaded)
	{
		this.changePage(0);
		init_loaded=true;
	}
	
	var sort_style = {
		display: this.state.sort_display,
		position: 'absolute'
	};
	
	return (
		<div>
			<div className="pa-header">
				<div className="pa-page-options">
				{number_of_pages.map(nop=>
					
					nop == this.state.page ? 
					(<div className="pa-page-numbers pa-page-selected" onClick={this.changePage.bind(this, nop)} key={nop}>
						{nop+1}
					</div>) : 
					(<div className="pa-page-numbers" onClick={this.changePage.bind(this, nop)} key={nop}>
						{nop+1}
					</div>)
					
				)}
				</div>
				<div className="pa-sort-options">
					<div className="pa-sort">
						<div className="pa-sort-header" onClick={this.toggleHiddenField.bind(this,0)}>
							Sort By: <span className="pa-sort-chosen">{this.state.sort_option}</span>
						</div>
						<ul className="pa-sort-contents" style={sort_style} onClick={this.toggleHiddenField.bind(this,0)}>
							<li onClick={this.changeSortOptionField.bind(this,'1')}>most recent first</li>
							<li onClick={this.changeSortOptionField.bind(this,'2')}>most recent last</li>
						</ul>
					</div>
					<div className="pa-filter">
					</div>
				</div>
				<div className="pa-sort-options">
					<div className="pa-sort">
						<div className="pa-sort-header" onClick={this.toggleHiddenField.bind(this,0)}>
							Sort By: <span className="pa-sort-chosen">{this.state.sort_option}</span>
						</div>
						<ul className="pa-sort-contents" style={sort_style} onClick={this.toggleHiddenField.bind(this,0)}>
							<li onClick={this.changeSortOptionField.bind(this,'1')}>most recent first</li>
							<li onClick={this.changeSortOptionField.bind(this,'2')}>most recent last</li>
						</ul>
					</div>
					<div className="pa-filter">
					</div>
				</div>
			</div>
			<div className="pa-table-container">
			{this.state.visible_pa.map(pa=>
				<div className="pa-row" key={pa.key}>
					<div className="pa-col-image">
						<Img src={require(`${pa.filepath}`)} className='pa-display-img'/>
					</div>
					<div className="pa-col-description">
						<div className="pa-col-description-name">
							{pa.name}
						</div>
						<div className="pa-col-description-date">
							{pa.dmy_date}
						</div>
						<div className="pa-col-description-desc">
							{pa.description}
						</div>
					</div>
				</div>
			)}
			</div>
		</div>
    );
  }
}

export default PA;