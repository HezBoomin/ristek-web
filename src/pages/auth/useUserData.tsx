import { createContext, useContext, useState } from "react";

const UserDataContext = createContext({});

export const useUserData = () => {
    const [userData, setUserData] = useState({
        username: "",
        bio: "",
    });

    return { userData, setUserData };
};

export const UserDataProvider = ({children} : {children: React.ReactNode}) => {
    const { userData, setUserData } = useUserData();

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserDataContext = () => {
    const context = useContext(UserDataContext);
    return context;
};