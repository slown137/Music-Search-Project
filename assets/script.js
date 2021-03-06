//function for the sticky header
$(function () {
  $(window).scroll(function () {
    var winTop = $(window).scrollTop();
    if (winTop >= 30) {
      $("body").addClass("sticky-shrinknav-wrapper");
    } else {
      $("body").removeClass("sticky-shrinknav-wrapper");
    }
  });
});
//global variables
var input = document.getElementById("input")
var searchBtn = document.getElementById("searchBtn")
var userHistory = JSON.parse(localStorage.getItem('selection'))
var clearBtn = document.getElementById('clearBtn');
var embedE1 = $('#forEmbed')
var teamClick =$('#teamClick')
//function for user input splitting, allows searches with multiple words
var setParams = function (inputs) {
  var userInput = inputs.value
  console.log(userInput);
  var searchArray = userInput.split(" ");
  console.log(searchArray);
  var searchParams = searchArray.join("%20");
  console.log(searchParams);
  return searchParams;
};
//genius API call for song information
var geniusSearch = function (searchData) {
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
//lyric api call for song lyrics, populates to lyric container
var lyricsApi = function(artist, title) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.lyrics.ovh/v1/" + artist + '/' + title,
    "method": "GET",
    "error" : function() {
      $('#lyricsBox').html("Lyrics not found! Try again or click link above!");
    }
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(status);
    var songLyrics = response.lyrics.replace(/\n/g, '<br />');
    console.log(songLyrics);
    $('#lyricsBox').html(songLyrics);
  });
}
//deezer api call, obtains 30 second song preview
var deezerSearch = function () {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + input.value,
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "65de35a1bamsh1f7acd97b19531ep117ad5jsn8557fcd005a4",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    var deezerPre = response['data'][0]['preview'];
    var audio = document.getElementById('audio');
    
    if (audio.getAttribute('src')===""){
      audio.src = deezerPre
    }  else {
      audio.src = deezerPre
    }

  })
};

//search button with all api calls
$('#searchBtn').on('click', function () {
  let p = document.getElementById('lyricsCard');
  p.removeAttribute("hidden");
  geniusSearch(setParams(input));
  save();
  deezerSearch();
  
});
//allows user to use enter button the same as a button click
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});
//local storage
function save() {
  var newSelection = input.value


  if (localStorage.getItem('selection') == null) {
    localStorage.setItem('selection', '[]')
  }

  var oldSelection = JSON.parse(localStorage.getItem('selection'));
  oldSelection.push(newSelection);

  localStorage.setItem('selection', JSON.stringify(oldSelection));


}
//adding local storage array to the history list
if (userHistory === null) {

} else {
  for (let index = 0; index < userHistory.length; index++) {
    var a = document.createElement('li');
    var b = document.createTextNode(`${userHistory[index]}`);
    a.appendChild(b);
    document.querySelector('.list-group').appendChild(a);
    a.className += 'list-group-item';

  }
}
//trims history to 5 searches
if (userHistory > 5) {
  var lastItem = $('#searchHistory li:last-child').html();
  var nextItem = parseInt(lastItem) + 1;
  $('#searchHistory').append('<li>' + nextItem + '</li>')
  filterList();
};


function filterList() {
  $("#searchHistory > li").not(":nth-last-of-type(-n+5)").remove();
}

filterList();
//clear button, deletes local storage
if (clearBtn === null) {

} else {
  clearBtn.addEventListener('click', function () {
    localStorage.clear();
    document.getElementById('searchHistory').innerHTML = ""
    let t = document.getElementById('teamMembers')
    t.setAttribute('hidden', 'true')
  })

};
//event listener for team information
$('#teamClick').on('click',function(){
  let t = document.getElementById('teamMembers')
  t.removeAttribute('hidden')
})





