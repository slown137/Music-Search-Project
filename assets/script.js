$(function() {
  $(window).scroll(function() {
    var winTop = $(window).scrollTop();
    if (winTop >= 30) {
      $("body").addClass("sticky-shrinknav-wrapper");
    } else{
      $("body").removeClass("sticky-shrinknav-wrapper");
    }
  });
});

var input = document.getElementById("input")
var searchBtn = document.getElementById("searchBtn")
var userHistory = JSON.parse(localStorage.getItem('selection'))
var clearBtn = document.getElementById('clearBtn');
var embedE1 = $('#forEmbed')

var setParams = function(inputs) {
  var userInput = inputs.value
  console.log(userInput);
  var searchArray = userInput.split(" ");
  console.log(searchArray);
  var searchParams = searchArray.join("%20");
  console.log(searchParams);
  return searchParams;
};

var geniusSearch = function(searchData) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://genius.p.rapidapi.com/search?q=" + searchData,
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "ff5233b9b9mshd8cdfcef119429dp107763jsn3510bdb51ab2",
      "x-rapidapi-host": "genius.p.rapidapi.com"
    }
  };

 $.ajax(settings).done(function (response) {
  console.log("initial search:")
  console.log("------------")
  console.log(response);
  console.log(response.response.hits[0].result.api_path)
  var songLink = response.response.hits[0].result.api_path
  songSearch(songLink);
 });
};

var songSearch = function(apiLink) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://genius.p.rapidapi.com/" + apiLink,
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "ff5233b9b9mshd8cdfcef119429dp107763jsn3510bdb51ab2",
      "x-rapidapi-host": "genius.p.rapidapi.com"
    }
  };
  
  $.ajax(settings).done(function (response) {
    console.log("song search:");
    console.log("------------");
    console.log(response);
    console.log(response.response.song.embed_content);
    var embedContent = response.response.song.embed_content;
    var embedSplit = embedContent.split(" <script");
    console.log(embedSplit);
    embedE1.html(embedSplit[0]);

    console.log(response.response.song.title)
    var title = response.response.song.title
    console.log(response.response.song.primary_artist.name)
    var artist = response.response.song.primary_artist.name
    lyricsApi(artist, title)
  });
}

var lyricsApi = function(artist, title) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.lyrics.ovh/v1/" + artist + '/' + title,
    "method": "GET"
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    if (response.status != 404) {
      var songLyrics = response.lyrics.replace(/\n/g, '<br />');
      console.log(songLyrics)
      $('#lyricsBox').html(songLyrics);
    } else {
      $('#lyricsBox').html("Lyrics not found! Try again or click link above!");
    }

  });
}

$('#searchBtn').on('click', function(){
  geniusSearch(setParams(input));
  save();
});

function save(){
  var newSelection = input.value


if(localStorage.getItem('selection')== null){
    localStorage.setItem('selection', '[]')
}

var oldSelection = JSON.parse(localStorage.getItem('selection'));
oldSelection.push(newSelection);

localStorage.setItem('selection', JSON.stringify(oldSelection));
}




if(userHistory===null){

}else{
  for (let index = 0; index < userHistory.length; index++) {
    var a = document.createElement('li');
    var b = document.createTextNode(`${userHistory[index]}`);
    a.appendChild(b);
    document.querySelector('.list-group').appendChild(a);
    a.className += 'list-group-item';
    
  }
}

if(clearBtn === null){

}else{
  clearBtn.addEventListener('click',function(){
    localStorage.clear();
    document.getElementById('searchHistory').innerHTML = ""
  })
};
