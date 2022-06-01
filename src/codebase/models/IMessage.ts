export interface IMessage{
    id: number,
    text: string,
    file: string,
    author: number,
    status: boolean,
    wasRedacted: boolean,
    wasForwarded: boolean,
    createdAt: string
}
export default IMessage