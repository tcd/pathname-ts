// import { Stats } from "fs"

declare module "pathname-ts" {

    /**
     * A partial implementation of Ruby's [Pathname](https://ruby-doc.org/stdlib-2.7.0/libdoc/pathname/rdoc/Pathname.html) class for [Node.js].
     */
    export interface IPathname {
        /**
         * Returns the real (absolute) pathname for self in the actual filesystem.
         *
         * Does not contain symlinks or useless dots, .. and ..
         *
         * All components of the pathname must exist when this method is called.
         */
        realpath: string
        /**
         * Returns the absolute path as a string.
         */
        toJSON: () => any
        /**
         * Returns the absolute path as a string.
         */
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
         * Joins the given segments onto the path to create a new `IPathname`.
         */
        join: (...segments: string[]) => IPathname
        /**
         * Return the last portion of a path.
         * Similar to the Unix basename command.
         * Often used to extract the file name from a fully qualified path.
         *
         * @param extension optional; an extension to remove from the result.
         */
        basename: (extension?: string) => string
        /**
         * Returns all but the last component of the path.
         */
        dirname: () => string
        /**
         * Return the extension of the path, from the last "." to end of string in the last portion of the path.
         * If there is no "." in the last portion of the path or the first character of it is ".", then it returns an empty string.
         */
        extname: () => string
        /**
         * Returns the parent directory of the path as an `IPathname`.
         */
        parent: () => IPathname
        // /**
        //  * Renames the file system object at the path.
        //  * Returns `IPathname` for the renamed file system object.
        //  */
        // rename: (newPath: string) => Promise<IPathname>
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
         * Returns a string containing the contents of a file at the path.
         */
        read: () => Promise<string>
        /**
         * Returns the contents of a file parsed into a JSON object.
         */
        readJSON<T = any>(): Promise<T>
        /**
         * Write `data` to a file at the path.
         *
         * @param data The data to be written.
         */
        write: (data: string) => Promise<void>
        /**
         * Stringify `data` and write it out to the path.
         *
         * @param data The data to be stringified and written.
         */
        writeJSON: (data: any, options?: any) => Promise<void>
        /**
         * Returns the children of the directory (files and subdirectories, not recursive) as an array of `IPathname`s.
         */
        children: (type?: "all" | "files" | "folders") => Promise<IPathname[]>
    }

    /**
     * A partial implementation of Ruby's Pathname class for Node.js.
     */
    export class Pathname implements IPathname {
        public path: string
        public realpath: string
        constructor(input: string | IPathname)
        toJSON: () => any
        toString: () => string
        absolutePath: () => string
        isAbsolute: () => boolean
        join: (...segments: string[]) => IPathname
        basename: (extension?: string) => string
        dirname: () => string
        extname: () => string
        parent: () => IPathname
        // rename: (newPath: string) => Promise<IPathname>
        doesExist: () => Promise<boolean>
        isFile: () => Promise<boolean>
        isDirectory: () => Promise<boolean>
        read: () => Promise<string>
        readJSON<T = any>(): Promise<T>
        write: (data: string, options?: any) => Promise<void>
        writeJSON: (data: any, options?: any) => Promise<void>
        children: (type?: "all" | "files" | "folders") => Promise<IPathname[]>
    }

}
