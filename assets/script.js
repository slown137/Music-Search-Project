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

  $('#searchBtn').on('click', function(){
      var userInput = input.value
      console.log(userInput);
      var searchArray = userInput.split(" ");
      console.log(searchArray);
      var searchParams = searchArray.join("%20");
      console.log(searchParams);
      var text = $(this).siblings(".save").val();
       console.log(text + " is stored")
      var music = $(this).parent().attr("id");
      localStorage.setItem(music, text);
      

  })

  
   