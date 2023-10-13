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
    id: number;
    name_ar: string;
    name_en: string;
    image: string;
    items?: Product[];
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


