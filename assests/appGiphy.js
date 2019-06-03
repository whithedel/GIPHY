var topics = ['wolverine','hulk','black panther','iron man','thor','spider-man']

// create the main buttons.
function appendTopics(){
    for (var i=0; i<topics.length; i++){
        var appendsButtons = $(`<button type="button" value='${topics[i]}' class="btn giphy btn-danger rounded-circle border border-dark mr-1">`).html(topics[i]);
        $('#topicsFromArray').append(appendsButtons);
    }
}
appendTopics();

//function making request to the api
function apiCall() {
    
    

    clickButtonValue = $(this).val().trim();
    apiKey = 'AHc0oZr505wUxmO7R3WIyCKetud5hfuP'
    console.log(clickButtonValue);
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + clickButtonValue + "&limit=10&rating=R&lang=en"
    
    $('#giphySection').empty();

    $.ajax ({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response)
        for (var i=0; i<response.data.length; i++){
            var giphyPreview = response.data[i].images.looping.mp4;
            var rating =response.data[i].rating;
            var createGif = $(`<span><figure><video src='${giphyPreview}' id='img${i}' class='giphyImg m-3 img-thumnail badge badge-pill badge-danger' type=video/mp4'><figcaption>Rated: ${rating} </figcaption></figure></span>`);

            $('#giphySection').append(createGif);

            $('#img'+i).click(function(){
                console.log(this)
                if (this.paused === false){
                    this.pause();
                } else {
                    this.play();
                }
            })
        }
    })

}

$(document).on('click', '.giphy',apiCall);

$(document).on('click','#submit', function(event){
    event.preventDefault();
    searchTopicVal = $('#searchTopic').val();
    var appendsButtons = $(`<button type="button" value='${searchTopicVal}' class=" btn giphy btn-danger rounded-circle border border-dark mr-1">`).html(searchTopicVal);
    $('#topicsFromArray').append(appendsButtons);
    document.getElementById('searchTopic').value='';
})

$(document).on('click','.Clear', function(){
    $('#topicsFromArray').empty();
    $('#giphySection').empty();
    appendTopics();
    
})

