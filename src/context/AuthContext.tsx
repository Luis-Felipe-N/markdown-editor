import { createContext, ReactNode, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { auth, provider, signInWithPopup, signOut } from "../libs/firebase";
import { createDocLocal } from "../services/localStorage";

type User = {
  uid: string;
  email: string | null;
  avatar: string | null;
  name: string | null;
  isUserLocal: boolean;
};

interface IAuthContextProviderProps {
  children?: ReactNode | undefined;
}

interface IAuthContextType {
  user: User | undefined;
  signIn: () => Promise<User | undefined>;
  createUserLocal: (username: string, avatar: string | null) => void;
  logOut: () => void;
}

export const AuthContext = createContext({} as IAuthContextType);

export function AuthContextProvider(props: IAuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    auth.onAuthStateChanged((snapUser) => {
        if (snapUser) {
            const tempUser: User = {
                uid: snapUser.uid,
                email: snapUser.email,
                avatar: snapUser.photoURL,
                name: snapUser.displayName,
                isUserLocal: false,
            };
            setUser(tempUser);
        } else {
            // Verificar se tem no storage
            const tempUser = localStorage.getItem("user");

            if (tempUser) {
                const parseUser = JSON.parse(tempUser);
                setUser(parseUser);
            } else {
                setUser(undefined);
            }
        }
    });
  }, []);

  async function signIn() {
    const result = await signInWithPopup(auth, provider);

    const tempUser: User = {
      uid: result.user.uid,
      email: result.user.email,
      avatar: result.user.photoURL,
      name: result.user.displayName,
      isUserLocal: false,
    };
    setUser(tempUser);

    return user;
  }

  function createUserLocal(username: string, avatar: string | null) {
    const tempUser: User = {
      name: username,
      avatar: avatar,
      uid: uuidV4(),
      email: null,
      isUserLocal: true,
    };

    localStorage.setItem("user", JSON.stringify(tempUser));
    setUser(tempUser);
  }

  function logOut() {
    if (user?.isUserLocal) {
      localStorage.removeItem("user");
      localStorage.removeItem("files");
      setUser(undefined);
    } else {
      signOut(auth);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, createUserLocal, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
