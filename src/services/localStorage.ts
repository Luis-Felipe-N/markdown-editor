import { useContext } from 'react';
import { v4 as uuidV4} from 'uuid'
import { FileContext } from '../context/FileContext';
import { IFile } from '../types/File';

export function checkToHaveFilesLocal(): boolean {
    const files = localStorage.getItem('files')
    
    if (files!==null) {
        return true
    } else {
        return false
    }
}

export function createDocLocal(userId: string, fileWelcome?: IFile): IFile {
    const date = new Date()

    let file: IFile;
    if (fileWelcome) {
        file = fileWelcome
    } else {
        file = {
            id: uuidV4(),
            name: 'sem_nome.md',
            created_at: date.toString(),
            content: '',
            created_by: userId
        }
    }

    const files = localStorage.getItem('files')
    
    if (files!==null) {
        const parseFiles: IFile[] = JSON.parse(files)
        const tempFiles = [...Array.from(parseFiles), file]
        localStorage.setItem('files', JSON.stringify(tempFiles))
    } else {
        const files: IFile[] = []
        files.push(file)
        localStorage.setItem('files', JSON.stringify(files))
    }

    return file
}

export function getAllFilesLocal(setFiles: any) {
    const files = localStorage.getItem('files')

    if (files!==null) {
        const parseFiles: IFile[] = JSON.parse(files)
        setFiles(parseFiles)
    }

    console.log('chamou')
}


interface ISaveDocChangesLocal {
    fileId: string,
    file: IFile,
}

export function saveDocChangesLocal({fileId, file}: ISaveDocChangesLocal){
    const files = localStorage.getItem('files')

    if (files!==null) {
        const parseFiles: IFile[] = JSON.parse(files)
        const changedFiles = parseFiles.map((fileM) => fileM.id === fileId ? file : fileM)
        localStorage.setItem('files', JSON.stringify(changedFiles))
        const event = new Event('storage')
        window.dispatchEvent(event)
    }
}

export function deleteDocLocal(fileId: string) {
    const files = localStorage.getItem('files')

    if (files!==null) {
        const parseFiles: IFile[] = JSON.parse(files)
        const fileIndex = parseFiles.findIndex(file => file.id === fileId)
        parseFiles.slice(fileIndex)
        console.log(parseFiles)
        localStorage.setItem('files', JSON.stringify(parseFiles))
    }
}