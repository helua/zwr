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
  scope: string ="market:15032";
  stock: string = "stock_location:12586";
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
