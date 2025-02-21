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
  options?: any[];
}

export interface CartData {
  ord: any;
  cart: any;
}

export const token = { 
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTU92WWlSQm9MRyIsImNsaWVudF9pZCI6InVIUlh4Rk5tVGxhQTM5aGFSNjVUbGlTS25TdlF2WDZWckQ1SkdzVklHaGsiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3NDA3NzMzNjEsInRlc3QiOmZhbHNlLCJyYW5kIjowLjA4NzA3ODMwODExNDk1ODY1LCJpYXQiOjE3NDAxNjg1NjEsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.Aw8wnqPOp95Q9N0pGFQZDlhnQpO3v7-OXQAfEcKZ6EnysDeaBkm50051AYOuhIcP9Zyc6qE0IcdvK5MK9Mtgsu3iw9RfoTtwsnKSp64ph938r6j2QHAV-lySeDGllFRZvEP-phNB3F22tn8OxxNYJpWuMst_orYPn02IIXVORhUfAqSFHStYmU2KtV8lfRQpU8-uDIIXso-pTSZEmhnprOtnoJc2L_kY0qkEK9nAGcC8vQWwNJme5Vd--NwT8y-FEXXZoDohjiBtbD7FtrhOOIhX9ADIGNpGJSymTQzk7tgCIlXVGyR5BrNzWHBzh9qDJda2M_XX6_QIdZcOttD2oNGxSnkf6idmvkuNTasCi9AGwBcBe7SgN8DFO1LW1SjP2Eeslg_u7rsWrHn95c-aIIMokZrD_dWwuRH0_xAnUEFj0MB17wa4YTLuB2GoSTLkkLou9hBedBxah1rBO6P_IxhTXjSPRH20r6JMtYMn_24gYaZkqHlOHRwGTo53ZTwZqM4D5csGr_lxkLDVSt2qch04zBqrE6M42oo3uiF5EWeHQB0orBy-EWVBuI3UlWiqDcdJ7I_W0aaIIjcxojR8774e5Q4HCeofSWy8qnZskXfZuvWCiEEzk0HBxY2iwVn5Q0NmEQQ529GbqLIf_ldxZwfYaGeuYOc-2NK5lBGjE9g"
}//temp static token
