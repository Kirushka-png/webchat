export class ChatGroup {

    groups = []

    constructor(groupid, userid, socketid) {
        this.groupid = groupid
        this.userid = userid
        this.socketid = socketid
    }

    setNewUser(groupid, userid, socketid) {
        const newUser = { groupid, userid, socketid }
        this.groups.push(newUser)
        return newUser
    }

    getCurrentUser(userid) {
        return this.groups.find(user => user.userid == userid)
    }

}