export type ElementPagination<T> = {
  current_page: string;
  next_page: string;
  per_page: string;
  prev_page: string;
  products: T[];
  total: string;
};


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
  meta: any;
};


export type Country = {
  id: number;
  name: any;
  exchange_rate: number;
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
export type Role = {
  id: string;
  name: "visitor" | "company";
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
