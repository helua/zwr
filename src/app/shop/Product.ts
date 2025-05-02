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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiTU92WWlSQm9MRyIsImNsaWVudF9pZCI6InVIUlh4Rk5tVGxhQTM5aGFSNjVUbGlTS25TdlF2WDZWckQ1SkdzVklHaGsiLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sInNjb3BlIjoibWFya2V0OmFsbCIsImV4cCI6MTc0NzUwMjg2NSwidGVzdCI6ZmFsc2UsInJhbmQiOjAuNTc1NDc3NjU3NTMzMzcwNywiaWF0IjoxNzQ2MjA2ODY1LCJpc3MiOiJodHRwczovL2F1dGguY29tbWVyY2VsYXllci5pbyJ9.XCKqmv76GxoZn73dHXfsc5Nkio0OAGmrcfRw9iS9HR48SK3j0Xj5gXhxBSxAeSvU3Cpw7x3Zr2sU1N51wSwJOgMk2P-DcgoXL5vb_JQS-nyOyU_EfZSfHETOELqK0VNcN9mSMAfgzcKzdemyqcRgASik2VwGrfp4JVCWdYEoL1GKwyG0RkHz6rYt8QN8n_2A6_phxeBwvFAJOIqcMCm2t0a0-MLrI61HqjfaHZwP7m_JNmWTYJ8RNG48iRqQPDn7QwaX2OngYjyyisj-vKKVu7ssZ9TwlaaTFPoFJZmhExPEEuBeUSES1NJHitknkPGW4YRt_7e4OdIj2pFFKsZ31PskokOX_zZsYALG0fEHzLEAN7TwJCj8K6lT8N7wa9gxODedg_tcGYoGOK79EJfRi0USCOUgrukmqIC3N5cMGS7qKkBCsNbtJGv1b-HYqoBa79w2mzI9iCYrwwFqtN9eq7v-GknBKfc9Ik_MWZlVrjPyAJcunRJULjUbH-D6mjj3F8JiN3KwfLkeHBjkv9ieSlqHTN2e0GU9mt4znhXOq6XXTTOubdPeS5E8Go91URTZHjeLQiuBZhAvR1JFDcPlABKlcCP_-O2-vTfaSIKF24wUKo0q34aPOI9dUPPw7cVzaRxdup7oYY8lfbyAAdKv4cndyWA0Tf-Z4VMZEJFxYAw"
}//temp static token
