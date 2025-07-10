$(document).ready(function () {
  const emojis = ["😀", "🐶", "🌟", "🍕", "🚗", "🎈", "🌈", "🏀"];
  let cards = [...emojis, ...emojis];
  let score = 0;
  let flippedCards = [];
  let matchedCards = [];

  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  function renderCards() {
    const board = $("#gameBoard");
    board.empty();
    shuffled = shuffle(cards);
    shuffled.forEach((emoji, index) => {
      board.append(`<div class="card" data-emoji="${emoji}" data-id="${index}">❓</div>`);
    });
  }

  function resetGame() {
    score = 0;
    flippedCards = [];
    matchedCards = [];
    $("#score").text(score);
    renderCards();
  }

  $(document).on("click", ".card", function () {
    const emoji = $(this).data("emoji");
    const id = $(this).data("id");
    if (matchedCards.includes(id) || flippedCards.includes(id)) return;

    $(this).text(emoji);
    flippedCards.push(id);

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = $(`.card[data-id='${first}']`);
      const secondCard = $(`.card[data-id='${second}']`);

      if (firstCard.data("emoji") === secondCard.data("emoji")) {
        matchedCards.push(first, second);
        firstCard.addClass("matched");
        secondCard.addClass("matched");
        score += 10;
        $("#score").text(score);
      } else {
        setTimeout(() => {
          firstCard.text("❓");
          secondCard.text("❓");
        }, 1000);
      }
      flippedCards = [];
    }
  });

  $("#startBtn").click(function () {
    const name = $("#userName").val();
    if (name.trim()) {
      $("#greeting").text(`Hello, ${name}! Let's play!`);
      $("#gameSection").removeClass("d-none");
      resetGame();
    }
  });

  $("#resetBtn").click(resetGame);
});
