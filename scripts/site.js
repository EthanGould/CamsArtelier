var module = {},
	gallery= {},
	_el = {};
// var bioOffset = -0.2 * ($(window).height());
// module.parallax = function() {
// 	var currentScrollTop = parseFloat( _el.$bioImage.css('top') );
// 	var scrollSpeed = ( -(bioOffset + window.pageYOffset/0.3) );
// 	console.log(scrollSpeed);
// 	var newTop = scrollSpeed + 'px'	
// 	console.log(newTop);
// 	_el.$bioImage.css('top', newTop );

// };

module.testimonials = [{
	'author': 'Brandon Bowers',
	'content': 'The dip net painting by Cam reminds me of the good times I had with my father evertime I look at it.'
},
{
	'author': 'Barrack Obama',
	'content': 'The quality is presidential, the vibe is top notch!'
},
{
	'author': 'Ethan Gould',
	'content': "Cam's art style is unique, the color choice is awesome!"

}];

module.imagez = [{
	name: 'angry-man',
	path: '../images/angry-man.jpg',
	positionMobile: '0 -100px',
	positionDektop: '0 -400px'
},
{
	name: 'bear',
	path: '../images/bear.jpg',
	positionMobile: '0px 25px',
	positionDektop: '0px -200px'
},{
	name: 'joker',
	path: '../images/joker.jpg',
	positionMobile: '0 25px',
	positionDektop: '0 -75px'
},{
	name: 'salmon',
	path: '../images/silver-salmon.jpg',
	positionMobile: '0 -100px',
	positionDektop: '0 -250px'
},{
	name: 'mountain',
	path: '../images/mountain-landscape.jpg',
	positionMobile: '0 -100px',
	positionDektop: '0 -250px'
},{
	name: 'old-man',
	path: '../images/old-man.jpg',
	positionMobile: '0 -100px',
	positionDektop: '0 -250px'
}];

module.testimonialCount = 0;
module.galleryCount = 0;

module.cycleTestimonials = function(testimonials) {
	var testimonial = testimonials[module.testimonialCount]

	_el.$testimonialContent.empty().fadeIn(800).delay(4000).fadeOut(800);
	_el.$testimonialAuthor.empty().fadeIn(800).delay(4000).fadeOut(800);

	_el.$testimonialContent.text('"' + testimonial.content + '"');
	_el.$testimonialAuthor.text('- ' + testimonial.author);

	module.testimonialCount++;
	if( module.testimonialCount >= 3 ) {
		module.testimonialCount = 0;
	}
};

module.enlargeImage = function(selectedImage) {
	console.log()
	var position,
		key = $(selectedImage).find('img').attr('id'),
		image = $.grep(module.imagez, function(img) { return img.name == key; });

	clearInterval( module.galleryIntervalID );
	clearTimeout(resetGallery);	
	if ( $(window).width() > 768 ) { position = image[0].positionDektop; }
	else { position = image[0].positionMobile; }

	_el.$galleryImageContainer.css({
		'background-image': 'url("' + image[0].path + '")',
		'background-position': position
	});

	var resetGallery = setTimeout(function() {
		module.galleryIntervalID = window.setInterval(module.cycleGallery, 5000, module.imagez);
	}, 10000);
};

module.cycleGallery = function(images) {
	var image = images[module.galleryCount],
		position;

	if ( $(window).width() > 768 ) {
		position = image.positionDektop;
	} else {
		position = image.positionMobile;
	}

	_el.$galleryImageContainer.hide().fadeIn(800).css({
		'background-image': 'url("' + image.path + '")',
		'background-position': position
	});

	module.galleryCount++;

	if( module.galleryCount >= module.imagez.length ) {
		module.galleryCount = 0;
	}
};

gallery.initSlider = function() {
	$.each( _el.$homepageSlideImg, function(i) {
		if ( i < 3 ) {
			img = $(_el.$homepageSlideImg[i])
			img.attr({
				'src': module.imagez[i].path,
				'data-title': module.imagez[i].name
			});
		};
	});
}

gallery.getNext = function(current) {
	for( var i = 0; i < module.imagez.length; i++ ) {
		console.log(module.imagez[i]);
		if ( module.imagez[i].name === current ) {
			return module.images[i];
		}

	}
}

gallery.advance = function() {
	var current = $(_el.$homepageSlide[0]).attr('data-title'),
		nextImg = gallery.getNext(current);
		debugger;
	console.log('next image', nextImg, 'current', current)
}

gallery.reverse = function() {
	return true;
}


module.toggleMenu = function() {
	_el.$navList.slideToggle(500);
};

module.eventHandlers = function() {
	_el.$hamburger.on('click', module.toggleMenu);
	module.cycleTestimonials(module.testimonials);
	_el.$imagePreview.click(function() {
		module.enlargeImage(this);
	})
	// window).scroll(module.parallax);
	module.testimonialIntervalID = window.setInterval(module.cycleTestimonials, 7000, module.testimonials);
	module.galleryIntervalID = window.setInterval(module.cycleGallery, 5000, module.imagez);

	$(_el.$homepageSlide[0]).click(function() {
		gallery.advance();
	});

	_el.$homepageSlide[2].click(function() {
		gallery.reverse();
	});
};

module.init = function() {
	_el.$navList = $('.nav-list');
	_el.$hamburger = $('.nav-hamburger');
	_el.$bioImage = $('.biography-image-wrap');
	_el.$testimonialContainer = $('.testimonials-container');
	_el.$testimonialContent = $('.testimonial-content');
	_el.$testimonialAuthor = $('.testimonial-author');
	_el.$galleryImageContainer = $('.fullwidth-image-container');
	_el.$imagePreview = $('.preview-image-wrap');
	_el.$homepageSlide = $('.gallery-slide-wrap');
	_el.$homepageSlideImg = $('.gallery-slide-img');


	module.eventHandlers();
	gallery.initSlider();
};

$(document).ready(function(){
	module.init();
});