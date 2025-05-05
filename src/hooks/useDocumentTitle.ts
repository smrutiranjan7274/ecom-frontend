import { useEffect } from 'react';

const APP_NAME = 'E-Commerce Store';

export const useDocumentTitle = (title?: string) => {
    useEffect(() => {
        document.title = title ? `${title} - ${APP_NAME}` : APP_NAME;
    }, [title]);
};
