import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(
        localStorage.getItem("ACCESS_TOKEN")
    );

    const setUserToken = (userToken) => {
        _setUserToken(userToken);
        if (userToken) {
            localStorage.setItem("ACCESS_TOKEN", userToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                currentUser,
                userToken,
                setCurrentUser,
                setUserToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const UseStateContext = () => useContext(StateContext);
