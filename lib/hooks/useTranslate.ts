import {useContext} from 'react';
import {I18nContext, TranslateFn} from '../context/I18nContext';

export default function useTranslate(): TranslateFn {
    const translate = useContext(I18nContext);
    if (!translate) {
        return (key: string) => key;
    }
    return translate;
}
