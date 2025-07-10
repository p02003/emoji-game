$(document).ready(function () {
  const emojis = ["🍎", "🍌", "🍇", "🍓", "🍍", "🍉", "🍒", "🥝"];
  let cardData = [];
  let firstCard = null;
  let secondCard = null;
  let score = 0;

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function initGame() {
    const doubled = [...emojis, ...emojis];
    const shuffled = shuffle(doubled);
    cardData = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      matched: false
    }));
    score = 0;
    $('#score').text(score);
    renderBoard();
  }

  function renderBoard() {
    const board = $('#gameBoard');
    board.empty();
    cardData.forEach(card => {
      const cardDiv = $(`<div class="card bg-light text-center p-4 border" data-id="${card.id}">❓</div>`);
      cardDiv.on('click', () => flipCard(card.id));
      board.append(cardDiv);
    });
  }

  function flipCard(id) {
    const card = cardData.find(c => c.id === id);
    if (card.matched || card === firstCard || secondCard) return;

    $(`[data-id='${id}']`).text(card.emoji);

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      setTimeout(checkMatch, 700);
    }
  }

  function checkMatch() {
    if (firstCard.emoji === secondCard.emoji) {
      firstCard.matched = true;
      secondCard.matched = true;
      score++;
      $('#score').text(score);
    } else {
      $(`[data-id='${firstCard.id}']`).text('❓');
      $(`[data-id='${secondCard.id}']`).text('❓');
    }
    firstCard = null;
    secondCard = null;
  }

  $('#startBtn').on('click', function () {
    const name = $('#userName').val();
    if (name.trim() !== "") {
      $('#greeting').text(`Hello, ${name}! Let's play.`);
      $('#gameSection').removeClass('d-none');
      initGame();
      console.log("💡 Hint: Click the 🎉 icon in the top left corner for an easter egg!");
    }
  });

  $('#resetBtn').on('click', function () {
    initGame();
  });

  // Easter Egg
  $('.navbar-brand').on('click', function () {
    alert('🎉 Easter Egg Unlocked! Auto-matching mode ON');
    cardData.forEach(card => card.matched = true);
    renderBoard();
  });
});

