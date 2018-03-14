import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class About extends Component {
	render() {
	var testoutput = <div id='csasc'>about</div>;
	
	function ModifyOutput(id)
	{
		switch(id)
		{
			case 'menu-option-1':
				testoutput = <div>Page 1</div>
				break;
			default: 
				testoutput = <div>FAILED TO LOAD PAGE</div>
		}
	}
	
	//document.getElementById('menu-option-1').addEventListener('click',function(){ModifyOutput('menu-option-1');});
	
	return (
      testoutput
    );
  }
}

export default About;