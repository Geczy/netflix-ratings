var ratings = JSON.parse( localStorage.getItem('netflix_ratings') );

function append_row( title, id ) {
	jQuery('div.info dl').append('<dt>' + title + '</dt><dd id="' + id + '_rating"></dd>')
}

function set_rating(rating, id) {
	jQuery('#' + id + '_rating').html(rating);
}

function get_year() {
	var year = jQuery('.bobMovieHeader > span.year').text();
	if ( year.length != 4 ) {
		year = year.substring( 0, 4 );
	}

	return year;
}

function get_type() {
	return jQuery('.mpaaRating').text();
}

function get_duration() {
	return jQuery('.duration').text();
}

function get_title() {
	var title = jQuery('.bobMovieHeader span.title').text();
	title = title.replace('(U.K.)', '');
	title = title.replace('(U.S.)', '');

	return jQuery.trim(title);
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