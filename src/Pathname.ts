import {
    isAbsolute,
    resolve,
} from "path"
import {
    access,
    mkdir,
    readFile,
    writeFile,
    stat,
} from "fs/promises"
import {
    constants as fsConstants,
    Stats,
} from "fs"

import { IPathname } from "pathname-js"

/**
 * - https://ruby-doc.org/stdlib-2.7.0/libdoc/pathname/rdoc/Pathname.html
 * - https://github.com/ruby/pathname/blob/master/lib/pathname.rb
 */
export class Pathname implements IPathname {

    public path: string

    constructor(input: any) {
        this.path = input
    }

    public toString(): string { return this.absolutePath() }

    public isAbsolute(): boolean { return isAbsolute(this.path) }

    public absolutePath(): string {
        if (this.isAbsolute()) {
            return this.path
        } else {
            return resolve(process.cwd(), this.path)
        }
    }

    public async doesExist(): Promise<boolean> {
        try {
            const _ = await access(this.absolutePath(), fsConstants.F_OK)
            return true
        } catch (error) {
            return false
        }
    }

    public async isFile(): Promise<boolean> {
        try {
            if (!(await this.doesExist())) { return false }
            const stat = await this.stat()
            return stat.isFile()
        } catch (error) {
            return false
        }
    }

    public async isDirectory(): Promise<boolean> {
        try {
            if (!(await this.doesExist())) { return false }
            const stat = await this.stat()
            return stat.isDirectory()
        } catch (error) {
            return false
        }
    }

    public async stat(): Promise<Stats> {
        try {
            return await stat(this.absolutePath())
        } catch (error) {
            return null
        }
    }

    public async read(): Promise<string> {
        try {
            const isFile = await this.isFile()
            if (!isFile) {
                throw "path does not point to a file"
            }
            const fileContent = await readFile(this.absolutePath())
            return fileContent.toString()
        } catch (error) {
            // return null
            throw error
        }
    }
}
