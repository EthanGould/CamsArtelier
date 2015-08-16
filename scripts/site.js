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
	name: 'bear',
	niceName: 'Color Bear',
	path: '../images/bear.jpg',
	positionMobile: '0px 25px',
	positionDektop: '0px -200px'
},{
	name: 'angry-man',
	niceName: 'The Shining',
	path: '../images/angry-man.jpg',
	positionMobile: '0 -100px',
	positionDektop: '0 -400px'
},
{
	name: 'joker',
	niceName: 'The Joker',
	path: '../images/joker.jpg',
	positionMobile: '0 25px',
	positionDektop: '0 -75px'
},{
	name: 'old-man',
	niceName: 'Old Man',
	path: '../images/old-man.jpg',
	positionMobile: '0 -100px',
	positionDektop: '0 -250px'
},{
	name: 'salmon',
	niceName: 'Silver Salmon',
	path: '../images/silver-salmon.jpg',
	positionMobile: '0 -100px',
	positionDektop: '0 -250px'
},{
	name: 'mountain',
	niceName: 'Color Mountain',
	path: '../images/mountain-landscape.jpg',
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

	
	clearTimeout(resetGallery);	
	if ( $(window).width() > 768 ) { position = image[0].positionDektop; }
	else { position = image[0].positionMobile; }

	_el.$galleryImageContainer.css({
		'background-image': 'url("' + image[0].path + '")',
		'background-position': position
	});

	var resetGallery = setTimeout(function() {
		clearInterval( module.galleryIntervalID );
		module.galleryIntervalID = window.setInterval(module.cycleGallery, 5000, module.imagez);
	}, 5000);
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
				'title': module.imagez[i].niceName,
				'data-index': i 
			});
		};
	});
	gallery.updateNav();

}

gallery.imageTemplate = function(img) {
		var template = '<img title="' + img.niceName
					+ '" data-index="' + module.imagez.indexOf( img )
					+ '" src="' + img.path
					+ '" alt="" width="200" class="gallery-slide-img">';
	return template;
}

gallery.getImage = function(index) {
	return module.imagez[index];
}

gallery.updateNav = function() {
	var lImageIndex, rImageIndex, previousImage, nextImageIndex, previousImageIndex,
		$curIndex = $('.gallery-slide-wrap--middle').children('img').data('index');

	// if on last slide:
	// show first item on right and second to last on left
	if ($curIndex === module.imagez.length - 1) {
		rImageIndex = 0;
		lImageIndex = $curIndex - 1;
	// if on first slide:
	// show second on right and last on left;
	} else if ( ($curIndex - 1) < 0 ) {
		rImageIndex = 1 ;
		lImageIndex = module.imagez.indexOf( module.imagez[ module.imagez.length - 1 ] ) - 1;
	// else, proceed as usual
	} else {
		rImageIndex = $curIndex + 1;
		lImageIndex = $curIndex - 1;
	}

	// get index for nav images
	nextImageIndex = gallery.getImage( rImageIndex );
	previousImageIndex = gallery.getImage( lImageIndex );

	// replace old nav images + captions with next up, save nav button
	_el.$homepageSlideLeft.children().not('.gallery-slide-nav').remove();
	_el.$homepageSlideLeft.append( gallery.imageTemplate( previousImageIndex ) );

	_el.$homepageSlideRight.children().not('.gallery-slide-nav').remove();
	_el.$homepageSlideRight.append( gallery.imageTemplate( nextImageIndex ) );

	// update slide progress counter
	_el.$homepageSlideCount.text( ( $curIndex + 1 ) + ' / ' + module.imagez.length ); 
}

gallery.reverse = function(event) {
	var $curIndex = $('.gallery-slide-wrap--middle').children('img').data('index'),
		index = ( ($curIndex - 1) < 0) ? module.imagez.indexOf( module.imagez[ module.imagez.length - 1 ] ) : $curIndex - 1;
		nextImage = gallery.getImage( index );
	
	$('.gallery-slide-wrap--middle').children().remove();
	$('.gallery-slide-wrap--middle').append( $( gallery.imageTemplate( nextImage ) ).fadeIn() );
	$('.gallery-slide-wrap--middle').append(
		$('<div class="gallery-slide-img-name">' + nextImage.niceName + '</div><div class="gallery-slide-img-name-triangle"></div>' ).fadeIn() );
	gallery.updateNav();
};

gallery.advance = function(event) {
	var $curIndex = $('.gallery-slide-wrap--middle').children('img').data('index'),
		index = ( ($curIndex === module.imagez.length - 1) ) ? 0 : $curIndex + 1 ;
		nextImage = gallery.getImage( index );

	$('.gallery-slide-wrap--middle').children().remove();
	$('.gallery-slide-wrap--middle').append( $( gallery.imageTemplate( nextImage ) ).fadeIn() );
	$('.gallery-slide-wrap--middle').append(
		$('<div class="gallery-slide-img-name">' + nextImage.niceName + '</div><div class="gallery-slide-img-name-triangle"></div>' ).fadeIn() );
	gallery.updateNav();
};


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

	$('.gallery-slide-nav--right').click(function(event) {
		gallery.advance(event);
	});

	$('.gallery-slide-nav--left').click(function() {
		gallery.reverse(event);
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
	_el.$homepageSlides = $('.gallery-slide-wrap');
	_el.$homepageSlideLeft = $('#gallery-slide-wrap1');
	_el.$homepageSlideCenter = $('#gallery-slide-wrap2');
	_el.$homepageSlideRight = $('#gallery-slide-wrap3');
	_el.$homepageSlideImg = $('.gallery-slide-img');
	_el.$homepageSlideCount = $('.gallery-slide-count');


	module.eventHandlers();
	gallery.initSlider();
};

$(document).ready(function(){
	module.init();
});