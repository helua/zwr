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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTU92WWlSQm9MRyIsImNsaWVudF9pZCI6InVIUlh4Rk5tVGxhQTM5aGFSNjVUbGlTS25TdlF2WDZWckQ1SkdzVklHaGsiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3NDc2NTUwNTQsInRlc3QiOmZhbHNlLCJyYW5kIjowLjQ3NTk5MDU3NjU4NjM4ODMsImlhdCI6MTc0NjM1OTA1NCwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvbW1lcmNlbGF5ZXIuaW8ifQ.UAUuFD_bxXnRmzOSN5xaBMY7tRxGclK5tpO-RxhOOUtLqu6mRKDDlxQFTR73jkpt8-d71XKkaUJbbXOQse7SLwcBiFywFSDGG4az-c3xdI_kCurotgF4ZzVPqGUdWmDROg1H0y01YVHjlz1x_sbpa3tNozFH7JnCMpDa9pwGG03a_V1quJ7cnZOlbxvYAhpY-hoCSl9m2K4UizscYO2WxmyUwQST_EH_DfCiw2qFObqFS36r_M_UJ1eCgAEQr1-HetgRRKKROTO5jfi9RDTsIS9N82hgPoFHVEcuk7d8p8M-m_8tXwkxQhJaauPxS6uBPyqLXPwq3H3MG95dyDzyQ4X-SbL-8_VLqc-KOo-uEY2vYRuJ3_tzFdSrxhTeH4FNqzjUtaAHRZniGytEcJrGtrhwlkvT7lVC-0UX7AsqUwNIanJ2JRILqQIo5MuRqR4UVGQ3-4IyG8LCH-nqxwCD8VSYvlHtxi5qSzzgd3NqOWQPNudk_5xNLViq2O27wbE7-fN5lsmgrR-bfAPdJvm0y6MSyi5n34Io42BTlJnIRog0y_pz-voGDRecCPAI9y5PGey5-8LaSNlvVw1EaUv4PvzQ4Waoh-6tOuAlqko0laDXnI5WKysanBaRN--2ZEtZd_m7tk-GoTMLUoX5DDASbV9YDX3pfQ_PrOiLA8c_lgE"
}//temp static token
