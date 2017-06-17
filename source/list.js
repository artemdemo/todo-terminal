const blessed = require('blessed');
const screen = require('./screen');
const toDoList = require('./model/toDoList');
const toDoListConst = require('./model/toDoListConstants');
const toDoListActions = require('./model/toDoListActions');
const simpleEvents = require('./services/simpleEvents');

const list = blessed.list({
    parent: screen,
    label: ' {bold}{cyan-fg}ToDo{/cyan-fg}{/bold} List ',
    tags: true,
    top: 0,
    left: 0,
    width: '50%',
    height: '50%',
    keys: true,
    vi: true,
    mouse: true,
    border: 'line',
    scrollbar: {
        ch: ' ',
        track: {
            bg: 'cyan',
        },
        style: {
            inverse: true,
        },
    },
    style: {
        item: {
            hover: {
                bg: 'blue',
            }
        },
        selected: {
            bg: 'blue',
            bold: true,
        },
    },
});

const itemsList = () => {
    return toDoList.getList().map((item) => {
        const title = item.title ? item.title : item.description;
        const value = item.done ? `{gray-fg}${title}{/gray-fg}` : title;
        const selectedChar = item.selected ? '>' : ' ';
        return selectedChar + ' ' + value;
    })
};

list.setItems(itemsList());

list.on('select', (el, selected) => {
    const elIndex = el.index;
    toDoListActions.selectToDo(toDoList.getList()[elIndex - 2].id);
});

simpleEvents.on(toDoListConst.UPDATE_TODO_LIST, () => {
    list.setItems(itemsList());
});

module.exports = list;
