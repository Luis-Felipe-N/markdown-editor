import { v4 as uuidV4} from 'uuid'

interface IFile {
    name: string,
    content: string,
    created_at: string,
    id: string,
    create_by: string

}

export function createDocLocal(userId: string): void {
    const date = new Date()
    const file: IFile = {
        id: uuidV4(),
        name: 'sem_nome',
        created_at: date.toString(),
        content: '',
        create_by: userId
    }

    const files = localStorage.getItem('files')
    
    if (files!==null) {
        const parseFile: IFile[] = JSON.parse(files)
        const tempFiles = [...Array.from(parseFile), file]
        localStorage.setItem('files', JSON.stringify(tempFiles))
    } else {
        const files: IFile[] = []
        files.push(file)
        localStorage.setItem('files', JSON.stringify(files))
    }
}

export function getAllFiles(userId: string, setFiles: any) {
    const files = localStorage.getItem('files')
}

interface ISaveDocChanges {
    fileId: string,
    userId: string,
    file: IFile
}

// export function saveDocChanges({file, fileId, userId}: ISaveDocChanges) {
//     console.log(file)
//     const filesRef = ref(db, userId + '/files/' + fileId)
//     update(filesRef, file)
// }

// user
function getDocByUser() {
    
}

export {}