;
(function($) {

    $.fn.leanSlider = function(option) {

        return this.each(function() {


            var defaults = {
                startSlide: 0,
                pasueTime: 4000,
                pauseOnHover: true,
                directionNav: '',
                controlNav: '',
                prevText: 'Prev',
                nextText: 'Next'
            }


            var setting = $.extend({}, defaults, option);

            var slider = $(this);
            var slides = slider.children();
            var currentSlide = 0,
                timer = 0;


            slider.addClass('SliderContainer');
            slides.addClass('SlideElement');

            currentSlide = setting.startSlide;

            if (setting.startSlide < 0 || setting.startSlide >= slides.lenght)
                currentSlide = 0;

            $(slides[currentSlide]).addClass('current');


            if (setting.directionNav && $(setting.directionNav).length) {

                var preNav = $('<a href="#" class="lean-slider-prev">' + setting.prevText + '</a>'),
                    nextNav = $('<a href="#" class="lean-slider-prev">' + setting.nextText + '</a>');

                preNav.on('click', function(e) {
                    e.preventDefault();
                    next();
                })
                nextNav.on('click', function(e) {
                    e.preventDefault();
                    prev();
                })

                $(setting.directionNav).append(preNav);
                $(setting.directionNav).append(nextNav);

            }


            if(setting.pauseOnHover){
            	slider.hover(function(){

            		clearTimeout(timer)

            	},function(){

            		doTimer();

            	})
            }




            var doTimer = function(){
            	if(setting.pasueTime && setting.pasueTime > 0){
            		clearTimeout(timer);
            		timer = setTimeout(function(){
            			next();
            		},setting.pasueTime);
            	}
            }

            doTimer();


            var next = function(){
            	currentSlide++;
            	if(currentSlide >= slides.length ){
            		currentSlide = 0;
            	}
            	slides.removeClass('current');
            	$(slides[currentSlide]).addClass('current');
            	doTimer();
            }

            var prev = function(){
            	currentSlide--;
            	if(currentSlide < 1)
            	{
            		currentSlide = slides.length - 1;
            	}

            	slides.removeClass('current');
            	$(slides[currentSlide]).addClass('current');
            	doTimer();


            }





        });
    }



})(jQuery)