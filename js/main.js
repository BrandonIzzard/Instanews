$(document).ready(function(){
	// console.log('Hello Rose');
	//
	$('#loading').hide();
	//
$('#articles').on('change', function(event) {
	event.preventDefault();
	$('#loading').show();
	var selected = $('.sections').val();

	var url = 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json';
	url += '?' + $.param({
		'api-key': '94b6dc5c15134d969761539fe65ec9ad'
	});

	$.ajax({
		url: url,
		method: 'GET',
		dataType: 'json'
	})

	.done(function(data) {
		$('.nyt-logo').css('height', '120px');
		$('.insta-header').css('height', '25vh');
		$('.topArticles').empty();
		

		var filterNews = data.results.filter(function(value){
			return value.multimedia.length >=5
		});
		filterNews.splice(12);


		$.each(filterNews, function(key, value) {

			if (value.multimedia.length > 0) {

				var picture = value.multimedia[4].url,
				abstract = value.abstract,
				articleUrl = value.url,

				article = '<li>' + '<a href=' + articleUrl + '>';
				article += '<div class="articleBackground" style= "background-image:url(' + picture + ')">';
				article += '<p class="abstract">' + abstract + '</p></div></a></li>';

				$('.topArticles').append(article)
			}
		});

	})
	.fail(function(err) {
		throw err;	
	})
	.always(function(){
    $('#loading').hide();
    });
    });
});