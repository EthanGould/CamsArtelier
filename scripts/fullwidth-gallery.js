var module = {};
var _el = {};

module.init = function() {
	_el.gallery = $('.fullwidth-gallery');
	_el.galleryViewport = $('.fullwidth-gallery__view');

	// module.eventHandlers();
	module.startGallery();
};

module.startGallery = function() {
	var slideCount = $('.fullwidth-gallery__slide').length,
		slideWidth = $( $('.fullwidth-gallery__slide')[0]).width(),
		scrollDistance = slideCount * slideWidth + 'px';

	_el.galleryViewport.animate({
		scrollLeft: scrollDistance
	}, 45000, module.resetGallery );
};

module.resetGallery = function() {
	_el.galleryViewport.animate({
		scrollLeft: 0
	}, 2000, module.startGallery );
};

$(document).ready(function() {
	module.init();
});
