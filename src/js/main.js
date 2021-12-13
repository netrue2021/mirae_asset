$(function() {
    $('.slide-list').slick({
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    $(window).scroll(function() {
        $('.header-area').css({left: 0 - $(this).scrollLeft()});
    });


    $('#btn_top').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
	});

	var currentPosition = parseInt($("#btn_top").css("top"));
	$(window).on('scroll', function () {
		var posY = $(window).scrollTop();
		// $("#btn_top").stop().animate({"top":posY+currentPosition-55+"px"},500);
		if ( posY > 100 ){
			$("#btn_top").css('opacity','1');
		} else if(posY < 100) {
			$("#btn_top").css('opacity','0');
		};
	});
});
