export class FileDTO {
    originalname
    type
    filename
    size
    constructor(model) {
        this.originalname = model.originalname
        this.type = model.mimetype
        this.filename = model.filename
        this.size = model.size
    }
}