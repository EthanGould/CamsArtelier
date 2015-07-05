var module = {};
var _el = {};
var bioOffset = -0.2 * ($(window).height());
module.parallax = function() {
	var currentScrollTop = parseFloat( _el.$bioImage.css('top') );
	var scrollSpeed = ( -(bioOffset + window.pageYOffset/0.3) );
	console.log(scrollSpeed);
	var newTop = scrollSpeed + 'px'	
	console.log(newTop);
	_el.$bioImage.css('top', newTop );

};

module.toggleMenu = function() {
	_el.$navList.slideToggle(500);
};

module.eventHandlers = function() {
	_el.$hamburger.on('click', module.toggleMenu);
	// $(window).scroll(module.parallax);
};

module.init = function() {
	_el.$navList = $('.nav-list');
	_el.$hamburger = $('.nav-hamburger');
	_el.$bioImage = $('.biography-image-wrap');

	module.eventHandlers();
};

$(document).ready(function(){
	module.init();
});