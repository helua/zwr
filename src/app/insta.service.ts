import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstaService {

  constructor(private http: HttpClient) { }

  refreshToken(){
    return this.http.get('https://ig.instant-tokens.com/users/f86040ae-5a59-4500-bc2e-1a636d0bfebe/instagram/17841408808851188/token.js?userSecret=vmdqrei0g2bwj2gwms1rn')
    // return this.http.get('https://ig.instant-tokens.com/users/f86040ae-5a59-4500-bc2e-1a636d0bfebe/instagram/17841408808851188/token?userSecret=vmdqrei0g2bwj2gwms1rn')
  };
}
