import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAllFiles, saveDocChanges } from "../services/firebase";
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
    id: ''
}

interface IFileContextProviderProps {
    children?: ReactNode | undefined;
}

interface IFile {
    name: string,
    content: string,
    created_at: Date,
    id: string
}

interface IFileContext {
    file: IFile,
    files: IFile[],
    setNewFile: (fileId: string | undefined) => void,
    saveChange: (fileId: string) => void 
    changeContentFile: (prop: any) => void,
}

export const FileContext = createContext({} as IFileContext)

export function FileContextProvider(props: IFileContextProviderProps) {
    const [ file, setFile ] = useState<IFile>(welcomeFile)
    const [ files, setFiles ] = useState<IFile[]>([])

    const { user, signIn } = useContext(AuthContext)

    useEffect(() => { 
        if (user) {
            const userId = user.uid 
            getAllFiles(userId, setFiles) 
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
        } else if(files.length > 1 ){
            const fisrtFile: IFile = files[0]
            setFile(fisrtFile)

        } else {
            setFile(welcomeFile)
        }
    }

    function saveChange(fileId: string) {
        console.log('salvando')
        if (user) {
            const userId = user.uid 
            saveDocChanges({file, fileId, userId})
        } else {
            signIn()
        }
    }

    return (
        <FileContext.Provider value={{file, files, setNewFile, saveChange, changeContentFile}}>
            {props.children}
        </FileContext.Provider>
    )
}