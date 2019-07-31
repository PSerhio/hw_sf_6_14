const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  $(".game-field").removeClass("target");//надо бы убрать "target" прежде чем искать новый
  $(".game-field").removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1); //помечать target текущим номером
  if (hits === 1) { //тут надо определять при первом клике firstHitTime
    firstHitTime =getTimestamp();
  } 
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").hide();//спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  $(".game-field").text(""); //убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
   else  $(event.target).addClass("miss");//как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
 
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
