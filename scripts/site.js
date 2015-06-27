var module = {};
var _el = {};



module.toggleMenu = function() {
	_el.$navList.slideToggle(500);
};

module.eventHandlers = function() {
	_el.$hamburger.on('click', module.toggleMenu);
};

module.init = function() {
	_el.$navList = $('.nav-list');
	_el.$hamburger = $('.nav-hamburger');

	module.eventHandlers();
};

$(document).ready(function(){
	module.init();
});