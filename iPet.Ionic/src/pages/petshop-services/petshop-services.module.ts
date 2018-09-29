import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetshopServicesPage } from './petshop-services';

@NgModule({
  declarations: [
    PetshopServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(PetshopServicesPage),
  ],
})
export class PetshopServicesPageModule {}
