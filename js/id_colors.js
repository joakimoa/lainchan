if (active_page == 'thread' || active_page == 'index') {
	$(document).ready(function(){
		$.hash = function(str) {
			var i, j, msg = 0;
			
			for (i = 0, j = str.length; i < j; ++i) {
				msg = ((msg << 5) - msg) + str.charCodeAt(i);
			}
			
			return msg;
		};

		function stringToRGB(str){
			var rgb, hash;
			
			rgb = [];
			hash = $.hash(str);
			
			rgb[0] = (hash >> 24) & 0xFF;
			rgb[1] = (hash >> 16) & 0xFF;
			rgb[2] = (hash >> 8) & 0xFF;
			
			return rgb;
		}

		function colorPostId(el) {
			var rgb = IDToRGB($(el).text());
			var ft = "#fff";

			if ((rgb[0]*0.299 + rgb[1]*0.587 + rgb[2]*0.114) > 125)
				ft = "#000";

			$(el).css({
				"background-color": "rgb("+rgb[0]+", "+rgb[1]+", "+rgb[2]+")",
				"padding": "0px 5px",
				"border-radius": "8px",
				"color": ft
			});

			$(el).mouseover(function() {
				$(this).css('color', '#800000'); // how about a CSS :hover rule instead?
			}).mouseout(function() {
				$(this).css('color', ft);
			});
		}

		$(".poster_id").each(function(k, v){
			colorPostId(v);
		});

		$(document).on('new_post', function(e, post) {
			$(post).find('.poster_id').each(function(k, v) {
				colorPostId(v);
			});
		});
	});
}
