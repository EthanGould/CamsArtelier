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

module.testimonials = [{
	'author': 'Brandon Bowers',
	'content': 'The dip net painting you gave me reminds me of the good times I had with my father evertime I look at it.'


},
{
	'author': 'Barrack Obama',
	'content': 'The quality is presidential, the vibe is top notch!'
},
{
	'author': 'Ethan Gould',
	'content': "Cam's art style is unique, the color choice is awesome!"

}];

module.count = 0;

module.cycleTestimonials = function(testimonials) {
	var testimonial = testimonials[module.count]

	_el.$testimonialContainer.hide().fadeIn(800).delay(3000).fadeOut(800);
	_el.$testimonialContent.text('"' + testimonial.content + '"');
	_el.$testimonialAuthor.text('- ' + testimonial.author);

	module.count++;
	if( module.count >= 3 ) {
		module.count = 0;
	}
};

module.toggleMenu = function() {
	_el.$navList.slideToggle(500);
};

module.eventHandlers = function() {
	_el.$hamburger.on('click', module.toggleMenu);
	module.cycleTestimonials(module.testimonials);
	// window).scroll(module.parallax);
	var intervalID = window.setInterval(module.cycleTestimonials, 5000, module.testimonials);
};

module.init = function() {
	_el.$navList = $('.nav-list');
	_el.$hamburger = $('.nav-hamburger');
	_el.$bioImage = $('.biography-image-wrap');
	_el.$testimonialContainer = $('.testimonials-container');
	_el.$testimonialContent = $('.testimonial-content');
	_el.$testimonialAuthor = $('.testimonial-author');

	module.eventHandlers();
};

$(document).ready(function(){
	module.init();
});