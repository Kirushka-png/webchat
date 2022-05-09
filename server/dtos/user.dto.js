export class UserDTO {
    name
    id

    constructor(model) {
        this.name = model.name
        this.id = model.id
    }
}