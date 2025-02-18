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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTU92WWlSQm9MRyIsImNsaWVudF9pZCI6InVIUlh4Rk5tVGxhQTM5aGFSNjVUbGlTS25TdlF2WDZWckQ1SkdzVklHaGsiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIiwiRGtnZXB1WG9vbiJdLCJnZW9jb2Rlcl9pZCI6bnVsbCwiYWxsb3dzX2V4dGVybmFsX3ByaWNlcyI6ZmFsc2V9LCJzY29wZSI6Im1hcmtldDppZDpWZ1dYT2hNUXFsIiwiZXhwIjoxNzQwMTUyMjIzLCJ0ZXN0IjpmYWxzZSwicmFuZCI6MC44NzM3MzUzNTk4NjUwNzA2LCJpYXQiOjE3Mzk1NDc0MjMsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.Dqsw6BkdH2tk8BIT3qcF4FZHv3wCCkjHZplDk1Flw97KJJtqF3dRiLMGzMmfOYOuHZmq6aZ93RR1wOcnI3G8DLgwLMFV9K6anmjMDrxJvnWPMAUA3Pqm0b49ucHeRsSlqM9ryelZ3SPN-YU-8hiGTNhDx_YJOcmVsHADZBYC6fprQde4mPEMdf8L-FGneo6Ljv6lh3Rvb40A2Z7zyj6UxZeu9XGY-Qgn6lCNw4C4-Ttqk7cvLIz2DQ-Po3twL6e41RB7DxBJOnoONZCYfm6hOzZUXsxBJ7OyaiOgaYvIcZ2PZ-QX1-DFXNI3ruo-Gr44dAL_EGgLhm6nz8-E8T7JEz-sE1I6i7-BKhSnpOLaichOr6yO-anglwr5KC0c0Ez5in5-CM3zfZCuJ3FxoReknAb6aptUCADU-z7dJq3A-qIj-AyFSHVWmo6UpC19ep2knljByrj4GyvfE__FbNTFOq_Q2ZlFQW95aURpJy-7sw0vHaR0vM_P4MIsqVZlSoiKmJfMmtgSWE-ZWtnC7_pV_XgLldHY6UWP5dnvDwx28UKltVHEnzJ1P8GjjT54S7ZdE6VsiCkgpTlIqysPAEmAU5Eml8oliKYpG3Zv__crjlAZK-mGvaSBzFsdF11aWdtTZWS9QWFkDp3xXozdwefbsBbE887lFVPWBPu8lsamWNU"
}//temp static token
