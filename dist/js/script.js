
var header = $('.js-header-fixed');
cloneHeader = header.clone();


cloneHeader.addClass('header--fixed');
header.before(cloneHeader);


$(window).scroll(function () {

	console.log($(window).scrollTop());

	if ($(window).scrollTop() > 350) {
		cloneHeader.addClass('header--is-show');
	} else {
		cloneHeader.removeClass('header--is-show');
	}

});