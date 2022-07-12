// import { Stats } from "fs"

declare module "pathname-js" {

    /**
     * A partial TypeScript implementation of Ruby's [Pathname](https://ruby-doc.org/stdlib-2.7.0/libdoc/pathname/rdoc/Pathname.html) class.
     */
    export interface IPathname {
        toString: () => string
        /**
         * Returns an absolute path to the file system object.
         */
        absolutePath: () => string
        /**
         * Returns `true` if the path is absolute.
         */
        isAbsolute: () => boolean
        /**
         * Returns `true` if a file system object exists at the path.
         */
        doesExist: () => Promise<boolean>
        /**
         * Returns `false` if no file system object exists at the path.
         */
        isFile: () => Promise<boolean>
        /**
         * Returns `false` if file system object exists at the path.
         */
        isDirectory: () => Promise<boolean>
        /**
         * Returns an `fs.Stats` object that provides information about the file system object.
         */
        // stat: () => Promise<Stats>
        /**
         * Returns the contents of a file at the path.
         */
        read: () => Promise<string>
    }

    export class Pathname implements IPathname {
        public path: string
        constructor(input: any)
        toString: () => string
        absolutePath: () => string
        isAbsolute: () => boolean
        doesExist: () => Promise<boolean>
        isFile: () => Promise<boolean>
        isDirectory: () => Promise<boolean>
        read: () => Promise<string>
    }

}
