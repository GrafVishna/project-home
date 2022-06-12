
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

$(document).ready(function () {
	$('.burger').click(function (event) {
		$('.burger, .header__menu-links').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

$(".scrollto a").on("click", function () {
	let href = $(this).attr("href");

	$("html, body").animate({
		scrollTop: $(href).offset().top
	}, {
		duration: 370,   // по умолчанию «400»
		easing: "linear" // по умолчанию «swing»
	});

	return false;
});