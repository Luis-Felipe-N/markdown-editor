import { v4 as uuidV4} from 'uuid'
import { IFile } from '../types/File';

export function checkToHaveFilesLocal(): boolean {
    const files = localStorage.getItem('files')
    
    if (files!==null) {
        return true
    } else {
        return false
    }
}

function dispatchEventFilesChanged() {
    const event = new Event('storage')
    window.dispatchEvent(event)
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
        dispatchEventFilesChanged()
    }
}

export function deleteDocLocal(fileId: string) {
    const files = localStorage.getItem('files')

    if (files!==null) {
        const parseFiles: IFile[] = JSON.parse(files)
        const remaningFiles = parseFiles.filter(file => file.id !== fileId)
        localStorage.setItem('files', JSON.stringify(remaningFiles))
        dispatchEventFilesChanged()
    }
}