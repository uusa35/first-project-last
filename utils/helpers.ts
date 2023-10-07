
export const convertSearchParamsToString = (search: { [key: string]: string }): string => {
    if (typeof search === 'object' &&
        !Array.isArray(search) &&
        search !== null) {
        return Object.keys(search)
            .map((key) => {
                return `${key}=${encodeURIComponent(search[key])}`;
            })
            .join("&");
    }
    return ``;


}


export const changePathName = (current: string, newLang: string, pathName: string): string => {
    var segements = pathName.split(`/${current}/`);
    segements[0] = "" + newLang;
    var newurl = segements.join("/");
    return `/${newurl.toString()}`;

}