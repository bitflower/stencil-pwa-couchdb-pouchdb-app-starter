import { Component, Prop, Element, Method } from '@stencil/core';
import { ActiveRouter } from '@stencil/router';
import { initializeComponents, initializeMocks } from '../../helpers/ui-utilities';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {
  _title: string;
  _logout: boolean;
  _back: boolean;
  _menu: boolean;
  _comps: any;
  
  @Element() el: HTMLElement;
  @Prop() menu;
  @Prop() htitle;
  @Prop() logout;
  @Prop() back;
  @Prop({ context: 'activeRouter'}) activeRouter: ActiveRouter;
  @Method()
  handleLogout() {
    this._handleLogout();
  }
  @Method()
  handleBack() {
    this._handleBack();
  }
  @Method()
  initMocks(mocks:any): Promise<void> {
        // used for unit testing only
        this._comps = {authProvider:true,errorCtrl:true,navCmpt:true};
        return initializeMocks(this._comps,mocks);
  }

  componentWillLoad() {
    this._comps = {authProvider:true,errorCtrl:true,navCmpt:true};
    initializeComponents(this._comps).then(()=> {
    })
  }
  // handling events
  _handleLogout() {
    this._comps.authProvider.logout().then((res) => {
      if(res.status === 200) {
        this._comps.navCmpt.setRoot('app-page')
      } else {
        this._comps.errorCtrl.showError(res.message).then (() => {
          this._comps.navCmpt.setRoot('app-page')
        });
      }
    });
  }
  _handleBack() {
    this._comps.navCmpt.pop();
  }
  // rendering
  render() {
    this._logout = this.logout ? true : false;
    this._menu = this.menu ? true : false;
    this._back = !this._menu && this.back ? true : false;
    this._title = this.htitle ? this.htitle : "Stencil PouchDB App";
    const header = [
        <ion-header md-height="56px">
        <ion-toolbar color='dark'>
          {this._menu ? <ion-menu-button></ion-menu-button>: null}
          {this._back ? <ion-buttons slot='start'>
            <ion-button fill='clear' onClick={() => this._handleBack()} class="back-button" ion-button  icon-only>
              <ion-icon class='icon-back' name="arrow-back"></ion-icon>
            </ion-button>
          </ion-buttons> : null}
          <ion-title>{this._title}</ion-title>
          {this._logout ? <ion-buttons slot='end'>
            <ion-button fill='clear' onClick={() => this._handleLogout()} class="logout-button" ion-button  icon-only>
              <ion-icon class='icon-logout' name="log-out"></ion-icon>
            </ion-button>
          </ion-buttons> : null}
          </ion-toolbar>
      </ion-header>
    ]
    return header;
  }
}