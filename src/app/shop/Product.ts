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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiQUdQa1ppcW12TiIsImNsaWVudF9pZCI6ImJfemV3Ui1SbWdhb05NcjNrSHctMW5KLTFudXNOLU1tQ3BGSFdVUGFadE0iLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3Mzg3NzEzMTYsInRlc3QiOmZhbHNlLCJyYW5kIjowLjA3NTM2NjM5MDY3OTM4OTU1LCJpYXQiOjE3Mzg3NTY5MTYsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.eFwhUIYT_JYPm62vgTGxRHT5o57QgkIIJVuCYQI4cWv3cbLSU--EQhXfpP2jBIViu1YZIP9JUPefWiW1Jzj-_IeLiuk_AUCvlLryisTokwsLrtwNEgW5rMvXbH_rdjIgiZ-xfUVHTPLP1iEQbjFiUACIofU-usCdOZaurg3I7jK20WIEUEAOenH5P37VPFWagSkwvxAWNeHj2mDY8WyjO5dVNZKA-vLYr6xFAHXaroFCnIRsZUDs5yq7gXJ-4LSjXSZxOqsp0t9iQjtkPnOt2IC-dw5_TxTiZVEz7bMYdK2Ar2jWIld-dmAPBP2U9GSCFxajGkG10YnYpjTjdPER8LXu98_TBaQr3wACTlyyyVdue5EUBvX7BEV1USLxZlXVsTTNIaRfzMdZTf7AePP45JfeOe9kFIBR3grM2ude6HbQUshQR0wjNNyfAOUXXzbEwIAc_t9sNxtAkRWGXTvwKTPufgVRsmZWyCdx5FVUWCIagadUiflWq6GHh5YGeUckgqD0XhByb1_j3PB-Lr9devtJkGDlZy6FmY5kw-HYSO-fylBfBTyrjG3KD9vnp2bTb1ntI4ALGKzzJk6ANhrBam5RQmyYJL36pkkjyJ4OrGswau53JDXImU4eAMT8lsLPMq-z4_f1-1LWjigzX46jHxS8xekh3k4NslklUeJKOpQ"
}
