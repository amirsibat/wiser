export class ApiError extends Error {
    code;
    httpStatus;
    constructor(code, httpStatus) {
        super();
        this.code = code;
        this.httpStatus = httpStatus;
        this.name = this.constructor.name;
        this.message = code;
    }
    toJSON() {
        return {
            errorCode: this.code
        }
    }
    respond(ctx) {
        ctx.body = this;
        ctx.status = this.httpStatus;
    }
}

export class ResourceNotFoundError extends ApiError {
    constructor() {
        super('RESOURCE_NOT_FOUND', 404)
    }
}

// STORE
export class StoreMismatchError extends ApiError {
    constructor() {
        super('STORE_MISMATCH', 400)
    }
}

// INPUT
export class InvalidInputError extends ApiError {
    constructor() {
        super('INVALID_INPUT', 400)
    }
}

// GATEWAY
export class ServiceUnavailableError extends ApiError {
    constructor() {
        super('SERVICE_UNAVAILABLE', 503)
    }
}

export class BadRequestError extends ApiError {
    constructor() {
        super('BAD_REQUEST', 503)
    }
}

