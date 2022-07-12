export interface IPathname {
    isAbsolute: boolean
    doesExist: boolean
    isFile: boolean
    isFolder: boolean
}

export class Pathname {
    private _input: any

    constructor(input: any) {
        this._input = input
    }
}