import { HttpResultModel } from './../../app/models/HttpResultModel';
import { NetworkProvider } from './../network/network';
import { AlertProvider } from './../alert/alert';
import { SpinnerProvider } from './../spinner/spinner';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpProvider {

  constructor(
    private http: HttpClient,
    private spinnerSrv: SpinnerProvider,
    private alertSrv: AlertProvider,
    private networkSrv: NetworkProvider) {
  }

  // recebe uma promessa com resultModel
  public get(url: string): Promise<HttpResultModel> {
    this.spinnerSrv.Show('Carregando os dados...');
    
    //cria uma nova promise
    return new Promise((resolve)=>{

      //verifica se o usuario está online
      if(this.networkSrv.IsOnline){
        //pega o http do angular 
        this.http.get(url).subscribe(_res =>{
          this.spinnerSrv.Hide(); //oculta o loading
          resolve({ sucess: true, data: _res, err: undefined}); //foi resolvido com sucesso
        }),err =>{
          this.spinnerSrv.Hide();
          this.alertSrv.toast('Não foi possivel consultar os dados, verifique sua conexão e tente novamente','bottom'); //notifica
          resolve({sucess: false, data: undefined, err: err});
        }
      }else{
        this.alertSrv.toast('Você está Offline, e infelizmente não pode ser carregado os dados', 'bottom');
        resolve({sucess: true, data: [], err: undefined});
      }
    });
  }

  public post(url: string, model:any): Promise<HttpResultModel>{
    this.spinnerSrv.Show("Salvando Informações...");
    return new Promise((resolve)=>{
      if(this.networkSrv.IsOnline) {
        this.http.post(url,model)
        .subscribe(_res=>{
          this.spinnerSrv.Hide();
          resolve({sucess:true,data: _res, err: undefined});
          }, err =>{
            this.spinnerSrv.Hide();
            console.log(err);
            if(err.status ==400){
              let msg ='';
              err.error.erros.forEach(_err => {
                msg += `<li>${err.message}</li>`;
              });
              this.alertSrv.alert('Informação',msg);
            }else{
              this.alertSrv.toast('Não foi possivel realizar o processamento da informação, verifique sua conexão e tente novamente','bottom');
              resolve({sucess:false, data: undefined,err: err});
            };
          });
      }else
      this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado dados', 'bottom');
      resolve({sucess: true, data:[], err: undefined});

    })
  }

}
