import Game from './models/game';

const game = new Game({
  numPlayers: 2,
  rows: 4,
  cols: 4,
  includeBlank: false,
});

document.body.appendChild(game.el);

window.game = game;

document.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.matches('.js-save-state') && game.saveState();
  e.target.matches('.js-load-state') && game.loadState();
});
