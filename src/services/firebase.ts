// Nome, data de criação, usuário que quer criar
import { v4 as uuidV4 }  from 'uuid'
import { onValue, push, ref, set, update, remove } from "firebase/database"
import { db } from "../libs/firebase"
import { IFile } from '../types/File';

interface ISaveDocChanges {
    fileId: string,
    userId: string,
    file: IFile
}

export function createDoc(userId: string): IFile {
    let date = new Date()
    const fileId = uuidV4()
    const docListref = ref(db, userId + '/files/' + fileId  )
    
    const file = {
        name: 'sem_nome.md',
        created_at: date.toString(),
        content: '',
        created_by: userId,
        id: fileId
    }

    set(docListref, file)

    return file
}

export function getAllFiles(userId: string, setFiles: any) {

    const filesRef = ref(db, userId + '/files')

    onValue(filesRef, (snapshot) => {
        const data: IFile[] = snapshot.val()
        
        const files = Object.entries(
            data || {}).map( ([key, { name, created_at, content, created_by } ]) => {
                return {
                        id: key,
                        name,
                        created_at,
                        content,
                        created_by
                }
            }
        )

        files.sort(function(old, current) {
            const oldDate = old.created_at.toString()
            const currentDate = current.created_at.toString()

            return Date.parse(oldDate) - Date.parse(currentDate)
        })

        setFiles(files)
    })
}

export function saveDocChanges({file, fileId, userId}: ISaveDocChanges) {
    const filesRef = ref(db, userId + '/files/' + fileId)
    update(filesRef, file)
}

export function deleteDoc(fileId: string, userId: string): void {
    const docRef = ref(db, userId + '/files/' + fileId)
    remove(docRef).then(() => {
        console.log('doc deletado')
    })
}
