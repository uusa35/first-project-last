import { Tajawal } from "next/font/google";

export const tajawal = Tajawal({
    weight: "400",
    subsets: ["latin"],
    // display: "swap",
});
export const convertSearchParamsToString = (search: { [key: string]: string } | string): string => {
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