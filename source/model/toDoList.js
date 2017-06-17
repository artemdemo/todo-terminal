const toDoListConst = require('./toDoListConstants');
const toDoListActions = require('./toDoListActions');
const simpleEvents = require('../services/simpleEvents');

const getId = () => String(+(new Date())) + String(Math.floor(Math.random() * 1000));

let toDoList = [
    {
        id: null,
        done: null,
        selected: true,        
        title: '{bold}Add New{/bold}',
        description: null,
    },
    {
        id: getId(),
        done: false,
        selected: false,
        title: 'First todo title',
        description: 'The code prefixes each character in the input text with the stroke overlay \u0336.',
    },
    {
        id: getId(),
        done: true,
        selected: false,
        title: 'Second todo title',
        description: 'Note that the function assumes that text is encoded in a singlebyte encoding such as ASCII or Latin.',
    },
    {
        id: getId(),
        done: false,
        selected: false,
        title: 'Third todo title',
        description: 'If the input is in UTF-8 it must be converted to UTF-32 first to get the character boundaries.',
    },
];

const parseDescription = (description) => {
    const descrRegex = /#(.*?)\n([\s\S]+)|([\s\S]+)/;
	const match = descrRegex.exec(description);
    const result = {
        title: undefined,
        description: undefined,
    };
	if (match) {
        result.title = match[1];
        result.description = match[2] || match[3];
	}
    return result;
}

simpleEvents.on(toDoListConst.SELECT_TODO, (toDoId) => {
    toDoList = toDoList.map((item) => {
        if (toDoId === item.id) {
            return Object.assign(item, {selected: true});
        }
        return Object.assign(item, {selected: false});
    });
    toDoListActions.updateToDoList();
});

simpleEvents.on(toDoListConst.UPDATE_TODO, (newToDo) => {
    const toDoContent = parseDescription(newToDo.description);
    if (toDoList[0].selected) {
        // Add new toDo
        toDoList.push({
            id: getId(),
            done: newToDo.done,
            selected: false,
            title: toDoContent.title,
            description: toDoContent.description,
        });
    } else {
        toDoList = toDoList.map((item) => {
            if (item.selected) {
                return Object.assign(item, {
                    done: newToDo.done,
                    title: toDoContent.title,
                    description: toDoContent.description,
                });
            }
            return item;
        });
    }
    toDoListActions.updateToDoList();
});

simpleEvents.on(toDoListConst.DELETE_TODO, () => {
    toDoList = toDoList.filter((item, index) => {
        return index === 0 || !item.selected;
    });
    toDoList[0].selected = true;
    toDoListActions.updateToDoList();
});

module.exports = {
    getList: () => {
        return [...toDoList];
    },
};