import { useEffect } from 'react';
import { APP_NAME } from '../constants/themeConstants';

export const useDocumentTitle = (title?: string) => {
    useEffect(() => {
        document.title = title ? `${title} - ${APP_NAME}` : APP_NAME;
    }, [title]);
};
