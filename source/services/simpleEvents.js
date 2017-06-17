
const cbMap = {};

const simpleEvents = {
    on: (route, cb) => {
        if (!cbMap.hasOwnProperty(route)) {
            cbMap[route] = [];
        }
        cbMap[route].push(cb);
    },

    off: (route, cb) => {
        if (!cbMap.hasOwnProperty(route)) {
            throw new Error(`[simpleEvents: off()] There is no such route: ${route}`);
        }
        if (!cb) {
            cbMap[route] = [];
            return true;
        }
        for (let i = cbMap[route].length - 1; i >= 0; i--) {
            if (cbMap[route][i] === cb) {
                cbMap[route].splice(i, 1);
                return true;
            }
        }
        return false;
    },

    send: (route, data) => {
        if (!cbMap[route]) {
            throw new Error(`[simpleEvents: send()] There is no such route: ${route}`);
        }
        cbMap[route].forEach(cb => cb(data));
    },
}

module.exports = simpleEvents;