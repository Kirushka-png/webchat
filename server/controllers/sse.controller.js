import { EventEmitter } from "events";

export class SseConnection extends EventEmitter {

    constructor() {
        super();
    }

    init(req, res, next) {
        try {
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive'
            });
            this.res = res
            this.req = req
            let id = 0
            console.log(id)
            const dataListener = (data) => {
                console.log(data)
                if (data.event) {
                    this.res.write(`event: ${data.event}\n`)
                }
                res.write(`data: ${data.data}\n`)
                res.write(`id: ${++id}\n`)
                res.write(`\n`)
            }
            this.on('getChats', dataListener)
            req.on('close', () => {
                this.removeListener('data', dataListener)
            })
        } catch (error) {
            next(error)
        }
    }
    async getChats(req, res) {
        const url = req.originalUrl
        const { refreshToken } = this.req.cookies
        const chats = await userService.getUserChats(refreshToken);
        this.emit('data', data)
        res.end()
    }

}
export const sseConnection = new SseConnection()