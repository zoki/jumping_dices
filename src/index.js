import Game from './models/game';

const game = new Game({
  numPlayers: 3,
  rows: 8,
  cols: 8,
  includeBlank: false,
});

// game.loadState()

document.body.appendChild(game.el);

window.game = game;

document.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.matches('.js-save-state') && game.saveState();
  e.target.matches('.js-load-state') && game.loadState();
});
