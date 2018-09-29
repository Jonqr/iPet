import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {

  petShopRoot = 'PetShopPage'
  favoritosRoot = 'FavoritosPage'
  meuCadastroRoot = 'MeuCadastroPage'
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App) {
  }
  selecionaTabs(event): void{

    let navegacaoAnterior = event.linker._history[event.linker._history.length - 2];
    if(event.tabTitle =='PetShop' && navegacaoAnterior != '/petshop')
    this.app.getActiveNav().setRoot('TabsPage');

  }
}
