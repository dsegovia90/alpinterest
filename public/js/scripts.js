$( window ).on('load', function() {
  $('#nav-toggle').click(function(){
  	$('.nav-mobile').toggleClass('is-active');
  });

  function checkImg(img) {
      if (img.naturalHeight <= 1 && img.naturalWidth <= 1) {
          // undersize image here
          img.src = "https://img.memesuper.com/935d0be9e7a62763df149b6e9de15c1d_funny-on-pinterest-julio-funny-broken-leg-memes_250-355.jpeg";
      }
  }

  $("img").each(function() {
		// if image already loaded, we can check it's height now
		if (this.complete) {
			checkImg(this);
		} else {
			// if not loaded yet, then set load and error handlers
			$(this).load(function() {
				checkImg(this);
			}).error(function() {
				// img did not load correctly
				// set new .src here
				this.src = "https://img.memesuper.com/935d0be9e7a62763df149b6e9de15c1d_funny-on-pinterest-julio-funny-broken-leg-memes_250-355.jpeg";

			});
		}
  });

  setTimeout(function(){
  	$('.grid').masonry('layout');
  }, 250)


});