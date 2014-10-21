 !function($){
	var verbatimLogo ='<svg version="1.1" id="verbatimLogo" class="verbatim-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><circle fill="none" stroke="#ffffff" stroke-width="3" stroke-miterlimit="10" cx="25" cy="17.1" r="10.8"/><circle fill="none" stroke="#ffffff" stroke-width="3" stroke-miterlimit="10" cx="25" cy="32.9" r="10.8"/></svg>'
	var twitterLogo ='<svg version="1.1" id="twitterLogo" class="verbatim-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> <path fill="#FFFFFF" d="M45,13.2c-1.4,0.6-2.9,1-4.5,1.2c1.6-1,2.8-2.5,3.4-4.3C42.4,11,40.8,11.7,39,12c-1.4-1.5-3.4-2.5-5.7-2.5c-4.3,0-7.8,3.5-7.8,7.8c0,0.6,0.1,1.2,0.2,1.8c-6.5-0.3-12.2-3.4-16-8.1c-0.7,1.1-1.1,2.5-1.1,3.9c0,2.7,1.4,5.1,3.5,6.5c-1.3,0-2.5-0.4-3.5-1c0,0,0,0.1,0,0.1c0,3.8,2.7,6.9,6.2,7.6c-0.7,0.2-1.3,0.3-2.1,0.3c-0.5,0-1,0-1.5-0.1c1,3.1,3.9,5.3,7.3,5.4c-2.7,2.1-6,3.3-9.7,3.3c-0.6,0-1.2,0-1.9-0.1c3.4,2.2,7.5,3.5,11.9,3.5c14.3,0,22.1-11.9,22.1-22.1c0-0.3,0-0.7,0-1C42.6,16.2,43.9,14.8,45,13.2z"/></svg>';

	var defaults = {
		highlightParent: true,
		searchContainer: 'body',
		addedClass: 'verbatim-found-content',
		highlightedClass: 'highlight',
		highlightColor: '#FFFF00',
		selectedClass: 'verbatim-selected-text',
		buttonClass: 'verbatim-button-container',
		defaultStyling: true,
		animated: true,
		animationSpeed: 2000,
		scrollingOffset: 200
	}

	$.fn.verbatim = function(options){
		var self = this;
		var hash = window.location.hash;
		hash = hash.replace("%C2%A0", "%20");
		var sanitizedHash = decodeURIComponent(hash).substr(1);
		var settings = $.extend({}, defaults, options);
		var withTwitter = false,
			twitterScriptAdded = false;


		var isFirefox = /Firefox/.test(navigator.userAgent);

		$.fn.findHash = function(sanitizedHash, settings){

			var sel = self.getSelected();
	        console.log(sel);

	        sel.collapse(document.body, 0);

	        while (window.find(sanitizedHash)) {

        		if (isFirefox){
					document.body.contentEditable = "true";

					document.execCommand("HiliteColor", false, settings.highlightColor);
			        var anchorNode = sel.focusNode.parentNode;
			      	$(anchorNode).addClass(settings.highlightedClass);
		            sel.collapseToEnd();

			      	document.body.contentEditable = "false";

				} else {
					document.designMode = "on";

		            document.execCommand("HiliteColor", false, settings.highlightColor);
			        var anchorNode = sel.anchorNode.parentNode;
			      	$(anchorNode).addClass(settings.highlightedClass);
		            sel.collapseToEnd();
		            console.log(sel);

		             document.designMode = "off";
		        }

	        }

	        anchorNode = sel.anchorNode.parentNode;
	      	$(anchorNode).addClass(settings.highlightedClass);

			if (settings.animated){
				$(function(){
					$('html, body').animate({scrollTop: 0}, 0);
				});

				$(window).load(function(){
					$('html, body').animate({scrollTop: $('.' + settings.highlightedClass).offset().top - parseInt(settings.scrollingOffset) }, parseInt(settings.animationSpeed) );
				});
			}

			if (settings.highlightParent){
				$('.' + settings.highlightedClass).parent().addClass(settings.highlightedClass);
			}

			if (settings.defaultStyling){
				$('.' + settings.highlightedClass).css({
					"background-color": settings.highlightColor 
				});
			}
		}

		$.fn.getSelected = function(){
			if(window.getSelection)
				return window.getSelection(); 
			else if(document.getSelection)
				return document.getSelection(); 
			else {
				var selection = document.selection && document.selection.createRange();
		        if(selection.text) { 
		        	return selection.text; 
		        }
		        return false;
		    }
	        return false;
		}

		$.fn.insertCopyButton = function(target){
			if ($(target).hasClass(settings.selectedClass)){
				$('.' + settings.buttonClass).remove();
				$('.verbatim-text-area').remove();
			} else {
				$('.' + settings.buttonClass).remove();
				$('.' + settings.selectedClass).contents().unwrap();
				$('.verbatim-text-area').remove();
				

				var buttonContainer = document.createElement("div");
				buttonContainer.setAttribute("class", settings.buttonClass);
				buttonContainer.innerHTML = verbatimLogo + twitterLogo;
				
				var sel = self.getSelected();

				console.log(sel);

				if(!sel.isCollapsed){

					if (isFirefox){
						document.body.contentEditable = "true";

						document.execCommand("HiliteColor", false, "white");
				      	var anchorNode = sel.focusNode.parentNode;
				      	$(anchorNode).addClass(settings.selectedClass).append(buttonContainer);

				      	document.body.contentEditable = "false";

					} else {
						document.designMode = "on";

						document.execCommand("HiliteColor", false, "white");
				      	var anchorNode = sel.anchorNode.parentNode;
				      	$(anchorNode).addClass(settings.selectedClass).append(buttonContainer);

				      	document.designMode = "off";
					}
					
		            selectedText = sel.toString();
		        }
		    }
		}

		$.fn.copyURL = function(){
			$('.verbatim-text-area').remove();

			var textURL = selectedText;
			var longURL = window.location.origin + window.location.pathname + '#' + encodeURIComponent(textURL);
			var twitterURL = window.location.origin + window.location.pathname + '#' + textURL;

			if (withTwitter){
				var twitterLink = document.createElement('a');
				twitterLink.href='https://twitter.com/intent/tweet?url=' + encodeURIComponent(longURL) + '&text=' + encodeURIComponent(textURL);
				document.body.appendChild(twitterLink);
				twitterLink.click();
			} else {
				var textArea = document.createElement("textArea");

				textArea.setAttribute("class", "verbatim-text-area");

				if (settings.defaultStyling){
					textArea.setAttribute("wrap", "off");
				}
				$('.' + settings.buttonClass).append(textArea);

				if (settings.bitlyToken){
					$.getJSON(
					    "https://api-ssl.bitly.com/v3/shorten?", 
					    { 
					        "access_token": settings.bitlyToken,
					        "longUrl": longURL
					    },
					    function(response)
					    {
					    	if (response.status_code == 200){
					    		longURL = response.data.url;
					    		$('.verbatim-text-area').val(longURL);	
					    		textArea.select();
					    	}
					    }
					);
				} else{
					$('.verbatim-text-area').val(longURL);
					textArea.select();
				}
			}
		}

		$(settings.searchContainer).on('mouseup', function(event){
			if ($(event.target).is('#verbatimLogo')){
				withTwitter = false;
				self.copyURL();
			} else if ($(event.target).is('#twitterLogo')){
				withTwitter = true;
				self.copyURL();
			} else if ($(event.target).hasClass('verbatim-text-area')){
				return false;
			} else 
				self.insertCopyButton(event.target);

		});

		if (sanitizedHash)
			self.findHash(sanitizedHash, settings);
	}

}(window.jQuery);