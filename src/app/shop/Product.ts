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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTU92WWlSQm9MRyIsImNsaWVudF9pZCI6InVIUlh4Rk5tVGxhQTM5aGFSNjVUbGlTS25TdlF2WDZWckQ1SkdzVklHaGsiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3NDI1NTYxNjksInRlc3QiOmZhbHNlLCJyYW5kIjowLjM2NzgyNDI4NDc1NTg4MTE0LCJpYXQiOjE3NDEyNjAxNjksImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.kBXZ8OImVwx4nee1CAxGez02J412AA4B630AiDACqb9CYRFREK3VfHmn_Tvv4m0Y_cQ5SqxZ7nD17kvZgrqWQCjvRgPCruqTNiMNuyqUOkXnD-FTGNBbBBdnsz3GmylMYMPe_Opi7UDM4ZEtodPEJ8TjPiAZNV0HwctT20wSKKrpQo1nKjNcu6BbK-9BsUEaDWVteRo8lk8qJYT2dGQAPXJgjY-oH9uFNHrWOGgu8MFkcnpi3pk3V_13zSX-0LsLV3DCI01XZBdkjjgQ7f9WzldHwzh4oFLQH87eWbBcapMS4B00PkpJsQ9NytfDqq1_XPGZzSvv0MQC_7z5-WY9BX_Upn22ANqcXgccCC-Caviv5947gkVz_A6AbC_mROmh6b6j366beb3V-u2sa20NZq9U6TnnuimcOkNU8xjXIhg_fxcsOpQfYLrey38QuTiRGRE-KLCqvQhl7241mImOyM_6BhM2XwxZlhdECbyKX6tSrdZutoqQap9KHcPb1bSECg6uyxw0hrfghjNdqUl0AmbmqgeWM4YsgEpaNXMKEvZvze7ZkZ_unlNobGjjbmLePWHsHo6kQBlTjbmYl1M78mrSTrQOMrRn3UVG9MBNMGtF8Ei_IpNObB5lpNF0aqSM_8EfkX7skgkD19lEA1-XXbjxoMV6Wy-rJBWdaQCDMPE"
}//temp static token
