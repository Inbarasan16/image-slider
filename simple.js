;
(function($) {

    $.fn.leanSlider = function(options) {

        return this.each(function() {


            var defaults = {
                startSlide: 0,
                pauseTime: 4000,
                pauseonHover: true,
                directionNav: '',
                controlNav: '',
                prevText: 'prev',
                nextText: 'next',
                height: 'auto',
                fx: 'slide',
                beforeChange:function(){},
                afterChange:function(){},
                controlNavtype:'image'

            }


            var setting = $.extend({}, defaults, options);

            var slider = $(this);
            var slides = slider.children();
            var timer = 0;
            var currentSlide = 0;



            if (slides.length <= 1) {
                console.log('single element can\'t slide');
            }

            if (setting.startSlide > slides.length) {
                currentSlide = 0;

            }
            slider.css('position', 'relative').addClass('slider-container').css('height', setting.height);
            for (var i = 0; i < slides.length; i++) {

                $(slides[i]).css('position', 'absolute').css('z-index', String(slides.length - i)).hide(0);
            }


            $(slides[currentSlide]).show().addClass('current');

            if (setting.directionNav && $(setting.directionNav).length) {

                PrevNav = $('<a href="#" class="slider-prev">' + setting.prevText + '</a>');
                nextNav = $('<a href="#" class="slider-prev">' + setting.nextText + '</a>');

                $(setting.directionNav).append(PrevNav);
                $(setting.directionNav).append(nextNav);

            }

            PrevNav.on('click', function(e) {
                e.preventDefault();
                prev();

            })

            nextNav.on('click', function(e) {
                e.preventDefault();
                next();
            })



            if(setting.controlNav && $(setting.controlNav).length && setting.controlNavtype=='bullet'){

            	slides.each(function(i){

            		var controlNav = $('<a href="#">'+(i+1)+'</a>');

            		controlNav.on('click',function(e){            			 
            			e.preventDefault();
            			showSlide(i);
            		});

            		$(setting.controlNav).append(controlNav);
            	})


            }


            if(setting.controlNav && $(setting.controlNav).length && setting.controlNavtype=='image'){

            	slides.each(function(index,value){

            		 var imageNav1= $(value).find('img');

            		 imageNav=imageNav1.clone();

            		 imageNav.css('width','100px').css('height','100px').css('display','inline-block');

            		 imageNav.on('click',function(e){            			 
            			e.preventDefault();
            			showSlide(index);
            		});

            		$(setting.controlNav).append(imageNav);



            	})
            

            }





            if (setting.pauseonHover && setting.pauseTime > 0) {
                slider.hover(function() {
                    clearTimeout(timer);
                }, function() {
                    doTimer();
                })

            }


            var doTimer = function() {
                if (setting.pauseTime && setting.pauseTime > 0) {
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        next();
                    }, setting.pauseTime)
                }
            }


            var updateControlNav = function(){
            	if(setting.controlNav){
            		$(setting.controlNav).children().removeClass('active');
            		$($(setting.controlNav).children().get(currentSlide)).addClass('active');
            	}
            }


            var next = function() {

                if (setting.fx == 'fade') {
                    $(slides[currentSlide]).fadeOut('slow').removeClass('current');
                }

                if (setting.fx == 'slide') {
                    $(slides[currentSlide]).slideUp('slow').removeClass('current');
                }

                currentSlide++;
                if (currentSlide >= slides.length) {
                    currentSlide = 0;
                }

                if (setting.fx == 'fade') {
                    $(slides[currentSlide]).fadeIn('slow').addClass('current');
                }

                if (setting.fx == 'slide') {
                    $(slides[currentSlide]).slideDown('slow').addClass('current');
                }

                doTimer();
                updateControlNav();


                setting.afterChange.call(this);

            }



            var prev = function() {

                if (setting.fx == 'fade') {
                    $(slides[currentSlide]).fadeOut('slow').removeClass('current');
                }

                if (setting.fx == 'slide') {
                    $(slides[currentSlide]).slideUp('slow').removeClass('current');
                }

                currentSlide--;

                if (currentSlide < 0) {
                    currentSlide = slides.length - 1;
                }

                if (setting.fx == 'fade') {
                    $(slides[currentSlide]).fadeIn('slow').addClass('current');
                }

                if (setting.fx == 'slide') {
                    $(slides[currentSlide]).slideDown('slow').addClass('current');
                }


                doTimer();
                updateControlNav();

            }


            var showSlide=function(index){


            	

            	if (setting.fx == 'fade') {
                    $(slides[currentSlide]).fadeOut('slow').removeClass('current');
                }
                if (setting.fx == 'slide') {
                    $(slides[currentSlide]).slideUp('slow').removeClass('current');
                }



                currentSlide = index;

                if(currentSlide < 0 )
                	currentSlide = slides.length -1;
                if(currentSlide >= slides.length)
                	currentSlide = 0;


                 if (setting.fx == 'fade') {
                    $(slides[currentSlide]).fadeIn('slow').addClass('current');
                }

                if (setting.fx == 'slide') {
                    $(slides[currentSlide]).slideDown('slow').addClass('current');
                }


                doTimer();
                updateControlNav();



            }



            doTimer();
            updateControlNav();







        });

    }

})(jQuery)