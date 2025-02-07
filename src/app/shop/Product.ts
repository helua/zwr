export interface Image {
  indexOf: number;
  source: string;
}

export interface Product {
  title?: string;
  slug?: string;
  categories?: string[];
  statuses?: string[];
  vendor?: string;
  body?: string;
  images?: string[];
  sku?: string;
  width?: number;
  length?: number;
  height?: number;
  widthUnfold?: number;
  lengthUnfold?: number;
  heightUnfold?: number;
  color?: string;
  price?: string;
  stock?: number;
  capacity?: number;
  priority?: number;
  bedTypes?: string[];
  standard?: string;
  privateBathroom?: string;
  address?: string;
}

export interface CartData {
  ord: any;
  cart: any;
}

export const token = { 
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTU92WWlSQm9MRyIsImNsaWVudF9pZCI6InVIUlh4Rk5tVGxhQTM5aGFSNjVUbGlTS25TdlF2WDZWckQ1SkdzVklHaGsiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIiwiRGtnZXB1WG9vbiJdLCJnZW9jb2Rlcl9pZCI6bnVsbCwiYWxsb3dzX2V4dGVybmFsX3ByaWNlcyI6ZmFsc2V9LCJzY29wZSI6Im1hcmtldDppZDpWZ1dYT2hNUXFsIiwiZXhwIjoxNzM5NTQzMzc0LCJ0ZXN0IjpmYWxzZSwicmFuZCI6MC45Nzk0MzYxMTQxMjQyMzE2LCJpYXQiOjE3Mzg5Mzg1NzQsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.E3q_nzTugzP_I8rTEd_UzTu5KLL7pHuGTZG3v_-aFXB2I3wZ01DXRx8VR1j-xRvl5ob_PnziWBcIG6RdBw1JhgxFprAjnNk33_A3dyB7YGKDxT9alBYlFwh2GUo3zZghm5PsaHJu8b9fGn0XIJY0_hLt9Rh3PCgZizDidmZujte7B1BhvyVjlAIqA7sWXpUwNzhB6NLccNyPSEAKr-5Zc68468YJKwDZOzCAtrD3Ro_xNT03ooVsnGnA1dn7oagfMh1fjH-5f8PjTmTdAb3dm4aROP9N9qGXJdr-pX6y8gVcjwmJfvCp5JR4G8IhpVpJDovTmah-rvx-CFrO1eo_MPsgex2Lvfv1gd6qSrIZHJcJ-1dv3hB34Nu18goDKKA232vEjt6RdzcWbPh7wAx5Q1bPO4CUA63JxDaUAKvLEC7F_oHIyslNlmYBYcsQU63e76RUbHGlMMGoRsxJGZ3hZY67-cdpd6-FggmpVlcjinTnfREgKjCopaErql6LKXXrc4MkAVWQaLUAA1_uJ5im52BxRU9ZB6FC7Ygg825Iz78E3bZ_7QIWNhKTQOEKZLeNtnQ-DLelvB2mIPIooK6a4uJFcpQWA3UN6-x--BYL71sfc0usfy8Hw4F48nDqvG02cAHaa8djG8BxfOVV_6sebID6nUXWNq5Wpmqijs0ZBoY"
}//temp static token
