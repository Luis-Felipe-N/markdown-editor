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
    fileId: string;
    ChangedFile: IFile;
}

export function saveDocChangesLocal({fileId, ChangedFile}: ISaveDocChangesLocal){
    const files = localStorage.getItem('files')

    if (files!==null) {
        const parseFiles: IFile[] = JSON.parse(files)
        parseFiles.map((file) => {
            if (file.id = fileId) {
                return ChangedFile
            }
        })

        localStorage.setItem('files', JSON.stringify(parseFiles))
    }
}

