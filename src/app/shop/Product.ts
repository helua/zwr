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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiQUdQa1ppcW12TiIsImNsaWVudF9pZCI6ImJfemV3Ui1SbWdhb05NcjNrSHctMW5KLTFudXNOLU1tQ3BGSFdVUGFadE0iLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3NDEzNTkyMjAsInRlc3QiOmZhbHNlLCJyYW5kIjowLjkzODE1ODgwMTQ1MDIwMywiaWF0IjoxNzQwNzU0NDIwLCJpc3MiOiJodHRwczovL2F1dGguY29tbWVyY2VsYXllci5pbyJ9.Tkj7lZYiiYqb95cgzM2pVmQlU2npw2Lrr63Rnr58RFtJ5rt_e7AHqOlFaBzj-Yt0NR-AHhI5a-VGySbqrQj98UH3yXcU1bYEOt8B7JbS0wP1vEeNf_kOdVhiYERLoR8JATFR7_opTx0EP2X_4J2Pgk5erDLMfchabGZx2Dru5aB9dNg5JktFr25CYm-pwn-ViOmaSxgEBjY_E-Uzh75DLN0MwgtSe3a5KMe7wBPO1cg0qQHst3LmMV8T77HrUIJU3dVfcUC6GnI6EXgPku_2RdvBTSaDFP8ulHRVlJPMYY1DDGzVwN0_5WxDocv9Or7GkIWkt9j1l-SnZJjtYrdeZwfQVAIAqoatDOL_0UhpIwOcdSF_DYVtoPrBCkDjwTewQZkj1WaV8adFhgH-o5euXTKte_1Oq7cm312CMcUZRUZgrW--ntjFvIxnQMnAPxeva2ZVFa8Z4YnlDmGmUWb2-fL0syKiYXXtn15Eras3Sy6MgCRuh22LQ4umv2de0wtGgNCknmV8cuiBtXTtEclWwvaa1BAO-q_Y1SC3dM6sClPHT3kPj_T89bMdaGYH4qDdtzVA5rjy4MZQnYzj1Iqe06ceDP0THg6AzuCTy8vGy5SEqiyxq976PdyqYTo2YNn8i00F6jE8_qirUWpsnzxeqquCtfOiV8BH2jXGDOHUk5o"
}//temp static token
