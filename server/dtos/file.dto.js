export class FileDTO {
    id
    originalName
    type
    name
    size

    constructor(model) {
        this.id = model.id
        this.originalName = model.originalName
        this.type = model.type
        this.name = model.name
        this.size = model.size
    }
}