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
 
};
  $('#searchBtn').on('click', function(){
    setParams(input);
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

  