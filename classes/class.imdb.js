var imdb_api = 'http://www.omdbapi.com/?tomatoes=true';
var imdb_url = "http://www.imdb.com/title/"
var imdb_tries = 0;

var imdb_params = {
	plot: 'short',
};

function find_imdb_rating( title, year ) {
	set_imdb_title( title );
	set_imdb_year( year );
	set_imdb_type();

	imdb_request( title );
}

function imdb_details (data) {
}

function imdb_request( title ) {
	var query = imdb_api + '&' + jQuery.param(imdb_params);

	jQuery.ajax({
		url: query,
		dataType: 'json',
		success: function( data ) {

			match = _.detect(data.Search, function (hit){
				return hit.Title == imdb_params.s;
			});

			if ( !match ) {
				// Attempt one more try with an empty year
				if ( !imdb_tries ) {
					imdb_tries++;
					set_imdb_year(false);
					imdb_request( title );

					return false;
				} else {
					rating = 'Error. ' + get_imdb_search_link();
				}
			} else {

				jQuery.ajax({
					url : imdb_api + '&' + jQuery.param({i:match.imdbID}),
					dataType: 'json',
					success: function( match ) {					
						rating = match.imdbRating ? match.imdbRating : 'Not yet rated';
						rating = '<a target="_TOP" href="' + imdb_url + match.imdbID + '">' + rating + '</a> / 10';

						if ( imdb_tries ) {
							rating += '<br/><br/>(Tried twice to find IMDb rating. May be inaccurate. ' + get_imdb_search_link() + ' to confirm.)';
						}

						set_rating( rating, 'imdb' );
						save_rating( title, rating, 'imdb' );

					},
					error: function( data ) {
						set_rating( 'The IMDb API appears to be offline :/. <a target="_TOP" href="' + query + '">You can confirm so here.</a><br/><br/>All you can do is wait until the API comes back online. Please don\'t hate the extension!', 'imdb' );
					}
				});

				imdb_tries = 0;
			}

		},
		error: function( data ) {
			set_rating( 'The IMDb API appears to be offline :/. <a target="_TOP" href="' + query + '">You can confirm so here.</a><br/><br/>All you can do is wait until the API comes back online. Please don\'t hate the extension!', 'imdb' );
		}
	});
}

function get_imdb_search_link() {
	return '<a target="_TOP" href="http://www.imdb.com/find?q=' + imdb_params.q + '">Search manually</a>';
}

function set_imdb_year( year ) {
	if ( year ) {
		imdb_params.y = year;
	} else {
	}
}

function set_imdb_title( title ) {
	imdb_params.s = title;
}

function set_imdb_type() {
	var rating = get_type();
	var duration = get_duration();

	imdb_params.mt = (rating.indexOf('TV') != -1 || duration.indexOf('Episode') != -1 || duration.indexOf('Season') != -1 || duration.indexOf('Serie') != -1 ) ? 'TVS' : 'M';
}