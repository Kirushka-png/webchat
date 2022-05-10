import { ApiError } from "../exceptions/api.error.js";
import { tokenService } from "../services/token.service.js";

export function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(authHeader)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData
        next()

    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}