import { createContext, ReactNode, useEffect, useState } from "react";
import { v4 as uuidV4 } from 'uuid'

import { GoogleAuthProvider } from "firebase/auth";
import { auth, provider, signInWithPopup } from '../libs/firebase'

type User = {
  uid: string,
  email: string | null,
  avatar: string | null,
  name: string | null,
  isUserLocal: boolean;
};

interface IAuthContextProviderProps {
  children?: ReactNode | undefined;
};

interface IAuthContextType {
  user: User | undefined;
  signIn: () => void;
  createUserLocal: (username: string, avatar: string | null) => void
};


export const AuthContext = createContext({} as IAuthContextType);

export function AuthContextProvider(props: IAuthContextProviderProps) {
  const [ user, setUser ] = useState<User>();

  useEffect(() => {
    auth.onAuthStateChanged((snapUser) => {
      if (snapUser){
        const tempUser: User = {
            uid: snapUser.uid,
            email: snapUser.email,
            avatar: snapUser.photoURL,
            name: snapUser.displayName,
            isUserLocal: false
        }
        setUser(tempUser)
      }
      else {
        // Verificar se tem no storage
        const tempUser = localStorage.getItem('user')

        if ( tempUser ) {
          const parseUser = JSON.parse(tempUser)
          setUser(parseUser)
        }
      }
    })
  }, [])

  async function signIn() {
    const result = await signInWithPopup(auth, provider)
    
    const tempUser: User = {
      uid: result.user.uid,
      email: result.user.email,
      avatar: result.user.photoURL,
      name: result.user.displayName,
      isUserLocal: false
    }
    setUser(tempUser)
  }

  function createUserLocal(username: string, avatar: string | null) {
    const tempUser: User = {
      name: username,
      avatar: avatar,
      uid: uuidV4(),
      email: null,
      isUserLocal: true
    }

    // Amarzenar no storage

    localStorage.setItem('user', JSON.stringify(tempUser))

    setUser(tempUser)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, createUserLocal }}>
      {props.children}
    </AuthContext.Provider>
  );
}
