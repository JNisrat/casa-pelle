export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  featured?: boolean;
  description?: string;
  material?: string;
  dimensions?: string;
  lining?: string;
};

export type Advantage = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type Review = {
  id: string;
  name: string;
  title: string;
  date: string;
  quote: string;
  image: string;
};

export type ButtonVariant = "primary" | "outlined" | "send";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

export type CheckoutDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  notes: string;
};
