import useSearchContext from "hooks/useSearchContext.ts";
import {TranslateFn} from "store/FacetedSearchStore.ts";

export default function useTranslate(): TranslateFn {
    return useSearchContext((s) => s.translateFn);
}
