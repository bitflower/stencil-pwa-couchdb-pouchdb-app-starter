import { Component, State, Prop, Method } from '@stencil/core';
import { LoadingController } from '@ionic/core';
import { initializeComponents, initializeMocks, checkServersConnected } from '../../helpers/ui-utilities';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {
  @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: LoadingController;
  @State() isRender: boolean = false;

  private _comps: any;
  private _conMode: string = 'offline';
  private _loadingCtrl : LoadingController | any;
  private _logout : boolean;

  @Method()
  initMocks(mocks:any): Promise<void> {
      // used for unit testing only
      this._loadingCtrl = mocks.loadingCtrl;
      this._comps = { authProvider:true,sessionProvider:true,errorCtrl:true,
        connectionProvider:true,menuCtrl:true,navCmpt:true} ;
      return initializeMocks(this._comps,mocks);
  }
  @Method()
  setConMode(): Promise<void> {
    return this._setConMode();
  }
  @Method()
  handleToggleMenu(): void {
    this._handleToggleMenu();
  }
  @Method()
  isServersConnected(): Promise<void> {
      return checkServersConnected(this._loadingCtrl,this._comps,'home','Connecting ...');
  }

  componentWillLoad() {
      this._loadingCtrl = this.loadingCtrl;
      this._comps = { authProvider:true,sessionProvider:true,errorCtrl:true,
                      connectionProvider:true,menuCtrl:true,navCmpt:true} 
      initializeComponents(this._comps).then(async () => {
        await this._setConMode();                        

      });
  
  }
  async _setConMode(): Promise<void> {
    if(this._comps.connectionProvider != null && this._comps.menuCtrl != null
      && this._comps.navCmpt != null) {
      if(this._comps.navCmpt.getActive() === null || 
              this._comps.navCmpt.getActive().data === null ||
              typeof this._comps.navCmpt.getActive().data === 'undefined' ||
              !this._comps.navCmpt.getActive().data['mode']) {
        if(this._comps.connectionProvider) {
          this._conMode = await this._comps.connectionProvider.getConnection();
        }
      } else {
        this._conMode =  this._comps.navCmpt.getActive().data['mode'];
      }
      this.isRender = true;
    }                        
    return Promise.resolve();
  }
  async _handleToggleMenu() {
    await this._comps.menuCtrl.toggle('menu');
  }
// rendering 
  render() {
    this._logout = this._conMode === 'connected' ? true : false;
    return (
      <ion-page>
        <app-header menu logout={this._logout}></app-header> 
        <ion-content>
          <app-logo width="75%"></app-logo>
          <div class="text">
              <h2>Welcome to the Jeep PouchDB Application Starter</h2>
              <h3>based on the Ionic PWA Toolkit</h3>
          </div>
          <ion-button fill='solid'  expand="block" onClick={() => this.handleToggleMenu()} class="menu-button" ion-button>
            Menu
          </ion-button>
        </ion-content>
      </ion-page>
    );
  }
}
        
