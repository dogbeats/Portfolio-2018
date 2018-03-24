import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import data from './data/cod.json';
import Img from 'react-image';

var all_coding = data.coding;

class Content extends Component {
	constructor(props) {
		super(props);
		
		this.heapSwap = this.heapSwap.bind(this);
		this.heapMaxHeapify = this.heapMaxHeapify.bind(this);
	}
		
	heapSwap(i, j) {
		var temp = all_coding[i];
		all_coding[i] = all_coding[j];
		all_coding[j] = temp;
	}
	
	heapMaxHeapify(i, length) {
		while(true) {
			var left = i*2 + 1;
			var right = i*2 + 2;
			var largest = i;
			if (left < length && all_coding[left]['key'] > all_coding[largest]['key']) {
				largest = left;
			}

			if (right < length && all_coding[right]['key'] > all_coding[largest]['key']) {
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
		this.heapHeapify(all_coding.length);
		for (var i = all_coding.length - 1; i > 0; i--) {
			this.heapSwap(i, 0);
			this.heapMaxHeapify(0, i-1);
		}
	}
	
	render() {
		this.heapSort();
		return (
			<div className="pa-table-container">
			{all_coding.map(coding=>
				<div className="pa-row" key={coding.key}>
					<div className="pa-col-image">
						<Img src={require(`${coding.filepath}`)} className='pa-display-img'/>
					</div>
					<div className="pa-col-description">
						<div className="pa-col-description-name">
							{coding.name}
						</div>
						<div className="pa-col-description-desc">
							{coding.description}
						</div>
					</div>
				</div>
			)}
			</div>
		);
	}
}

export default Content;