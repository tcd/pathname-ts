import {
    basename,
    dirname,
    extname,
    isAbsolute,
    join,
    resolve,
} from "path"
import {
    access,
    mkdir,
    readdir,
    readFile,
    rename,
    stat,
    writeFile,
} from "fs/promises"
import {
    constants as fsConstants,
    Stats,
} from "fs"

import { IPathname } from "pathname-ts"
import { asyncFilter } from "./lib"

/**
 * - https://ruby-doc.org/stdlib-2.7.0/libdoc/pathname/rdoc/Pathname.html
 * - https://github.com/ruby/pathname/blob/master/lib/pathname.rb
 */
export class Pathname implements IPathname {

    public path: string
    public realpath: string

    constructor(path: string | IPathname) {
        if (typeof path === "string" || path instanceof String) {
            this.path = path as string
        } else {
            this.path = path.toString()
        }
        this.realpath = this.absolutePath()

    }

    public toJSON(): string { return this.realpath }
    public toString(os: "unix" | "windows" = "unix"): string {
        if (os === "windows") {
            return this.realpath.replaceAll("/", "\\\\")
        }

        return this.realpath
    }

    public isAbsolute(): boolean {
        return isAbsolute(this.path)
    }

    public absolutePath(): string {
        if (this.isAbsolute()) {
            return this.path
        } else {
            return resolve(process.cwd(), this.path)
        }
    }

    public join(...segments: string[]): IPathname {
        const newPath = resolve(this.realpath, ...segments)
        return new Pathname(newPath)
    }

    public extname(): string {
        return extname(this.realpath)
    }

    public basename(extension?: string): string {
        return basename(this.realpath, extension)
    }

    public dirname(): string {
        return dirname(this.realpath)
    }

    // public async rename(newPath: string): Promise<IPathname> {
    //     await rename(this.absolutePath(), newPath)
    //     const newFullPath = join(this.dirname(), newPath)
    //     return new Pathname(newFullPath)
    // }

    public parent(): IPathname {
        const parentPath = resolve(this.realpath, "..")
        return new Pathname(parentPath)
    }

    public async doesExist(): Promise<boolean> {
        try {
            const _ = await access(this.realpath, fsConstants.F_OK)
            return true
        } catch (error) {
            return false
        }
    }

    public async isFile(): Promise<boolean> {
        try {
            // if (!(await this.doesExist())) { return false }
            const stat = await this.stat()
            return stat.isFile()
        } catch (error) {
            throw error
            return false
        }
    }

    public async isDirectory(): Promise<boolean> {
        try {
            if (!(await this.doesExist())) { return false }
            const stat = await this.stat()
            return stat.isDirectory()
        } catch (error) {
            throw error
            return false
        }
    }

    public async stat(): Promise<Stats> {
        try {
            return await stat(this.realpath)
        } catch (error) {
            // return null
            throw error
        }
    }

    public async read(): Promise<string> {
        try {
            const fileContent = await readFile(this.realpath)
            return fileContent.toString()
        } catch (error) {
            throw error
        }
    }

    public async readJSON<T = any>(): Promise<T> {
        try {
            const fileContentString = await this.read()
            const json = JSON.parse(fileContentString)
            return json as T
        } catch (error) {
            throw error
        }
    }

    public async write(data: string, options: any = {}): Promise<void> {
        try {
            await writeFile(this.realpath, data, options)
        } catch (error) {
            throw error
        }
    }

    public async writeJSON(data: any, options: any = {}): Promise<void> {
        try {
            const json = JSON.stringify(data, null, 4)
            await writeFile(this.realpath, json, options)
        } catch (error) {
            throw error
        }
    }

    public async children(type: "all" | "files" | "folders" = "all"): Promise<IPathname[]> {
        try {
            const children = await readdir(this.realpath)
            const childPaths = children.map(x => this.join(x))
            if (type === "all") {
                return childPaths
            }
            if (type === "files") {
                const filePaths = await asyncFilter(childPaths, async (p) => { return await p.isFile() })
                // const filePaths = []
                // for (const path of childPaths) {
                //     const isFile = await path.isFile()
                //     if (isFile) {
                //         filePaths.push(path)
                //     }
                // }
                return filePaths
            }
            if (type === "folders") {
                const folderPaths = await asyncFilter(childPaths, async (p) => { return await p.isDirectory() })
                // const folderPaths = []
                // for (const path of childPaths) {
                //     const isDir = await path.isDirectory()
                //     if (isDir) {
                //         folderPaths.push(path)
                //     }
                // }
                return folderPaths
            }
            return childPaths
        } catch (error) {
            throw error
        }
    }
}
