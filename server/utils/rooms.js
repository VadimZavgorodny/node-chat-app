const _ = require('lodash');

class Rooms {
    constructor() {
        this.rooms = [{name: 'Текущие чаты', 'selected': true}];
    }

    addRoom(name) {
        let room = [{name, value: name}];
        this.rooms = _.unionWith(this.rooms, room, _.isEqual);
    }

    removeRoom(name) {
        console.log([{name}]);
        console.log(this.rooms);
        this.rooms = _.pullAllBy(this.rooms, [{name}], 'name');
        console.log(this.rooms);
    }

    getRoomList() {
        return this.rooms;
    }
}

module.exports = {Rooms};