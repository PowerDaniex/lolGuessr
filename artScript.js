// Settings
var scale = 2.5;


url = "champions.json";

var champions;
var championList = [];

$.getJSON(url, function(json)
{
    champions = json;

    $.each(json["data"], function(i, item) {
      if (item["id"] != null)
        championList.push(prepareText(item["name"]));
    });
    start();
});

Object.prototype.getByIndex = function(index)
{
    return this[Object.keys(this)[index]];
};

function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}

function getLength()
{
   return Object.keys(champions["data"]).length;
}




var selectedChamp;

var tempChampList = [];


function start()
{
  championList.forEach(champ =>
    {
      $('#champions').append("<option value='" + champ + "'>");
    });
  
  $("#champImg")[0].getContext("2d").scale(scale, scale);
  
  randomChampion();
}

function check()
{
  if(event.key === 'Enter')
  {
    submit();     
  }
}

function submit()
{
  var prepared = prepareText($(".submit")[0].value);

  if ($.inArray(prepared, tempChampList) != -1)
  {
    alert("Don't repeat yourself!");
    return;
  }

  if ($.inArray(prepared, championList) == -1)
  {
    var howManyLeft = [];
    championList.forEach(champ => 
    {
      if (champ.search(prepared) != -1)
        howManyLeft.push(champ);
    });

    if (howManyLeft.length == 1)
    {
      prepared = howManyLeft[0];
      $(".submit")[0].value = prepared;
    }
    else
    {
      alert("Chmapion doesn't exist!");
    }
    return;
  }



  if(prepared == prepareText(selectedChamp["id"]))
  {
    good();
    return;
  }

  bad(prepared);
}

function good()
{
  // randomChampion();
  // alert("GOOD");
  $(".submit")[0].value = "";

  $("#ImgChamp").attr("src", "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + selectedChamp["id"] + "_0.jpg");
  $("#ImgChamp").css("display", "block");

  $("#champImg").css("display", "none");

  $("#reset").css("display", "block");
  $(".submit").attr("disabled", true);
}

function bad(prepared)
{
  tempChampList.push(prepared);
  $("option[value='" + prepared + "']").remove();
  $(".submit")[0].value = "";
  $("#champImg")[0].getContext("2d").scale(0.95, 0.95);

  alert("BAD");
}



function randomChampion()
{
  $("#champImg")[0].getContext("2d").clearRect(0, 0, 700, 413);
  $("#ImgChamp").css("display", "none");
  $("#champImg").css("display", "block");
  $("#reset").css("display", "none");
  $(".submit").attr("disabled", false);
  $(".submit").focus();

  selectedChamp = champions["data"].getByIndex(getRandomInt(getLength()));
  // $("#champImg").attr("src", "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + selectedChamp["id"] + "_0.jpg");
  $("#refreshBtn").disabled = true;
  var img = new Image;
  img.src = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + selectedChamp["id"] + "_0.jpg";
  img.onload = function()
  {
    var canvas = $("#champImg")[0].getContext("2d");
    canvas.drawImage(img, 0, 0, 700, 413);
    $("#refreshBtn").disabled = false;
  }
  
  tempChampList.forEach(champ =>
  {
    $('#champions').append("<option value='" + champ + "'>");
  });
  tempChampList = [];
}

function prepareText(text)
{
  text = text.toLowerCase();
  text = text.replace(/[^a-z0-9]/gi,'');
  return text;
}



function openSettings()
{

}