var api_url = 'http://imdbapi.org/';

var params = {
	type: 'json',
	plot: 'simple',
	limit: 1,
	episode: 0,
};

var tries = 0;

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

		find_rating( get_query() );

	});

}

function find_rating( query ) {

	$.getJSON(query, function(data) {

		if ( !data[0] ) {
			// Attempt one more try with an empty year
			if ( !tries ) {
				tries++;
				set_year(false);
				find_rating( get_query() );
			} else {
				rating = 'Error. ' + get_search_link();
			}
		} else {
			rating = data[0].rating ? data[0].rating.toFixed(1) : 'Not yet rated';
			rating = '<a target="_TOP" href="' + data[0].imdb_url + '">' + rating + '</a> / 10';

			if ( tries ) {
				rating += '<br/><br/>(Tried twice to find IMDb rating. May be inaccurate. ' + get_search_link() + ' to confirm.)';
			}
			tries = 0;
		}

		set_rating(rating);

	});

}

function get_search_link() {
	return '<a target="_TOP" href="http://www.imdb.com/find?q=' + params.q + '">Search manually</a>';
}

function get_year() {
	var year = $('.bobMovieHeader > span.year').text();
	if ( year.length != 4 ) {
		year = year.substring( 0, 4 );
	}

	return year;
}

function get_title() {
	var title = $('.bobMovieHeader > span.title').text();
	title = title.replace('(U.K.)', '');
	title = title.replace('(U.S.)', '');

	return title;
}

function set_type() {
	var rating = $('.mpaaRating').text();
	var duration = $('.duration').text();

	params.mt = (rating.indexOf('TV') != -1 || duration.indexOf('Episode') != -1 || duration.indexOf('Season') != -1 || duration.indexOf('Serie') != -1 ) ? 'TVS' : 'M';
}

function get_query() {
	return api_url + '?' + $.param(params);
}

function set_year(year) {
	if ( year ) {
		params.yg = 1;
		params.year = year;
	} else {
		params.yg = 0;
	}
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