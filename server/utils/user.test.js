const expect = require('expect');

let {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Julian',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Dan',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Ajay',
            room: 'Tech hub'
        };

        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('it should remove a user', () => {
        let userId = '2';
        let user = users.removeUser('2');

        expect(user.id).toEqual('2');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user if unvalid input', () => {
        let userId = '33';
        let user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should return a user', () => {
        let userId = '2';
        let user = users.getUser(userId);
        
        expect(user.id).toEqual('2');
    });

    it('should not return a user if unvalid input', () => {
        let userId = '99';
        let user = users.getUser(userId);
        
        expect(user).toNotExist();
    });

    it('should return names for Node course', () => {
       let userList = users.getUserList('Node Course');
       expect(userList).toEqual(['Mike', 'Dan']);
    });

    it('should return names for React course', () => {
        let userList = users.getUserList('React Course');
        expect(userList).toEqual(['Julian']);
     });
});