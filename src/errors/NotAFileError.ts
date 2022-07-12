import { IPathname } from "pathname-js"
import { PathnameError } from "."

export interface NotAFileErrorOptions {
    message: string
}

export class NotAFileError extends PathnameError {
    constructor(pathname: IPathname) {
        super({
            message: `no file exists at path '${pathname}'`,
            pathname: pathname,
        })
        this.name = "NotAFileError"
        Object.setPrototypeOf(this, NotAFileError.prototype)
    }
}
