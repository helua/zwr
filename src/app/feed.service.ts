import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './shop/Product';
const sanityClient = require("@sanity/client");
const sanity = sanityClient({
  projectId: '887dorwc',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});
@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor( private http: HttpClient ) {}

  getProducts(){
    return this.http.get(`https://887dorwc.api.sanity.io/v2021-10-21/data/query/production?query=*[_type=="product"][privateBathroom == null]{title, priority, slug, defaultProductVariant, tags, "categoryTitles": categories[]->title, "statusTitles": statuses[]->title, "vendor": vendor->name, body, capacity, privateBathroom, address, "bedTypes": bedTypes[]->title, "standard": standard->name} | order(priority asc)`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  getAcco(){
    return this.http.get(`https://887dorwc.api.sanity.io/v2021-10-21/data/query/production?query=*[_type=="product"][privateBathroom == "2 bathrooms" || privateBathroom == "yes"]{title, priority, slug, defaultProductVariant, tags, "categoryTitles": categories[]->title, "statusTitles": statuses[]->title, "vendor": vendor->name, body, capacity, privateBathroom, address, "bedTypes": bedTypes[]->title, "standard": standard->name} | order(priority asc)`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  getProduct(id: any){
    return this.http.get(`https://887dorwc.api.sanity.io/v2021-10-21/data/query/production?query=*[defaultProductVariant.sku=="${id}"]{title, priority, slug, defaultProductVariant, tags, "categoryTitles": categories[]->title, "statusTitles": statuses[]->title, "vendor": vendor->name, body, capacity, privateBathroom, address, "bedTypes": bedTypes[]->title, "standard": standard->name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  workResult(p: any): Product{
    const blocksToHtml = require("@sanity/block-content-to-html");
    const imageUrlBuilder = require("@sanity/image-url");
    const output: Product = {
      title: p.title,
      priority: p.priority,
      slug: p.slug.current,
      capacity: p.capacity,
      bedTypes: p.bedTypes,
      privateBathroom: p.privateBathroom,
      standard: p.standard,
      address: p.address,
      categories: p.categoryTitles,
      statuses: p.statusTitles,
      vendor: p.vendor,
      body: blocksToHtml({ blocks: p.body }),
      sku: p.defaultProductVariant.sku,
      images: []

    }

    if(p.defaultProductVariant.images!==undefined){
      for (let i = 0; i < p.defaultProductVariant.images.length; i++){
          const image =
          p.defaultProductVariant.images &&
          p.defaultProductVariant.images.length > 0
            ? p.defaultProductVariant.images[i].asset._ref
            : null;
    
          if (image) {
            output.images?.push(imageUrlBuilder(sanity).image(image).url())
          }
        }
    }

    // console.log(output);
    return output;
  }
}
