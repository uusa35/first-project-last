export type ElementPagination<T> = {
  data: T;
  status: number;
  success: boolean;
  pagination: {
    meta: {
      page: {
        current: number;
        first: number;
        last: number;
        next: string;
        previous: string;
        per: number;
        from: number;
        to: number;
        count: number;
        total: number;
        isFirst: boolean;
        isLast: boolean;
        isNext: boolean;
        isPrevious: boolean;
      }
    },
    links: { path: string; first: string; next: string; previous: string; last: string }
  }
};


export type Product = {
  id: number;
  name: string;
  name_en: string;
  description: string;
  favorite: string;
  price: string;
  new_price: string;
  percentage: string;
  logo: string;
  image: string;
  vendor_id: number;
  stock: number;
};

export type Category = {
  id: string;
  name: string;
  caption: string;
  image: string;
  [key: string]: string;
};

export type AppQueryResult<T> = {
  data: T;
  status: number;
  success: boolean;

};


export type Country = {
  id: number;
  name: string;
  name_en: string;
  code: string;
  [key: string]: any;
};

export type Area = {
  id: number;
  name: any;
  name_en: any;
  [key: string]: any;
};

export type User = {
  id: number;
  name: any;
  description: any;
  aboutus: any;
  services: any;
  address: string;
  country_id: string;
  country: Country;
  images?: ImageType[];
  [key: string]: any;
};

export type Auth = {
  id: number;
  name: string;
  caption: string;
  email: string;
  image: string;
  hasValidDeal: false;
  api_token: string | null | undefined;
  [key: string]: any;
};

export type Order = {
  id?: string;
  status: "pending" | "paid" | "failed";
  paid: boolean;
  total: number;
  net_total: number;
  discount: number;
  reference_id: string | number;
  membership_id: string | number;
  user_id?: string | number;
  created_at?: string;
  user?: Auth;

  [key: string]: any;
};

export type ImageType = {
  id: number;
  name: string;
  caption: string;
  image: string;
  large: string;
  url: string;
  [key: string]: any;
};

export type Setting = {
  id: number;
  [key: string]: any;
};

export type Slide = {
  id: number,
  type: 'vendor' | 'offer';
  screen_type: 'home' | 'category';
  vendor_id: number | null;
  offer_id: number | null;
  category_id: number | null,
  image: string;
};
