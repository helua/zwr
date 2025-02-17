import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  url: string = 'https://zwr-event-agency.commercelayer.io'
  orderCreated: string = '';

  constructor(private http: HttpClient ) { }

  getPrices(token: string){
    return  this.http.get<any>(this.url+'/api/skus?include=prices&page[size]=25', {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer '+token
      },
    });
  }
  getPrice(token: string, id: string){
    return  this.http.get<any>(this.url+`/api/skus/${id}?include=prices`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer '+token
      },
    });
  }
  getStock(token: string){
    return  this.http.get<any>(this.url+'/api/stock_items?page[size]=25', {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer '+token
      },
    });
  }
  createEmptyOrder(token: string){
    const headersData = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};

    return this.http.post<any>(this.url+'/api/orders',{
        "data": {
            "type": "orders",
            "attributes": {
              "language_code": "en",
              "metadata": {
              },
            }
          }
        },
      headers);
  }
  addLineItems(token: string, orderId: string, sku: string, name: string, img: string){
    const headersData = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};
    return this.http.post<any>(this.url+'/api/line_items', {
      "data": {
        "type": "line_items",
        "attributes": {
          "quantity": 1,
          "_update_quantity": true,
          "sku_code": sku,
          "name": name,
          "image_url": img
        },
        "relationships": {
          "order": {
            "data": {
              "type": "orders",
              "id": orderId
            },
            "market": {
              "type": "market",
              "id": "vlGRmhnpNg"
              }
          }
        }
      }
    },headers);
  }
  getCart(token: string, orderId: string){
    const headersData = {
      'Accept': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};

    return this.http.get<any>(this.url+'/api/orders/'+orderId+'?include=line_items&fields[orders]=number,skus_count,formatted_subtotal_amount,formatted_discount_amount,formatted_shipping_amount,formatted_total_tax_amount,formatted_gift_card_amount,formatted_total_amount_with_taxes,status,payment_status,fulfillment_status,line_items&fields[line_items]=item_type,image_url,name,sku_code,formatted_unit_amount,quantity,formatted_total_amount',
      headers);
  }
  deleteLineItem(token: string, lineItemId: string){
    const headersData = {
      'Accept': 'application/vnd.api+json',
      // 'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};

    return this.http.delete(this.url+'/api/line_items/'+lineItemId,
      headers);
  }
  // getLineItemsOptions(token: string, lineItemId: string){
  //   const headersData = {
  //     'Accept': 'application/vnd.api+json',
  //     'Authorization': 'Bearer '+token,
  //   }
  //   const headers = { headers: new HttpHeaders(headersData)};
  //   return this.http.get<any>(this.url+'/api/line_items/'+lineItemId+'?include=line_item_options'
  //   ,headers);
  // }
  addLineItemOptions(token: string, lineItem: string, skuOption: any, optionName: string){
    const headersData = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};
    return this.http.post<any>(this.url+'/api/line_item_options', {
      "data": {
        "type": "line_item_options",
        "attributes": {
          "quantity": 1,
          "options": {
            "size": optionName
          },
          "metadata": {
            "foo": "bar"
          },
        },
        "relationships": {
          "line_item": {
            "data": {
              "type": "line_items",
              "id": lineItem
            }
          },
          "sku_option": {
            "data": {
              "type": "sku_options",
              "id": skuOption
            }
          }
        }
      }
    },headers);
  }
  getLineItemsOptions(token: string, lineItemId: string){
    const headersData = {
      'Accept': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};
    return this.http.get<any>(this.url+'/api/line_items/'+lineItemId+'?include=line_item_options'
    ,headers);
  }
}
