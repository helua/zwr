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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTU92WWlSQm9MRyIsImNsaWVudF9pZCI6InVIUlh4Rk5tVGxhQTM5aGFSNjVUbGlTS25TdlF2WDZWckQ1SkdzVklHaGsiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3NDQyMDM3NTUsInRlc3QiOmZhbHNlLCJyYW5kIjowLjg2OTAxNzAxNjUyMzk0MDQsImlhdCI6MTc0MjkwNzc1NSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvbW1lcmNlbGF5ZXIuaW8ifQ.o2LpXByj7JjFSxE_4mC_p8gYXDniy8phMkshIyutx3SmRjbKhVuft4omOZjjNLdEPqa-ko4uy4kalrP_J0VmEKqkObYrvvBe6ucBOnt7ZTh2WyD3jPf4CU-z1o1L_5pKj0ZyC7qo5mXlh6IFiVfGffDse16-ka1VxJPFTX6IJWjUH0CN-3R8uC3gwEFYTzKvfK4L4Cup4t-XuW3_FKc1HTHzjIffdVcHE_ZkutiNXGVZHgN3Z0pj_9q_3Z-PlQF3kDM1-GYZl8UO2mSXjt8RBBW5v0kBT1R6uv10YY-puVfp59yuOj4ked0RUYMbBQaxzhWdvcf5UH_AHV-7iOWQciXqToZMzSnD1wK8-6MPTOW-MgC-rhgksbHReKPFGxj6_8w30lGunPVUM1nCGbSrPzDMl-GgUGm70SYNVWsWkeQbnDdd-w9gL8buxUFTXWtiGrQ4RPjMABp4UYx13EHgE6z8wzCu9givWHIOCIZlpPD210MHV0RlFDExXIP_hWGo2fNVWv3e1t06ZXdW6uKgdQ005FQRZuhCVI5xXpc85mzxsVBm8CjCM73uyGY_ouQ_9WsOy66uY-vAgos_y94lhtw1747uX40S3SL-fZQHjjWLQpBrNcNOVUlOaIxS-yuJ_VFkxjYaPoFk364zIj2D_t2D5QOCe7toZWptXTDgK8E"
}//temp static token
