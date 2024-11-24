// ./src/hooks/usePasswordToggler.ts
import { useState } from 'react';


type Toggle = {
    type: string;
    passwordVisibility: boolean;
    handlePasswordVisibility: () => void;
};

export const usePasswordToggler = (): Toggle => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
    const [type, setType] = useState<string>('password');

    const handlePasswordVisibility = () => {
        setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
        setPasswordVisibility((prev) => !prev);
    };

    return {
        type,
        passwordVisibility,
        handlePasswordVisibility
    };
};
