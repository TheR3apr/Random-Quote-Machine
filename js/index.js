var colors = ["brown", "chocolate", "crimson", "darkcyan", "darkgoldenrod", "gray", "darkseagreen", "deeppink"];
var currentQuote, currentAuthor;

function getRandomNum(num){
  return Math.floor(Math.random()*num);
}
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
function getMyQuote(){
 
 /* $.getJSON("https://crossorigin.me/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
  var randomNum = getRandomNum(a.length);
        var post = a[randomNum]; // The data is an array of posts. Grab the first one.
        currentQuote = post.content;
        
        randomNum %= colors.length;
        $(".bgColor").css("background-color", colors[randomNum]);
        $(".textColor").css("color", colors[randomNum]);
        $('#quote').html(post.content);

        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          currentAuthor = post.custom_meta.Source;
          $('#origin').html(post.custom_meta.Source);
        } else {
          $('#origin').text('anonymus');
          currentAuthor = 'anonymus';
        }
      });*/
  $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {

        var post = data.shift(); // The data is an array of posts. Grab the first one.
        currentQuote = post.content.replace(/<p>/gi, "");
        currentQuote = currentQuote.replace(/<\/p>/gi, "");
        currentQuote = currentQuote.replace(/&#8217;/gi, "'"); 
        var randomNum = getRandomNum(colors.length);
        $(".bgColor").css("background-color", colors[randomNum]);
        $("body").css("background-color", colors[randomNum]);
        $(".textColor").css("color", colors[randomNum]);
        $('#quote').html(post.content);
        $("#origin").text(post.title);
        currentAuthor = post.title;
        $('#btn1').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        // If the Source is available, use it. Otherwise hide it.
        /*
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          var currentAuthor = post.custom_meta.Source;
          $('#origin').html(post.custom_meta.Source);
        } else {
          $('#origin').text('anonymus');
          var currentAuthor = 'anonymus';
        }
        */
      },
      cache: false
    });
   /*   
  cache: false;*/
}

$(document).ready(function(){
  getMyQuote();
  $("#btn2").on("click", getMyQuote);
  $("#btn1").on("click", function(){
    openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  });
});