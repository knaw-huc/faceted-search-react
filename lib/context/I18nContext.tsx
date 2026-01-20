import {Context, createContext, ReactNode, useCallback} from 'react';

/**
 * Translation function type - compatible with most i18n libraries
 * @param key - The translation key
 * @param options - Optional interpolation values (e.g., {count: 5, label: 'Items'})
 */
export type TranslateFn = (key: string, options?: Record<string, unknown>) => string;

/**
 * Default English translations for all library strings
 */
export const defaultTranslations: Record<string, string> = {
    // SearchFacet
    'search.label': 'Search for text',
    'search.button.aria': 'Search',

    // FilterFacet
    'filter.label': 'Filter on facet items',
    'filter.placeholder': 'Type to filter',
    'filter.sort.asc': 'Order from A to Z',
    'filter.sort.desc': 'Order from Z to A',
    'filter.sort.hits': 'Order by the amount of results',
    'filter.amount.aria': 'Amount of results',
    'filter.showAll': 'All items',

    // Facet
    'facet.aria': 'Facet for {{label}}',
    'facet.info.aria': 'Click for a description about the facet',
    'facet.toggle.open': 'Click to open the facet',
    'facet.toggle.close': 'Click to close the facet',
    'facet.skip': 'Skip {{label}} and go to next facet',

    // FacetsSection
    'facets.toggle': 'Search filters',

    // Pagination
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',

    // SelectedFacets
    'selected.aria': 'Selected filters',
    'selected.label': 'Selected filters:',
    'selected.remove.aria': 'Click to remove from search filters',
    'selected.clear': 'Clear filters',

    // RangeFacet
    'range.min': 'Min',
    'range.max': 'Max',

    // ResultCardSubResults
    'results.seeMore': 'See {{count}} more reactions',
};

/**
 * Type for translation keys - provides autocomplete
 */
export type TranslationKey = keyof typeof defaultTranslations;

interface I18nContextValue {
    translate: TranslateFn;
}

interface I18nProviderProps {
    /**
     * Custom translate function from your i18n library (react-intl, i18next, etc.)
     * If provided, this takes precedence over the translations prop
     */
    translate?: TranslateFn;
    /**
     * Partial translations object to override specific keys
     * Will be merged with default English translations
     */
    translations?: Partial<Record<string, string>>;
    children: ReactNode;
}

export const I18nContext: Context<I18nContextValue | undefined> = createContext<I18nContextValue | undefined>(undefined);

/**
 * Simple interpolation function for {{key}} placeholders
 */
function interpolate(template: string, values?: Record<string, unknown>): string {
    if (!values) return template;
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        const value = values[key];
        return value !== undefined ? String(value) : `{{${key}}}`;
    });
}

/**
 * Creates a translate function that uses merged translations
 */
export function createTranslateFn(translations: Record<string, string>): TranslateFn {
    return (key: string, options?: Record<string, unknown>) => {
        const template = translations[key] ?? key;
        return interpolate(template, options);
    };
}

export function I18nProvider({translate, translations, children}: I18nProviderProps) {
    // Merge default translations with custom ones (custom values override defaults)
    const mergedTranslations: Record<string, string> = {
        ...defaultTranslations,
        ...Object.fromEntries(
            Object.entries(translations ?? {}).filter((entry): entry is [string, string] => entry[1] !== undefined)
        )
    };

    // Use custom translate function if provided, otherwise use merged translations
    const translateFn = useCallback(
        (key: string, options?: Record<string, unknown>) => {
            if (translate) {
                return translate(key, options);
            }
            return createTranslateFn(mergedTranslations)(key, options);
        },
        [translate, mergedTranslations]
    );

    return (
        <I18nContext.Provider value={{translate: translateFn}}>
            {children}
        </I18nContext.Provider>
    );
}

