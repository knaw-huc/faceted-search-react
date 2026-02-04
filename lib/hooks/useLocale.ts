import {useContext} from "react";
import {I18nContext} from "context/I18nContext.tsx";

export default function useLocale() {
    const context = useContext(I18nContext);
    return context?.locale ?? new Intl.Locale('en');
}