import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAllFiles, saveDocChanges, deleteDoc, createDoc } from "../services/firebase";
import { createDocLocal, deleteDocLocal, getAllFilesLocal, saveDocChangesLocal } from "../services/localStorage";
import { IFile } from "../types/File";
import { AuthContext } from "./AuthContext";

const welcomeFile: IFile = {
    content: `# Welcome to Markdown
Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

## How to use this?

1. Write markdown in the markdown editor window
2. See the rendered markdown in the preview window

### Features

- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
- Name and save the document to access again later
- Choose between Light or Dark mode depending on your preference


> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

#### Headings

To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.

##### Lists

You can see examples of ordered and unordered lists above.

###### Code Blocks
    `,
    name: 'welcome.md',
    created_at: new Date(),
    id: '',
    created_by: ''
}

interface IFileContextProviderProps {
    children?: ReactNode | undefined;
}

interface IFileContext {
    file: IFile,
    files: IFile[],
    setFiles:  React.Dispatch<React.SetStateAction<IFile[]>>,
    setNewFile: (fileId: string | undefined) => void,
    createNewDoc: () => void;
    saveChange: (fileId: string) => void,
    changeContentFile: (prop: any) => void,
    deleteCurrentDoc: (fileId: string) => void,
}

export const FileContext = createContext({} as IFileContext)

export function FileContextProvider(props: IFileContextProviderProps) {
    const [ file, setFile ] = useState<IFile>(welcomeFile)
    const [ files, setFiles ] = useState<IFile[]>([])

    const { user } = useContext(AuthContext)

    useEffect(() => { 
        if (user) {
            const userId = user.uid

            if (!user.isUserLocal) {
                getAllFiles(userId, setFiles) 
            } else {
                getAllFilesLocal(setFiles)
                window.addEventListener('storage', () => getAllFilesLocal(setFiles))
            }
            
        } else {
            setFiles([file])
        }
    }, [user])

    function changeContentFile(prop: any) {
        setFile(file => {
            return {...file, ...prop}
        })
    }
    
    function setNewFile(fileId: string | undefined) {
        if (fileId) {
            const fileFilted = files.filter(file => file.id === fileId)[0]
            setFile(fileFilted)
        } else {
            if(!user?.uid) {
                setFile(welcomeFile)
            }
        }
    }

    function createNewDoc() {
        if( user ) {
        if (!user.isUserLocal) {    
            createDoc(user.uid)
            
        } else {
            const event = new Event('storage')
            createDocLocal(user.uid)
            window.dispatchEvent(event)
        }
        }
    }

    function saveChange(fileId: string) {
        if (user) {
            const userId = user.uid 
            if (!user.isUserLocal) {
                saveDocChanges({file, fileId, userId})
            } else {
                console.log('salvando no local storage')
                saveDocChangesLocal({fileId, file})
            }
        }
    }

    function deleteCurrentDoc(fileId: string) {
        if (user) {
            if (!user.isUserLocal) {
                deleteDoc(fileId, user.uid)
            } else {
                console.log('deletando do local')
                deleteDocLocal(fileId)
            }
        }
    }

    return (
        <FileContext.Provider value={
            {
                file, 
                files, 
                setFiles, 
                setNewFile,
                createNewDoc,
                saveChange, 
                deleteCurrentDoc, 
                changeContentFile}
        }>
            {props.children}
        </FileContext.Provider>
    )
}