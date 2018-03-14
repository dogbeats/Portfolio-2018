import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './Navbar';
import Content from './Content';
import About from './About';
import PA from './PA';
import Contact from './Contact';
import registerServiceWorker from './registerServiceWorker';

var createReactClass = require('create-react-class');

ReactDOM.render(<Menu />, document.getElementById('main-menu-container'));

function testfunction(e)
{
	alert(e.target.className);  
}

function ContainerFadeOut()
{
	document.getElementById('content-container').classList.remove('fadein');
	document.getElementById('content-container').classList.add('fadeout');
}
function ContainerFadeIn()
{
	document.getElementById('content-container').classList.remove('fadeout');
	document.getElementById('content-container').classList.add('fadein');
}

function ContainerChange(tag)
{
	ContainerFadeOut();
	var interval2 = setInterval(function(){ReactDOM.render(tag, document.getElementById('content-container'));clearInterval(interval2);},3000);
	var interval = setInterval(function(){ContainerFadeIn();clearInterval(interval)}, 3000); 	
}

document.getElementById('menu-option-1').addEventListener('click',function(){
		ContainerChange(<PA />);
	});
	
document.getElementById('menu-option-2').addEventListener('click',function(){
		ContainerChange(<Content />);	
	});
	
document.getElementById('menu-option-3').addEventListener('click',function(){
		ContainerChange(<About />);	
	});
	
document.getElementById('menu-option-4').addEventListener('click',function(){
		ContainerChange(<Contact />); 	
	});
	
registerServiceWorker();
