'use strict';

var Advert = {

	timeline: new TimelineLite({
		delay: 0,
		onComplete: function(){}
	}),
	clickId: 0,
	ft: undefined,

	init: function(ft) 
	{
		this.ft = ft;
		this.setClickTag();
		this.setAnim();
	},

	setAnim: function()
	{
		var _this = this;

		_this.timeline.set("#bannerContainer", {display: "block"});
		_this.timeline.set("#section1", {display: "block", x:-20});
		_this.timeline.to("#section1", 0.5, {left:"-300px",rotation:45, ease: Quint.easeIn}, "+=2.5");
		_this.timeline.set("#section1", {display: "none"});
		_this.timeline.set("#section2", {display: "block"});
		_this.timeline.from("#section2", 0.25, {opacity: 0});
		_this.timeline.to("#section2", 0.25, {opacity: 0}, "+=3");
		_this.timeline.set("#section2", {display: "none"});
		_this.timeline.set("#section3", {display: "block",y:-6});
		_this.timeline.from("#section3", 0.25, {opacity: 0});
		_this.timeline.to("#section3", 0.25, {opacity: 0}, "+=3");
		_this.timeline.set("#section3", {display: "none"});
		_this.timeline.set("#section4", {display: "block"});
		_this.timeline.from("#section4", 0.25, {opacity: 0});
		_this.timeline.from("#tagSlide", 0.9, {bottom:"-200px",rotation:40, ease: Quint.easeOut}, "-=0.5");
		_this.timeline.set("#ctaContainer", {display: "block"});
		_this.timeline.from("#ctaContainer", 0.25, {opacity: 0},"+=0.1");

		_this.timeline.add(function() {
			_this.bubbleBounce(_this);
		});
	},

	

	setClickTag: function(id)
	{
		var _this = this;

		document.getElementById("clickTag").addEventListener("click", function() {
			_this.ft.clickTag(_this.clickId + 1);
		});
	},

	bubbleBounce: function(root) { 

		var _this	= root;

		var bubble = document.querySelector(".bubble");
		var bubbleG = document.querySelector(".bubble_graphic");
		var bubblesHolder = document.querySelector(".bubbles");
		var cta 	= document.getElementById("ctaButton");
		var cta_x	= parseFloat( document.getElementById("ctaContainer").offsetLeft - 20 );
		var cta_y   = parseFloat( document.getElementById("ctaContainer").offsetTop );
		var littleBubble = document.querySelector(".mini_bubble").cloneNode(true);
		var mouseChaser = document.querySelector(".mini_bubble").cloneNode(true);

		TweenLite.set("#o2_bubbles", {display: "block"});
		
		document.querySelector(".mini_bubble").parentNode.removeChild( document.querySelector(".mini_bubble") );
		
		var bubbleX = 0;
		var bubbleY = 0;
		TweenLite.to( bubble, 1.2, { x: cta_x + cta.offsetWidth, scaleX: 0.2, scaleY: 0.2, ease: Linear.easeNone, force3D: true, onUpdate: function() { 
			bubbleX = this.target._gsTransform.x.toFixed(2);
		}});
		TweenLite.to( bubble, 1, { y: cta_y, ease: Quad.easeOut, overwrite: false, force3D: true, onUpdate: function() { 
			bubbleY = this.target._gsTransform.y.toFixed(2);
		}});
		TweenLite.to( bubble, .2, { delay: 1, y: cta_y, ease: Quad.easeIn, overwrite: false } );
		TweenLite.to( bubbleG, 1, { x: root.width, ease:Quad.easeOut, overwrite: false } );
		TweenLite.to( bubble, .3, { delay: 1.2, x: -30, y: -30, ease: Linear.easeNone, overwrite:false, force3D: true} );

		TweenLite.delayedCall( 1.2, function() { 

			TweenLite.to( cta, .1, { top: "+=10" });
			TweenLite.to( cta, .4, { delay: .2, top:"-=10", overwrite: false, ease: Power1.easeOut, force3D:true });
			TweenLite.set(bubblesHolder , { x : cta_x + cta.offsetWidth });

			var _maxBlobs = 55;
			var scale, del, speed;
			
			for (var i = 0; i < _maxBlobs; i++) {

				scale = _this.getRandom( 1, 20 ) / 100;

				littleBubble = littleBubble.cloneNode(true);
				bubblesHolder.appendChild(littleBubble);

				littleBubble.name  	= "blob" + i.toString();
				TweenLite.set( littleBubble , { alpha: 0, y: cta_y , x: _this.getRandom( -10, 10) , scaleY: scale, scaleX: scale } );

				del   = ( i / 50 );
				speed = _this.getRandom( 1 , 6 );

				TweenLite.to( littleBubble, speed, { delay: del, y: "-=500" , ease: Linear.easeNone , overwrite: false, onComplete: function(bubble) { 
					
					bubble.parentNode.removeChild( bubble );

				}, onCompleteParams: [ littleBubble ], onStart: function( bubble ) {

					TweenLite.set( bubble, { alpha: 1});

				}, onStartParams: [ littleBubble ] });
				
			}
			
		});

		TweenLite.delayedCall(2 , function() { 

			var scalability = 0.05;
			var moveX = 0;
			var moveY = 0;
			var scale = 0;

			document.querySelector(".bubbles_container").appendChild( mouseChaser );

			mouseChaser.style.opacity = 0;

			document.onmousemove = function( event ) {
			 
			  moveX = event.pageX;
			  moveY = event.pageY;
			  scale = ( 90 - event.pageY ) * scalability;
			  if( scale > 1.6 ) scale = 1.6;

			  TweenLite.to( mouseChaser , 1, { ease: Power1.easeOut, overwrite: false, left: moveX, top: moveY , scaleX: scale, scaleY: scale, force3D: true });

			  if( mouseChaser.style.opacity == 0 ) mouseChaser.style.opacity = 1;

			};

		});

	},

	getRandom: function(min, max) {
		return min + Math.random() * (max - min);
	}
};

