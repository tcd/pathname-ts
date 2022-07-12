import { IPathname } from "pathname-ts"

export interface PathnameErrorOptions {
    message: string
    pathname: IPathname
    innerError?: Error
}

/**
 * Base class for custom Errors in `pathname-ts`.
 *
 * For reference, see the following links:
 *
 * - [Custom errors, extending Error](https://javascript.info/custom-errors)
 * - [TypeScript breaking changes documentation](https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)
 * - [`errno`](https://docs.libuv.org/en/v1.x/errors.html)
 */
export abstract class PathnameError extends Error {

    public pathname: IPathname
    public code: string | number
    public innerError?: Error

    constructor(options: PathnameErrorOptions) {
        super(options.message)
        this.pathname = options.pathname
        this.name = "PathnameError"
        this.code = "PathnameError"
        Object.setPrototypeOf(this, PathnameError.prototype)
    }
}
