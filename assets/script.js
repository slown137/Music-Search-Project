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

  $('#searchBtn').on('click', function(){
    geniusSearch(setParams(input));
    var text = $(this).siblings(".save").val();
    console.log(text + " is stored")
    var music = $(this).parent().attr("id");
    localStorage.setItem(music, text);

  save();
  
  });

  
   
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
