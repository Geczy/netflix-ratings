var ratings = JSON.parse( localStorage.getItem('netflix_ratings') );

function append_row( title, id ) {
	$('div.info dl').append('<dt>' + title + '</dt><dd id="' + id + '_rating"></dd>')
}

function set_rating(rating, id) {
	$('#' + id + '_rating').html(rating);
}

function get_year() {
	var year = $('.bobMovieHeader > span.year').text();
	if ( year.length != 4 ) {
		year = year.substring( 0, 4 );
	}

	return year;
}

function get_type() {
	return $('.mpaaRating').text();
}

function get_duration() {
	return $('.duration').text();
}

function get_title() {
	var title = $('.bobMovieHeader span.title').text();
	title = title.replace('(U.K.)', '');
	title = title.replace('(U.S.)', '');

	return $.trim(title);
}

function save_rating( title, rating, type ) {
	if ( ! ratings ) ratings = {};

	if ( ! ratings.hasOwnProperty(type) ){
		ratings[type] = {}
	}

	ratings[type][title] = rating;

	localStorage.setItem( 'netflix_ratings', JSON.stringify( ratings ) );
}

function get_rating( title, type ) {
	if ( ! ratings ) ratings = {};

	if ( ! ratings.hasOwnProperty(type) ){
		ratings[type] = {}
	}

	return ratings[type][title];
}