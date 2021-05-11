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
$("#music .save").val(localStorage.getItem("music"));

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
  console.log(response);
});
};

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



