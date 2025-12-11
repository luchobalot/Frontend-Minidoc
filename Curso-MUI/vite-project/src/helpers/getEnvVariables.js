// src/helpers/getEnvVariables.js
export const getEnvVariables = () => {
    return {
        VITE_BFF_MINIDOC_URL: import.meta.env.VITE_BFF_MINIDOC_URL,
        ...import.meta.env 
    };
};