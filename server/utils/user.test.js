const expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Vadim',
                room: 'Office room'
            }, {
                id: '2',
                name: 'Jen',
                room: 'Show room'
            }, {
                id: '3',
                name: 'Mike',
                room: 'Office room'
            }
        ];
    });

    it('Should add new user', (done) => {
        let users = new Users();

        let user = {
            id: '123',
            name: 'Vadim',
            room: 'Office room'
        };

        let resUesr = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
        done();
    });

    it('Should return names for Show room', (done) => {
        let userList = users.getUserList('Show room');

        expect(userList).toEqual(['Jen']);
        done();
    });

    it('should remove user', (done) => {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
        done();
    });

    it('should not remove user', (done) => {
        let userId = '99';
        let user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
        done();
    });

    it('should find user', (done) => {
        let userId = '2';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
        done();
    });

    it('should not find user', (done) => {
        let userId = '99';
        let user = users.getUser(userId);

        expect(user).toBeFalsy();
        done();
    });
});
