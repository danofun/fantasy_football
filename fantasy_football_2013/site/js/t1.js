var isJustLoaded = false;
$(function() {
	isJustLoaded = true;
    $('#multi_t1_slideshow').cycle({
		fx:           'fade', // name of transition effect (or comma separated names) 			
		height:        360, // container height 
		timeout:       8000,  // milliseconds between slide transitions (0 to disable auto advance) 
		speed:         800,  // speed of the transition (any valid fx speed value)
	    startingSlide: 0,     // zero-based index of the first slide to be displayed 
	    sync:          1,     // true if in/out transitions should occur simultaneously 
	    random:        1,     // true for random, false for sequence (not applicable to shuffle fx) 
	    fit:           0,     // force slides to fit container 
	    containerResize: 1,   // resize container to fit largest slide 
		pager:        '#selector',  // selector for element to use as pager container 
	    pagerClick:    null,  // callback fn for pager clicks:  function(zeroBasedSlideIndex, slideElement) 
	    pagerEvent:   'click', // name of event which drives the pager navigation 
		fastOnEvent:   1000,     // force fast transitions when triggered manually (via pager or prev/next); value == time in ms 
		cleartype:     !$.support.opacity,  // true if clearType corrections should be applied (for IE) 
	    cleartypeNoBg: false, // set to true to disable extra cleartype fixing (leave false to force background color setting on slides) 
		requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded 
	    requeueTimeout: 250,   // ms delay for requeue 
		continuous:    0,     // true to start next transition immediately after current one completes 
		before:        onBefore,  // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag) 
		after:		   onAfter
    });
	function onBefore() {
		$.slideId = $(this).attr('id');
		if(isJustLoaded){
			if($.browser.msie){
				$('.multi_t1_desc').css({'display':'block'});
				$('.multi_t1_bullets').css({'display':'block'});
				$('#multi_t1_buttons').css({'display':'block'});
				}
			else{
				$('.multi_t1_desc').fadeIn('slow');
				$('.multi_t1_bullets').fadeIn('slow');
				$('#multi_t1_buttons').fadeIn('slow');
				}	
		}
		else{
			$('.multi_t1_photoCredit').css({'display':'none'}); //ie fix
		}
	}; 
	function onAfter(curr,next,opts) {
		if($.browser.msie){
			$('.multi_t1_desc').css({'display':'block'});
			$('.multi_t1_bullets').css({'display':'block'});
			$('#multi_t1_buttons').css({'display':'block'});
			}
		else{
			$('.multi_t1_desc').fadeIn('slow');
			$('.multi_t1_bullets').fadeIn('slow');
			$('#multi_t1_buttons').fadeIn('slow');
			}	
			$('.multi_t1_photoCredit').css({'display':'block'}); //ie fix
		isJustLoaded = false;
	}; 
});

function RMEloadT1(){
	//alert('T1');
	if (($('#T1Rme').length) && (!($.browser.safari))) {
    	swfobject.removeSWF("T1Rme");
 	}
	$('#RmeWrapper').css({'display':'none','z-index':'0','opacity':'0'});
	$('#multi_t1_video_wrap').css({'display':'none'});
	$('.multi_t1_slides').fadeIn('slow');
	//$('.multi_t1_slides').fadeTo("fast",1);
	//$('.multi_t1_slides').css({'display':'block'});
	$('#selector').css({'display':'block'});
	$("#multi_t1_buttons").fadeIn('slow');
	$('.multi_t1_desc').fadeIn('slow');
	$('.multi_t1_bullets').fadeIn('slow');
	$('#multi_t1_video').css({'display':'none','z-index':'0','opacity':'0'});
	$('#'+$.slideId).css({'display':'block','z-index':'11','opacity':'1'});
	$('#multi_t1_slideshow').cycle('resume'); 
}