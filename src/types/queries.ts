export type ElementPagination<T> = {

    current_page: string;
    next_page: string;
    per_page: string;
    prev_page: string;
    products: T[];
    total: string;
};

export interface Product {
    id: string;
    name_ar: string;
    name_en: string;
    image: string;
}
export type Category = {
    id: string;
    name: string;
    caption: string;
    image: string;
    imageLarge: string;
    [key: string]: string;
};

export type AppQueryResult<T> = {
    data: T;
    links: any;
    meta: any
};

export type Slide = {
    id: string;
    name: string;
    description: string;
    active: boolean;
    order: string;
    image: string;
    file?: string;
    url?: string;
    on_home: boolean;
    user_id?: string;
    thumb: string;
}

export type Setting = {
    id: number;
    name: string;
    description: string;
    aboutus: string;
    services: string;
    address: string;
    country: string;
    [key: string]: any;
}

export type Post = {
    id: number;
    name: string;
    description: string;
    [key: string]: any;
}

export type Country = {
    id: number;
    name: any;
    [key: string]: any;
}

export type User = {
    id: number;
    name: any;
    description: any;
    aboutus: any;
    services: any;
    address: any;
    country_id: string;
    country: Country;
    [key: string]: any;
}


