import { ToastController, LoadingController, Loading } from '@ionic/core';
import { Session } from '../global/interfaces';


let loading: Loading;
const showToast = async (toastCtrl: ToastController,msg:string): Promise<void> => {
  const toast = await toastCtrl.create({ message: msg, duration: 1500 });
  toast.present();
}
const presentLoading = async (loadingCtrl:LoadingController,message:string): Promise<void> => {
  loading = await loadingCtrl.create({
    content: message
  });
  loading.present();
}
const dismissLoading = async (): Promise<void> => {
  loading.dismiss();
}

const getIonApp = (docMock?: Document): Promise<any> => {
  const doc: Document = docMock ? docMock : document;
  const appElement: HTMLElement = doc.querySelector('ion-app');
  return Promise.resolve(appElement ? appElement : null);
}
const getPouchDBProvider = async (docMock?: Document): Promise<any> => {
  const doc: Document = docMock ? docMock : null;
  let appElement: any = await getIonApp(doc);
  return  Promise.resolve(appElement ? appElement.querySelector('app-pouchdb') : null);
}
const getErrorController = async (docMock?: Document): Promise<any> => {
  const doc: Document = docMock ? docMock : null;
  let appElement: any = await getIonApp(doc);
  return  Promise.resolve(appElement ? appElement.querySelector('app-error') : null);
}
const getAuthProvider = async (docMock?: Document): Promise<any> => {
  const doc: Document = docMock ? docMock : null;
  let appElement: any = await getIonApp(doc);
  return  Promise.resolve(appElement ? appElement.querySelector('app-auth') : null);
}
const getSessionProvider = async (docMock?: Document): Promise<any> => {
  const doc: Document = docMock ? docMock : null;
  let appElement: any = await getIonApp(doc);
  return  Promise.resolve(appElement ? appElement.querySelector('app-session') : null);
}
const getConnectionProvider = async (docMock?: Document): Promise<any> => {
  const doc: Document = docMock ? docMock : null;
  let appElement: any = await getIonApp(doc);
  return  Promise.resolve(appElement ? appElement.querySelector('app-connection') : null);
}
const getMenuController = async (docMock?: Document): Promise<any> => {
  const doc: Document = docMock ? docMock : document;
  const body: HTMLBodyElement = doc.querySelector('body');
  return  Promise.resolve(body ? body.querySelector('ion-menu-controller') : null);
}
const getPopoverController = async (docMock?: Document): Promise<any> => {
  const doc: Document = docMock ? docMock : null;
  let appElement: any = await getIonApp(doc);
  return  Promise.resolve(appElement ? appElement.querySelector('ion-popover-controller') : null);
}
const getNavComponent = async (docMock?: Document): Promise<any> => {
  const doc: Document = docMock ? docMock : null;
  let appElement: any = await getIonApp(doc);
  return  Promise.resolve(appElement ? appElement.querySelector('#navId') : null);
}

const checkServersConnected = ( loadingCtrl: LoadingController | any,
                          comps:any, page:string,loadingMsg:string): Promise<void> => {
  return new Promise<void>(async (resolve) => {
    await presentLoading(loadingCtrl,loadingMsg);
    let session: Session = await comps.sessionProvider.getSessionData();
    let server: any = await comps.authProvider.isServersConnected();
    if(server === null ) resolve();
    if(session === null && (server.status === 400 || 
        (server.status === 200 && !server.result.dbserver))) {
      dismissLoading().then(() => {
        comps.errorCtrl.showError("Application Server not connected").then(() => {
           resolve();
        });
      });
    } else {
      comps.authProvider.reauthenticate(server).then((data) => {
        if(data.status === 200 && server.status === 200) {
          dismissLoading().then(() => {
            comps.connectionProvider.setConnection('connected');
            if (page === 'page') {
              comps.navCmpt.setRoot('app-home',{mode:'connected'});
            }
            resolve();
          });
        } else if (data.status === 200 && server.status === 400) {
          dismissLoading().then(() => {
            comps.errorCtrl.showError("Working Offline").then(() => {
              comps.connectionProvider.setConnection('offline');
              if (page === 'page') {
                comps.navCmpt.setRoot('app-home',{mode:'offline'});
              }
              resolve();
            });
          });        
        } else if(server.status === 200) {
          dismissLoading().then(() => {
            comps.errorCtrl.showError(data.message).then(() => {
              comps.navCmpt.setRoot('app-login'); 
              resolve();
            });              
          });
        }
      });
    }
  });
}

const initializeMocks = (components:any,mocks:any): Promise<void> => {
  return new Promise<void>(async (resolve) => {
    if(components.authProvider) components.authProvider = mocks.authProvider;
    if(components.sessionProvider) components.sessionProvider = mocks.sessionProvider;
    if(components.pouchDBProvider) components.pouchDBProvider = mocks.pouchDBProvider;
    if(components.errorCtrl) components.errorCtrl = mocks.errorCtrl;
    if(components.loadingCtrl) components.loadingCtrl = mocks.loadingCtrl;
    if(components.connectionProvider) components.connectionProvider = mocks.connectionProvider;
    if(components.menuCtrl) components.menuCtrl = mocks.menuCtrl;
    if(components.popoverCtrl) components.popoverCtrl = mocks.popoverCtrl;
    if(components.navCmpt) components.navCmpt = mocks.navCmpt;
    resolve();
  });
}

const initializeComponents = (components:any,docMock?: Document):Promise<void> => {
  return new Promise<void>(async (resolve) => {
    const doc: Document = docMock ? docMock : null;
    if(components.errorCtrl) components.errorCtrl = await getErrorController(doc);
    if(components.authProvider) components.authProvider = await getAuthProvider(doc);
    if(components.authProvider && components.authProvider === null) components.errorCtrl.showError('Error: No Authentication Provider');
    if(components.sessionProvider) components.sessionProvider = await getSessionProvider(doc);
    if(components.sessionProvider && components.sessionProvider === null) components.errorCtrl.showError('Error: No Session Provider');
    if(components.pouchDBProvider) components.pouchDBProvider = await getPouchDBProvider(doc);
    if(components.pouchDBProvider && components.pouchDBProvider === null) components.errorCtrl.showError('Error: No PouchDB Provider');
    if(components.connectionProvider) components.connectionProvider = await getConnectionProvider(doc);
    if(components.connectionProvider && components.connectionProvider === null) components.errorCtrl.showError('Error: No Connection Provider');
    if(components.menuCtrl) components.menuCtrl = await getMenuController(doc);
    if(components.menuCtrl && components.menuCtrl === null) components.errorCtrl.showError('Error: No Menu Controller');
    if(components.popoverCtrl) components.popoverCtrl = await getPopoverController(doc);
    if(components.popoverCtrl && components.popoverCtrl === null) components.errorCtrl.showError('Error: No Menu Controller');
    if(components.navCmpt) components.navCmpt = await getNavComponent(doc);
    if(components.navCmpt && components.navCmpt === null) components.errorCtrl.showError('Error: No Nav Component');

    resolve();
  }); 
}
export { showToast, presentLoading, dismissLoading, getPouchDBProvider, 
        getErrorController, getAuthProvider, getSessionProvider,
        checkServersConnected, initializeMocks,initializeComponents,
        getIonApp, getConnectionProvider,getMenuController,
        getPopoverController, getNavComponent}
