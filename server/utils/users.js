// [{
//     id: 'fdfdfdfd',
//     name: 'Vadim',
//     room: 'fdfdfdf'
// }]

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user)

        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => {
                return user.id !== id;
            });
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        let users = this.users.filter((user) => {
            return user.room === room;
        });

        let namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = {Users};

//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList


// var users = [];
//
// var addUser = (id, name, room)
// {
//     users.push({});
// }
//
// module.exports = {addUser};

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//
//     getUserDescription() {
//         return `${this.name} is ${this.age} year old`;
//     }
// }
//
// var me = new Person('Andrew', 25);