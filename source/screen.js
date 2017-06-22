const blessed = require('blessed');
const simpleEvents = require('./services/simpleEvents');
const toDoConst = require('./model/toDoListConstants');

// Create a screen object.
const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
});

screen.title = 'ToDo - Terminal';

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], () => {
    return process.exit(0);
});

simpleEvents.on(toDoConst.UPDATE_TODO_LIST, () => {
    setTimeout(() => screen.render());
});

module.exports = screen;
