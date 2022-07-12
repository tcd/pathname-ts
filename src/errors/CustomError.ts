// /** [`Error()` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error) */
// export interface ErrorOptions {
//     /**
//      * A human-readable description of the error.
//      */
//     message?: string
//     options?: {
//         /**
//          * A property indicating the specific cause of the error.
//          * When catching and re-throwing an error with a more-specific or
//          * useful error message, this property can be used to pass the original error.
//          */
//         cause: Error
//     }
//     /**
//      * The value for the `fileName` property on the created `Error` object.
//      * Defaults to the name of the file containing the code that called the `Error()` constructor.
//      */
//     fileName?: string
//     /**
//      * The value for the `lineNumber` property on the created `Error` object.
//      * Defaults to the line number containing the `Error()` constructor invocation.
//      */
//     lineNumber?: string | number
// }

/**
 * Base class for custom Errors in ClientApp.
 *
 * For reference, see the following links:
 *
 * - [Custom errors, extending Error](https://javascript.info/custom-errors)
 * - [TypeScript breaking changes documentation](https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)
 */
export class CustomError extends Error {
    constructor(message?: string) {
        super(message)
        Object.setPrototypeOf(this, CustomError.prototype)
        this.name = "CustomError"
    }
}
