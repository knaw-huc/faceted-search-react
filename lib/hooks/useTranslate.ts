import {createTranslateFn, defaultTranslations, I18nContext, TranslateFn} from "../context/I18nContext.tsx";
import {useCallback, useContext} from "react";

/**
 * Hook to access the translation function in components. Falls back to returning the key if used outside provider.
 *
 * @example
 * const { t } = useTranslation();
 * return <button aria-label={t('search.button.aria')}>Search</button>;
 *
 * @example with interpolation
 * const { t } = useTranslation();
 * return <span>{t('facet.aria', { label: 'Category' })}</span>;
 */
export default function useTranslate() {
    const context = useContext(I18nContext);

    // Fallback translate function that uses defaults (for usage outside provider)
    const fallbackTranslate: TranslateFn = useCallback((key: string, options?: Record<string, unknown>) => {
        return createTranslateFn(defaultTranslations)(key, options);
    }, []);

    return {
        t: context?.translate ?? fallbackTranslate
    };
}


