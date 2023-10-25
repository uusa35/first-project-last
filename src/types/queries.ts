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
    caption: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
    [key: string]: any;
}

export type Post = {
    id: number;
    name: string;
    description: string;
    categories: Category[];
    [key: string]: any;
}

export type Country = {
    id: number;
    name: any;
    exchange_rate: number;
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

export type Auth = {
    id: number | string;
    name: string;
    caption: string;
    email: string;
    image: string;
    hasValidDeal: false;
    api_token: string | undefined;
    role: Role,
    deals: Deal[];
    [key: string]: any;
}
export type Role = {
    id: string;
    name: 'visitor' | 'company';
}

export type Deal = {
    id: number;
    order_id: number;
    user_id: number;
    membership_id: number;
    active: number;
    order: Order
}
export type Membership = {
    id: number;
    name: any;
    description: any;
    price: number;
    sale_price: number;
    on_sale: boolean;
    sort: 'subscription' | 'sponsorship';
    zone: 'A' | 'B' | 'C' | 'D' | 'E';
    [key: string]: any;
}

export type PaymentFields = {
    token: string;
    messageId: 1;
    transactionId: string;
    merchantId: string;
    amount: number | string;
    currencyCode: '682' | '840' | '643';
    redirectUrl: string;
    queryString: string | null;
    paymentUrl: string;
}

export type Order = {
    id?: string;
    status: 'pending' | 'paid' | 'failed';
    paid: boolean;
    total: number;
    net_total: number;
    discount: number;
    reference_id: string | number;
    membership_id: string | number;
    user_id?: string | number;
    created_at?: string;
    user?: Auth;
    membership: Membership;
    [key: string]: any;
}