export const convertSearchParamsToString = (search: { [key: string]: string }): string => Object.keys(search)
    .map((key) => {
        return `${key}=${encodeURIComponent(search[key])}`;
    })
    .join("&");