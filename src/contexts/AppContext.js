import React from "react";

const AppContext = React.createContext(null);

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const useNamedState = (name, defaultValue) => {
    const [value, setValue] = React.useState(defaultValue);
    const setName = "set" + capitalize(name);
    
    return ({
        [name]: value,
        [setName]: setValue,
    });
};

export const useAppContextInit = () => {
    const title = useNamedState("title", "Musées")

    return {
        ...title, 
    };
};

export default AppContext;