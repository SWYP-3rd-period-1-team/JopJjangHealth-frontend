/*
import queryString from "query-string";

export const toParams = (q: any) => (q ? queryString.stringify(q) : "");
export const infiniteKeyGenerator = (apiUrl, PER, locale = null) => (
    index,
    previousPageData
) => {
    if (previousPageData && !previousPageData.items.length) return null;
    if (locale) return `${apiUrl}?per=${PER}&page=${index + 1}&locale=${locale}`;
    return `${apiUrl}?per=${PER}&page=${index + 1}`;
};

export const infiniteKeyGeneratorWithParam = (apiUrl, query) => (
    index,
    previousPageData
) => {
    if (previousPageData && !previousPageData.items.length) return null;
    return `${apiUrl}?${toParams({
        ...query,
        page: index + 1,
    })}`;
};
*/

