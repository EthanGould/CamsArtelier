$(document).ready(function() {
	$('.site-header__logo').click( function(){
		if ( $(document).width() > 768 ) {
			return;
		}

		if ( $(this).hasClass('open') ) {
			$(this).animate({
				marginRight: '0',
				marginLeft: '80%'
			}, 150);
		} else {
			$(this).animate({
				marginLeft: '0',
				marginRight: 'calc(100% - 50px)'
			}, 150);
		}

		$( this ).toggleClass('open');
	
		$('.nav-item-container').slideToggle('fast');
		$('.nav-item-container').css('width', '0');
		$('.nav-item-container').animate({
			width: '100%'
		}, 150);

	});
});

// var module = {};
// var _el = {};

// module.init = function() {
// 	_el.logo = $('.site-header__logo');

// 	module.eventHandlers();
// 	module.startGallery();
// };

// module.eventHandlers = function() {
// 	$('.site-header__logo').click( module.openHamburgerNav );
// };

// module.openHamburgerNav = function() {
// 	if ( _el.logo.hasClass('open') ) {
// 		_el.logo.animate({
// 			marginRight: '0',
// 			marginLeft: '80%'
// 		}, 150);
// 		_el.logo.removeClass('open');
// 	} else {
// 		_el.logo.animate({
// 			marginLeft: '0',
// 			marginRight: 'calc(100% - 50px)'
// 		}, 150);
// 		_el.logo.addClass('open');
// 	}
// };

// module.startGallery = function() {
// 	var slideCount = $('.fullwidth-gallery__slide').length,
// 		slideWidth = $( $('.fullwidth-gallery__slide')[0]).width(),
// 		scrollDistance = slideCount * slideWidth + 'px';

// 	_el.galleryViewport.animate({
// 		scrollLeft: scrollDistance
// 	}, 45000, module.resetGallery );
// };

// module.resetGallery = function() {
// 	_el.galleryViewport.animate({
// 		scrollLeft: 0
// 	}, 2000, module.startGallery );
// };

// $(document).ready(function() {
// 	module.init();
// });

