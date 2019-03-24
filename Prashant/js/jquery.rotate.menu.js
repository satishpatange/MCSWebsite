
(function($) {

	$.fn.rMenu = function(options) {

		var $el			= this,
			defaults	= {
				menuSize				: 300,
				menuRotateDuration		: 500,

				linkColor				: '#333',
				linkSize				: 16,
				linkPadding				: 20,

				border					: true,
				borderColor				: '#999',
				borderSize				: 2,

				image					: true,
				imageSize				: 240,
				imageBorderSize			: 2,
				imageBorderColor		: '#999',
				imageBgColor			: '#ddd',
				imageOverlayBgColor		: '#ddd',
				imageOverlayDuration	: 100,

				contentWrapper			: '',
				contentType				: 'tabs',
				contentAjaxLoader		: 'ajax/index.php',

				onBeforeLoad			: function() {},
				onAfterLoad				: function() {},
				onMenuClick				: function() {},
				onAjaxLoaded			: function() {},
			},
			options			= $.extend( {}, defaults, options),
			// links
			linkCount		= 0,
			linkMaxWidth	= 0,
			linkActive,
			// imagebox
			$imageBox,
			//content
			$content, $loading;


		/* support multiple elements */
		if(this.length > 1) {

			this.each(function() {
				$(this).rMenu(options)
			});
			return this;

		}


		/* initalize elements */
		this.init = function() {

			/* beforeLoad function */
			options.onBeforeLoad();

			/* rotate menu */
			if( !$el.hasClass('hb-rotate-menu') )
				$el.attr('class', 'hb-rotate-menu');

			$el.css({
				width		: options.menuSize,
				height		: options.menuSize,
				transition	: ( options.menuRotateDuration / 1000 ) + 's'
			})

			/* rotate menu wrapper */
			if( !$el.parent().hasClass('hb-rotate-menu-wrapper') )
				$el.wrap('<div class="hb-rotate-menu-wrapper"></div>');

			$el.parent('.hb-rotate-menu-wrapper').css({
				width		: options.menuSize,
				height		: options.menuSize,
			})

			/* links */
			linkCount			= $el.children('a').length;
			var linkAngle		= 360 / linkCount,
				linkAngleNth	= 0,
				linkWidth		= 0,
				linkDegree		= 0,

				divHeight		= options.menuSize / 2,
				divPaddingTop	= divHeight - options.linkSize;

			$el.children('a').each(function() {

				$(this).wrap('<div class="hb-link"></div>');

				var $div		= $(this).parent('.hb-link'),
					$a 			= $(this);

				$a.attr('href', 'javascript:;');
				$a.attr('data-order', linkAngleNth);
				$a.css({
					height		: options.linkSize,
					lineHeight	: options.linkSize + 'px',
					color		: options.linkColor,
					fontSize	: options.linkSize
				});

				if( $el.find('a.active').length == 0 )
					$a.addClass('active');

				linkWidth		= $a.width();
				linkDegree		= linkAngle * linkAngleNth * (-1);

				if( linkWidth > linkMaxWidth )
					linkMaxWidth = linkWidth;
				
				$div.css({
					width		: linkWidth,
					height		: divHeight,
					marginLeft	: (-1) * linkWidth / 2,
					paddingTop	: divPaddingTop,
					transform	: 'rotate(' + linkDegree + 'deg)',
				});
				
				$div.children("a").css("transform", "rotate(" + linkAngle * linkAngleNth + "deg)"),
				linkAngleNth++;

			});

			linkMaxWidth += options.linkPadding * 2;

			/* svg border */
			if( options.border ) {
				this.initializeBorder();
			}

			/* image box */
			if( options.image ) {
				this.initializeImageBox();
			}


			if( options.contentType == 'ajax' ) {

				this.initializeAjax();
				this.toggleAjax($el.find('a').first().attr('data-ajax'));

			}else{

				this.initializeTabs();

			}

			/* link click function */
			$el.on('click', 'a:not(.active)', function() {

				var $a			= $(this),
					nth			= $a.attr('data-order'),
					newAngle	= nth * linkAngle;

					linkActive = nth;

				// menu rotate
				$el.css('transform', 'rotate(' + newAngle + 'deg)');

				// activate a
				$el.find('a.active').removeClass('active');
				$a.addClass('active');

				// image change
				if( options.image ) {
					$el.toggleImage($a);
				}

				if( options.contentType == 'ajax' ) {
					$el.toggleAjax($a.attr('data-ajax'));
				}else{
					$el.toggleTabs(nth);
				}

				/* menuClick function */
				options.onMenuClick();

			});

			/* afterLoad function */
			options.onAfterLoad();

			return this;

		}


		/* Inıtalize Svg Border */
		this.initializeBorder = function() {

			$el.append('<svg><circle></circle></svg>');

			var pi						= Math.PI,
				svg						= $el.find('svg'),
				svgSize					= options.menuSize,

				circle					= svg.find('circle'),
				circleSize				= svgSize / 2,
				circleRadius			= circleSize - options.borderSize,
				circlePerimeter			= parseInt(2 * pi * circleRadius) + 1,
				circleSlicePerimeter	= parseInt(circlePerimeter / linkCount),
				circleBorderWidth		= ( circleSlicePerimeter - linkMaxWidth ) < 0 ? 0 : circleSlicePerimeter - linkMaxWidth,
				circleDashArray			= '0,' + (linkMaxWidth/2) + ',' + circleBorderWidth + ',' + (linkMaxWidth/2);

			svg.attr('width', svgSize).attr('height', svgSize);
			svg.css({
				marginTop: (-1) * circleSize,
				marginLeft: (-1) * circleSize
			})

			circle.attr('cx', circleSize)
				.attr('cy', circleSize)
				.attr('r', circleRadius)
				.attr('stroke', options.borderColor)
				.attr('stroke-width', options.borderSize)
				.attr('fill', 'none')
				.attr('stroke-dasharray', circleDashArray);

		}


		/* Inıtalize Image Box */
		this.initializeImageBox = function($a) {

			$el.after('<a class="hb-image"><span class="hb-image-arrow"></span><span class="hb-image-overlay"></span></a>');

			var $a			= $el.find('a').first();
				$imageBox	= $el.next('.hb-image');

			$imageBox.css({
				width			: options.imageSize,
				height			: options.imageSize,
				marginTop		: (-1) * options.imageSize / 2,
				marginLeft		: (-1) * options.imageSize / 2,
				borderColor		: options.imageBorderColor,
				borderWidth		: options.imageBorderSize,
				backgroundColor	: options.imageBgColor,
			});

			if( $a.attr('data-image') ) {
				$imageBox.css({
					backgroundImage	: 'url("' + $a.attr('data-image') + '")',
				});
			}

			if( $a.attr('data-image-class') ) {
				$imageBox.addClass($a.attr('data-image-class'));
			}

			if( $a.attr('data-image-href') ) {

				$imageBox.attr('href', $a.attr('data-image-href'));
				$imageBox.css({
					cursor	: 'pointer'
				});

			}else{

				$imageBox.attr('href', 'javascript:;');
				$imageBox.css({
					cursor	: 'default'
				});

			}

			$imageBox.children('.hb-image-arrow').css({
				bottom			: ( options.imageBorderSize + $imageBox.children('.hb-image-arrow').outerHeight() ) * (-1),
				borderTopColor	: options.imageBorderColor
			})

			$imageBox.children('.hb-image-overlay').css({
				backgroundColor	: options.imageOverlayBgColor,
				opacity			: 0
			})

		}


		/* Inıtıalize Tabs */
		this.initializeTabs = function() {

			if( options.contentWrapper == '' ) {
				$content = $el.parent('.hb-rotate-menu-wrapper').next('div');
			}else{
				$content = $(options.contentWrapper);
			}

			$content.addClass('hb-rotate-content');

			$content.children('div').each(function() {

				var $tab = $(this);

				$tab.wrap('<div></div>')
				$tab.parent('div').addClass('hb-tab');
				$tab.addClass('hb-tab-content');

				if( $content.find('.hb-tab.hb-tab-expanded').length == 0 )
					$tab.parent('div').addClass('hb-tab-expanded');

			});

		}


		/* Inıtıalize Ajax */
		this.initializeAjax = function() {

			if( options.contentWrapper == '' ) {
				$content = $el.parent('.hb-rotate-menu-wrapper').next('div');
			}else{
				$content = $(options.contentWrapper);
			}

			$content.addClass('hb-rotate-content');

			$content.wrap('<div class="hb-rotate-content-wrapper"></div>');
			$content.parent('.hb-rotate-content-wrapper').append('<div class="hb-loading"></div>');

			$loading = $content.parent('.hb-rotate-content-wrapper').find('.hb-loading');

		}


		/* Toggle Image Box */
		this.toggleImage = function($a) {

			$imageBox.children('.hb-image-overlay').animate({
				opacity: 1
			}, {
				duration	: options.imageOverlayDuration,
				complete	: function() {

					$imageBox.css({
						backgroundImage	: 'url("' + $a.attr('data-image') + '")'
					});

					$imageBox.attr('class', 'hb-image');
					if( $a.attr('data-image-class') )
						$imageBox.addClass($a.attr('data-image-class'));

					if( $a.attr('data-image-href') ) {

						$imageBox.attr('href', $a.attr('data-image-href'));
						$imageBox.css({
							cursor	: 'pointer'
						});

					}else{

						$imageBox.removeAttr('href');
						$imageBox.css({
							cursor	: 'default'
						});

					}

					$imageBox.children('.hb-image-overlay').animate({
						opacity: 0
					}, options.imageOverlayDuration)
				}
			});
		}


		/* Toggle Tabs */
		this.toggleTabs = function(nth) {

			nth++;

			var $tab 	= $content.children('.hb-tab.hb-tab-expanded'),
				$newTab = $content.children('.hb-tab:nth-child(' + nth + ')');

			if( $newTab.length != 0 ) {

				$tab.animate({
					height: 0
				}, {
					duration	: options.menuRotateDuration / 2,
					complete	: function() {
						$tab.removeClass('hb-tab-expanded');
						$newTab.animate({
							height: $newTab.children('.hb-tab-content').outerHeight()
						}, {
							duration	: options.menuRotateDuration / 2,
							complete	: function() {
								$newTab.addClass('hb-tab-expanded');
							}
						});
					}
				});

			}

		}


		/* Toggle Ajax */
		this.toggleAjax = function(ajaxData) {

			$.ajax({
				url			: options.contentAjaxLoader,
				type		: "POST",
				async		: false,
				data		: {
					postData	: ajaxData
				},

				beforeSend	: function() {
					$loading.addClass('hb-loading-visible');
					$content.html('');
				},

				success		: function(result) {
					setTimeout(function() {
						$content.html(result);
					}, options.menuRotateDuration);
				},

				error		: function() {
					$content.html('<div class="hb-error">404!</div>');
				},

				complete	: function() {
					setTimeout(function() {
						$loading.removeClass('hb-loading-visible');
						options.onAjaxLoaded();
					}, options.menuRotateDuration);
				}
			});

		}


		return this.init();

	}

}( jQuery ));