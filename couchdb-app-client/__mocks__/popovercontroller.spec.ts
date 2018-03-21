import PopoverCtrlMock from './popovercontroller';
import PopoverMock from './popover';

describe('popovercontroller', () => {
    let popoverCtrl: any;
    beforeEach(async () => {
        popoverCtrl = new PopoverCtrlMock();        
    });
    afterEach(async () => {
        popoverCtrl.restoreMock();
        popoverCtrl.resetMock();
    });
    it('should create a PopoverController from mock',async () => {
        expect(popoverCtrl).toBeDefined();
    });
    it('When PopoverController created show have el= ion-popover-controller', () => {
        expect(popoverCtrl.el.tagName).toEqual('ION-POPOVER-CONTROLLER');
    });
    it('should create a popover from the PopoverController', async () => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{key:1,value:'Create News'},{key:2,value:'Display News'}]},
                            ev:event};
        let popover:any = await popoverCtrl.create(options);
        expect(popover).toBeTruthy();
    });
    it('When created the popover should be stored in the PopoverController', async (done) => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{key:1,value:'Create News'},{key:2,value:'Display News'}]},
                            ev:event};
        popoverCtrl.create(options).then(() => {
            popoverCtrl.getPopoverMock(1).then((popover) => {
                expect(popover).toBeTruthy();
                expect(popover.el.component).toEqual('app-news-popover'); 
                done();   
            });
        });
    });
    it('When created the PopoverController should have a popover in the list of popovers', async (done) => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{key:1,value:'Create News'},{key:2,value:'Display News'}]},
                            ev:event};
        popoverCtrl.create(options).then(() => {
            popoverCtrl.getPopoversMock().then((popovers) => {
                expect(popovers).toBeTruthy();
                expect(popovers.length).toEqual(1);
                expect(popovers[0].key).toEqual(1); 
                expect(popovers[0].value.el.component).toEqual('app-news-popover'); 
                done();   
            });
        });
    });
    it('When created the popover should be a <ion-popover>', async () => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        let popover:any = await popoverCtrl.create(options);
        expect(popover.el.tagName ).toEqual('ION-POPOVER');
    });
    it('When created the popover should have a property component', async () => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        let popover:any = await popoverCtrl.create(options);
        expect(popover.el.component ).toEqual('app-news-popover');
    });
    it('When created the popover could have a property data', async () => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        let popover:any = await popoverCtrl.create(options);
        expect(popover.el.data ).toEqual([{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]);
    });
    it('When created the popover could have a property ev', async () => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        let popover:any = await popoverCtrl.create(options);
        expect(popover.el.ev ).toEqual(event);
    });
    it('When created the popover should have the properties stored in the Popover Mock', async () => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        popoverCtrl.create(options).then((popover) => {
            expect(popover.getDataMock() ).toEqual(options);
        });
    });
    it('When created the popover should be presented', async (done) => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        popoverCtrl.create(options).then((popover) => {
            popover.present().then(() => {
                expect(popover).toBeTruthy();
                expect(popover.el.component).toEqual('app-news-popover'); 
                done();   
            });
        });
    });
    it('When present the popover should be dismissed', async (done) => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        popoverCtrl.create(options).then((popover) => {
            popover.present().then(() => {
                let res = popoverCtrl.dismiss(1);
                expect(res).toBeTruthy();
                done();   
            });
        });
    });
    it('When dismiss the popover should not be in the MenuController', async (done) => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        popoverCtrl.create(options).then((popover) => {
            popover.present().then(() => {
                popoverCtrl.dismiss(1).then(()=> {
                    popoverCtrl.getPopoversMock().then((popovers) => {
                        expect(popovers.length).toEqual(0);
                        expect(popover.getDataMock().component).toBeNull;
                        expect(popover.getDataMock().data).toBeNull;
                        expect(popover.getDataMock().ev).toBeNull;
                        done(); 
                    });      
                });
            });
        });
    });
    it('Should create two popovers in the MenuController', async (done) => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        const options1:any ={component:'app-image-popover',
            ev:event};
        popoverCtrl.create(options).then((popover1) => {
            popoverCtrl.create(options1).then((popover2) => {
                popoverCtrl.getPopoversMock().then((popovers) => {
                    expect(popovers.length).toEqual(2);
                    expect(popovers[0].key).toEqual(1);
                    expect(popovers[1].key).toEqual(2);
                    expect(popovers[0].value.el.component).toEqual('app-news-popover');
                    expect(popovers[1].value.el.component).toEqual('app-image-popover');
                    expect(popovers[0].value.el.data[0].cmp).toEqual('app-news-create');
                    expect(popovers[0].value.el.data[1].cmp).toEqual('app-news-display');
                    expect(popovers[0].value.el.data[0].value).toEqual('News Create');
                    expect(popovers[0].value.el.data[1].value).toEqual('News Display');
                    expect(popovers[1].value.el.data).toBeUndefined();
                    expect(popovers[1].value.el.data).toBeUndefined();
                    done(); 
                });      
            });
        });
    });
    it('When dismiss the popover 1 should not be in the MenuController', async (done) => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        const options1:any ={component:'app-image-popover',
                             ev:event};
        popoverCtrl.create(options).then((popover1) => {
            popoverCtrl.create(options1).then((popover2) => {
                popover1.present().then(() => {
                    popoverCtrl.dismiss(1).then(()=> {
                        popoverCtrl.getPopoversMock().then((popovers) => {
                            expect(popovers.length).toEqual(1);
                            expect(popovers[0].key).toEqual(2);
                            expect(popovers[0].value.el.component).toEqual('app-image-popover');
                            expect(popover1.getDataMock().component).toBeNull;
                            expect(popover1.getDataMock().data).toBeNull;
                            expect(popover1.getDataMock().ev).toBeNull;
                            done(); 
                        });      
                    });
                });
            });
        });
    });
    it('When dismiss the popover 2 should not be in the MenuController', async (done) => {
        const event = { preventDefault: () => {} };
        const options:any ={component:'app-news-popover',
                            data:{data:[{cmp:'app-news-create',value:'News Create'},{cmp:'app-news-display',value:'News Display'}]},
                            ev:event};
        const options1:any ={  component:'app-image-popover',
                            ev:event};
        popoverCtrl.create(options).then((popover1) => {
            popoverCtrl.create(options1).then((popover2) => {
                popover2.present().then(() => {
                    popoverCtrl.dismiss(2).then(()=> {
                        popoverCtrl.getPopoversMock().then((popovers) => {
                            expect(popovers.length).toEqual(1);
                            expect(popovers[0].key).toEqual(1);
                            expect(popovers[0].value.el.component).toEqual('app-news-popover');
                            expect(popovers[0].value.el.data[0].cmp).toEqual('app-news-create');
                            expect(popovers[0].value.el.data[1].cmp).toEqual('app-news-display');
                            expect(popovers[0].value.el.data[0].value).toEqual('News Create');
                            expect(popovers[0].value.el.data[1].value).toEqual('News Display');
                            expect(popover2.getDataMock().component).toBeNull;
                            expect(popover2.getDataMock().data).toBeNull;
                            expect(popover2.getDataMock().ev).toBeNull;
                            done(); 
                        });      
                    });
                });
            });
        });
    });    
});