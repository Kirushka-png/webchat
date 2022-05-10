export class UserDTO {
    name
    login
    id

    constructor(model) {
        this.name = model.name
        this.login = model.login
        this.id = model.id
    }
}