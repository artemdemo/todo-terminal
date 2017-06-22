const blessed = require('blessed');
const screen = require('./screen');
const list = require('./list');
const toDoList = require('./model/toDoList');
const toDoListConst = require('./model/toDoListConstants');
const toDoListActions = require('./model/toDoListActions');
const simpleEvents = require('./services/simpleEvents');

const form = blessed.form({
    parent: screen,
    mouse: true,
    keys: true,
    vi: true,
    left: 0,
    top: '50%',
    width: '50%',
});

const CAPTION_NEW_TODO = 'Add {bold}new ToDo{/bold}:';
const CAPTION_EDIT_TODO = 'Edit {bold}ToDo{/bold}:';

const captionBox = blessed.box({
    parent: form,
    top: 0,
    left: 2,
    width: '100%',
    content: CAPTION_NEW_TODO,
    tags: true,
    style: {}
});

const textarea = blessed.textarea({  
    parent: form,
    mouse: true,
    top: 2,        
    height: 8,        
    inputOnFocus: true,
    padding: {        
        top: 1,
        left: 2
    },
    style: {          
        fg: '#787878',
        bg: '#454545',
        focus: {        
            fg: '#f6f6f6',
            bg: '#353535' 
        }
    },
    name: 'description',
});

const checkbox = blessed.checkbox({
    parent: form,
    mouse: true,
    keys: true,
    shrink: true,
    style: {},
    height: 1,
    left: 2,
    top: 10,
    name: 'done',
    content: 'Done'
});

const submitButton = blessed.button({
    parent: form,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
        left: 1,
        right: 1,
    },
    right: 0,
    top: 11,
    name: 'submit',
    content: 'Submit ToDo',
    style: {
        bg: 'blue',
        focus: {},
        hover: {
            bg: 'lightblue',
        }
    }
});

submitButton.on('press', () => {
    form.submit();
});

form.on('submit', (data) => {
    toDoListActions.updateToDo(data);
});

const deleteButton = blessed.button({
    parent: form,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
        left: 1,
        right: 1,
    },
    right: 15,
    top: 11,
    name: 'submit',
    content: 'Delete ToDo',
    style: {
        bg: 'red',
        focus: {},
        hover: {
            bg: 'lightred',
        }
    }
});

deleteButton.on('press', () => {
    toDoListActions.deleteToDo();
});

simpleEvents.on(toDoListConst.UPDATE_TODO_LIST, () => {
    const list = toDoList.getList();
    for (let i = list.length - 1; i >= 0; i--) {
        if (i === 0 && list[i].selected) {
            textarea.setValue('');
            checkbox.uncheck();
            captionBox.setContent(CAPTION_NEW_TODO);
            break;
        } else if (list[i].selected) {
            const title = list[i].title ? `#${list[i].title}` : '';
            const description = list[i].description || '';
            textarea.setValue(`${title}\n${description}`);
            if (list[i].done) {
                checkbox.check();
            } else {
                checkbox.uncheck();
            }
            captionBox.setContent(CAPTION_EDIT_TODO);
            break;
        }
    }
});

screen.key(['i'], function() {  
    // Set the focus on the input.
    textarea.focus();
});

// Render the screen.
screen.render();
