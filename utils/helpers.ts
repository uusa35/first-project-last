export const convertSearchParamsToString = (search: { [key: string]: string }): string => Object.keys(search)
    .map((key) => {
        return `${key}=${encodeURIComponent(search[key])}`;
    })
    .join("&");


export const changePathName = (current: string, newLang: string, pathName: string): string => {
    var segements = pathName.split(`/${current}/`);
    segements[0] = "" + newLang;
    var newurl = segements.join("/");
    return `/${newurl.toString()}`;

}