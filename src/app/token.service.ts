import { Injectable } from '@angular/core';
import { getSalesChannelToken } from '@commercelayer/js-auth';
// import { EcommerceService } from './ecommerce.service';
import { clear, getToken, setToken } from './localStorage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  url: string = 'https://zwr-event-agency.commercelayer.io'
  clientID: string = 'b_zewR-RmgaoNMr3kHw-1nJ-1nusN-MmCpFHWUPaZtM';
  // secretKey: string = 'X-wSS3WdQ_et1IPTcqa930Yjg1Sr15ObG3HeWioIBjE';
  scope: string ="market:15032";
  stock: string = "stock_location:12586";
  // token: string = "eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZX0sImFwcGxpY2F0aW9uIjp7ImlkIjoiWk1YQVppUWtacCIsImtpbmQiOiJpbnRlZ3JhdGlvbiIsInB1YmxpYyI6ZmFsc2V9LCJ0ZXN0Ijp0cnVlLCJleHAiOjE2NjI1OTE1OTksIm1hcmtldCI6eyJpZCI6WyJwb012ZWhRektqIl0sInByaWNlX2xpc3RfaWQiOiJ3QlpydkNRUEFCIiwic3RvY2tfbG9jYXRpb25faWRzIjpbImdrV29tdVhEamsiXSwiZ2VvY29kZXJfaWQiOm51bGwsImFsbG93c19leHRlcm5hbF9wcmljZXMiOmZhbHNlfSwicmFuZCI6MC4wODQ0MDM4NTcxNzMzNTQ1Mn0.38uQXvyja5hmeKU8tUnMcDfWtx7aAn9lCgRLD2Zm92qDeIkpO9mgr9Hz35b90FhaXUGeH3L7m-IxOFsEENE9jQ";
  constructor() { }

  async getToken(){
    if(this.checkIfTokenValid() === false){
      const tokenAPI = await getSalesChannelToken({
        clientId: this.clientID,
        // clientSecret: this.secretKey,
        endpoint: this.url,
        scope: this.scope,
      })
      if(tokenAPI){
        console.log('nowy token utworzony');
        console.log(tokenAPI);
        setToken(tokenAPI);
        console.log('nowy token w localStorage');
        console.log(getToken());
        return getToken();
      }

    }
    else{
      console.log('token istnieje w LS');
      return getToken();
    }

  }
  checkIfTokenValid(): boolean{
    const tokObject = JSON.parse(getToken());
    console.log('token zastały');
    console.log(tokObject);
    if(tokObject === null){
      return false;
    }
    let currentDate = Math.round(new Date().getTime() / 1000);
    // console.log(currentDate);
    const tokenValidTimeRemaing =  tokObject.expires_in;
    // const tokenValidTimeRemaing =  tokObject.expires_in - ( currentDate - tokObject.created_at ) ;
    // console.log(tokenValidTimeRemaing);
    // console.log(currentDate - tokObject.created_
    if(tokenValidTimeRemaing > 0 && currentDate - tokObject.created_at < 14400){
      return true;
    }
    else{
      return false;
    }
  }

}
