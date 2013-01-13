var api_url = 'http://imdbapi.org/';

var params = {
	type: 'json',
	plot: 'simple',
	limit: 1,
	episode: 0,
};

function init() {

	$("#BobMovie").watch('display', function() {

		// Don't continue if the tooltip is hidden
		if ( $(this).css('display') == 'none' )
			return false;

		$('div.info dl').append('<dt>IMDB Rating:</dt><dd id="imdb_rating"></dd>');

		set_rating('Loading...');

		var title = get_title();
		set_title( title );

		var year = get_year();
		set_year( year );

		set_type();

		$.getJSON(get_query(), function(data) {

			if ( !data[0] ) {
				rating = 'Error. <a target="_TOP" href="http://www.imdb.com/find?q=' + title + '">Search manually</a>';
			} else {
				rating = data[0].rating ? data[0].rating.toFixed(1) : 'Not yet rated';
				rating = '<a target="_TOP" href="' + data[0].imdb_url + '">' + rating + '</a> / 10';
			}

			set_rating(rating);

		});

	});

}

function get_year() {
	var year = $('.bobMovieHeader > span.year').text();
	if ( year.length != 4 ) {
		year = year.substring( 0, 4 );
	}
	return year;
}

function get_title() {
	return $('.bobMovieHeader > span.title').text();
}

function set_type() {
	var rating = $('.mpaaRating').text();
	var duration = $('.duration').text();

	params.mt = (rating.indexOf('TV') != -1 || duration.indexOf('Episodes') != -1 || duration.indexOf('Seasons') != -1 || duration.indexOf('Series') != -1 ) ? 'TVS' : 'M';
}

function get_query() {
	return api_url + '?' + $.param(params);
}

function set_year(year) {
	params.yg = 1;
	params.year = year;
}

function set_title(title) {
	params.q = title;
}

function set_rating(rating) {
	$('#imdb_rating').html(rating);
}

$(document).ready(function() {
	init();
});