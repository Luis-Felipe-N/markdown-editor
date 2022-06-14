import { GoogleAuthProvider, OAuthCredential } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, provider, signInWithPopup } from '../libs/firebase'

type User = {
  uid: string,
  email: string | null,
  avatar: string | null,
  name: string | null
};

interface IAuthContextProviderProps {
  children?: ReactNode | undefined;
};

interface IAuthContextType {
  user: User | undefined;
  signIn: () => void;
  // signUp: () => void;
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
            name: snapUser.displayName
        }
        setUser(tempUser)
      }
    })
  }, [])

  async function signIn() {
    const result = await signInWithPopup(auth, provider)

    
    const credential = GoogleAuthProvider.credentialFromResult(result)
    
    const tempUser: User = {
      uid: result.user.uid,
      email: result.user.email,
      avatar: result.user.photoURL,
      name: result.user.displayName
    }
    setUser(tempUser)

    // signInWithPopup(auth, provider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
    //   // const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    //   console.log(errorMessage)
    // });
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}
