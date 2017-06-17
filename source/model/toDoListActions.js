const simpleEvents = require('../services/simpleEvents');
const toDoListConst = require('./toDoListConstants');

module.exports = {
    updateToDo: (toDo) => {
        simpleEvents.send(toDoListConst.UPDATE_TODO, toDo);
    },

    selectToDo: (toDoId) => {
        simpleEvents.send(toDoListConst.SELECT_TODO, toDoId);
    },

    deleteToDo: () => {
        simpleEvents.send(toDoListConst.DELETE_TODO);
    },

    updateToDoList: () => {
        simpleEvents.send(toDoListConst.UPDATE_TODO_LIST);
    },
};