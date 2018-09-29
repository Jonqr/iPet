import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeuCadastroPage } from './meu-cadastro';

@NgModule({
  declarations: [
    MeuCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(MeuCadastroPage),
  ],
})
export class MeuCadastroPageModule {}
