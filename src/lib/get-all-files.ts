import { join } from "path"
import { readdirSync, statSync } from "fs"

/**
 * Recursively list files in a folder.
 */
export const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
    const files = readdirSync(dirPath)

    files.forEach((file) => {
        if (statSync(join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(join(dirPath, file), arrayOfFiles)
        } else {
            arrayOfFiles.push(join(dirPath, file))
        }
    })

    return arrayOfFiles
}
