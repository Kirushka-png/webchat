export class MessageDTO {
    id
    chatID
    text
    file
    author
    status
    wasRedacted
    wasForwarded
    createdAt

    constructor(model) {
        this.id = model.id
        this.chatID = model.chatID
        this.text = model.text
        this.file = model.file
        this.author = model.author
        this.status = model.status
        this.wasRedacted = model.wasRedacted
        this.wasForwarded = model.wasForwarded
        this.createdAt = model.createdAt
    }
}