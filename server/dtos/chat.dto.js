export class ChatDTO {
    name
    admin
    id
    private

    constructor(model) {
        this.name = model.name
        this.admin = model.admin
        this.id = model.id
        this.private = model.private
    }
}