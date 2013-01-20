function init() {

	$("#BobMovie").watch('display', function() {

		// Don't continue if the tooltip is hidden
		if ( $(this).css('display') == 'none' ) {
			set_rating( '', 'imdb' );
			return false;
		}

		append_row('IMDB Rating:', 'imdb');
		set_rating('Loading...', 'imdb');

		var title = get_title();
		var year = get_year();

		// Storage
		var imdb_rating = get_rating( title, 'imdb' );

		if ( imdb_rating ) {
			set_rating( imdb_rating, 'imdb' );
		} else {
			find_imdb_rating( title, year );
		}
	});
}

$(document).ready(function() {
	init();
});
