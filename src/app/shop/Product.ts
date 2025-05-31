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
  sku: string;
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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTU92WWlSQm9MRyIsImNsaWVudF9pZCI6InVIUlh4Rk5tVGxhQTM5aGFSNjVUbGlTS25TdlF2WDZWckQ1SkdzVklHaGsiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3NDk5OTMyMjIsInRlc3QiOmZhbHNlLCJyYW5kIjowLjE5NDU3MDg1ODQzODYxNjY2LCJpYXQiOjE3NDg2OTcyMjIsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.HN0K7hI1VjGPclA0G4uEvu0UjRTaIk3x-DNz_jiYjzwJ_uLTaO0mzarc6kfEJArhEc43DrLWPA48Gh6y_V-yR2rK48r0xbOdVQ0ZN6g-jrNSjtrZ8o3D8BiRkXMsA7s9eQ9aZm5e4sZv5xPbQ7nM2S3AXNguiGovSVRLWp20qaqrb1aMTBH_0vu8EGjwdai7nET6khwmaWOHwvT3K_YneGQj_IQDpbelnCIVTeCwVy2EEp7sA9gxEvWXhde-L8MtTrSeyrAz8xZfT5kVR7NBdTkr_B3BLVNIFSLJu05XhXIInDgzz6ffknE44JVLT8-zikQiMpMRxuhXwsh5fdShLHz4qpL1OM0p7gJRmiaSUSPu6KGsDr-wPLUE6ygQxrkIZEByGvHYgESKdqfm2uJ07ACsoxX4AkpvR0iWw70JcEDvwR2MkYQo2xa6m9qNNN0OqdkNcRykzqy6fAgRSu-V8rjSjW44GMLZ2H8SFdtUiv4b9VcV8njew1bVNVYlrg4QlGzdhkOx9HFostBBHWZfRs3WVfd-WgRBC8u9VNlcAcO3K7QLPKJyCDpYSrx8yGHTD9lglJotDSLEQrTzWNfebfbw8ngIwTAT9rCAEUwJUyqWn9wknZY3ha8L9dZ18PNB_QIRp4TPhn9BEHmgRgpkGoBSh1Swet2H6vWBuDOy8EE"
}//temp static token
