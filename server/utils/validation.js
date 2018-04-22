const _  = require('lodash');

let isRealString = (string) => {
    return typeof string === 'string' && string.trim().length > 0;
};

let isUniqueName = (users, name, room) => {
    let result = _.find(users, function (user) {
        return user.name === name && user.room === room;
    });
    if (!result) {
        return true
    }
    return false;
};

module.exports = {isRealString, isUniqueName};
