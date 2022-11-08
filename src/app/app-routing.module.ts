import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { ShopNewComponent } from './shop-new/shop-new.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './shop-new/product/product.component';

const routes: Routes = [
  // { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: '', component: MainComponent },
  { path: 'o-nas', component: AboutComponent },
  { path: 'sklep', component: ShopComponent },
  { path: 'sklep2', component: ShopNewComponent },
  { path: 'sklep2/:id', component: ProductComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: '**', component: MainComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
