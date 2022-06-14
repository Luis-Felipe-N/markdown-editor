// Nome, data de criação, usuário que quer criar
import { v4 as uuidV4 }  from 'uuid'
import { onValue, push, ref, set, update } from "firebase/database"
import { db } from "../libs/firebase"


interface iCreateDoc {
    userId: string,
}

interface IFile {
    name: string,
    content: string,
    created_at: Date,
    id: string
}

export function createDoc(userId: string): void {

    const fileId = uuidV4()
    const data = new Date()

    const docListref = ref(db, userId + '/files')
    const docFilesRef = push(docListref)
    set(docFilesRef, {
        name: 'sem_nome',
        upload_at: data,
        content: '',
        create_by: userId
    })
}

export function getAllFiles(userId: string, setFiles: any) {

    const filesRef = ref(db, userId + '/files')

    onValue(filesRef, (snapshot) => {
        const data: IFile = snapshot.val()
        
        const files = Object.entries(
            data || {}).map( ([key, { name, created_at, content } ]) => {
                return {
                        id: key,
                        name,
                        created_at,
                        content
                }
            }
        )

        console.log(files)

        setFiles(files)
    })
}

interface ISaveDocChanges {
    fileId: string,
    userId: string,
    file: IFile
}

export function saveDocChanges({file, fileId, userId}: ISaveDocChanges) {
    const filesRef = ref(db, userId + '/files/' + fileId)
    update(filesRef, file)
}

// user
function getDocByUser() {
    
}

export {}