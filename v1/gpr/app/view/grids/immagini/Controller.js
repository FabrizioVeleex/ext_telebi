/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.immagini.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.immagini',

    requires: [
        'Ext.button.Button',
        'Ext.button.Split',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Ext.menu.Menu',
        'Ext.window.Window'
    ],
    init: function () {
        let me=this
        this.filtrofam=Ext.create({xtype: 'combo',fieldLabel:Locale.t('gpr.grids.immagini.filtri.famiglia'), width:400, editable:false,
            displayField:'descfam',valueField:'codfam',value:'',
            queryMode:'remote', forceSelection:false,
            bind:{
                store: '{storeFamiglie}'
            },
            listeners:{
                select: function (combo, rec) {
                    let grid = me.getViewModel().getView(); //grid
                    let store = grid.getStore(); //store
                    store.getProxy().extraParams.famiglia = rec.data.codfam
                    store.load(); //carico
                }
            }
        })
        this.filtroveicolo=Ext.create({xtype: 'combo',fieldLabel:Locale.t('gpr.grids.immagini.filtri.veicolo'), width:400, editable:false,
            displayField:'descrizione',valueField:'codice',value:'',
            bind:{
                store: '{storeVeicoli}'
            },
            listeners:{
                select: function (combo, rec) {
                    let grid = me.getViewModel().getView(); //grid
                    let store = grid.getStore(); //store
                    store.getProxy().extraParams.veicolo = rec.data.codice
                    store.load(); //carico
                }
            }
        })
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','19'])){
            this.listBtnTop.push({
                ui: "blue", text: Locale.t("gpr.grids.immagini.btn.scarica.text"), menu: {
                    xtype: "menu",
                    items: [
                        {iconCls: "x-fas fa-file-image",
                            text: Locale.t("gpr.grids.immagini.btn.scarica.filtro"), handler: "onScaricaImmagini"
                        },
                        {iconCls: "x-fas fa-file-image",
                            text: Locale.t("gpr.grids.immagini.btn.scarica.selezionati"), handler: "onScaricaImmaginiSel"
                        }
                    ]
                }
            })
            this.listBtnTop.push(
                me.filtrofam
            );
            this.listBtnTop.push({
                text: '', width: 25, height: 25, arrowVisible:false,iconCls: 'icon-cross',
                xtype: 'splitbutton', handler : function () {
                    me.filtrofam.setValue('')
                    let grid = me.getViewModel().getView(); //grid
                    let store = grid.getStore(); //store
                    store.getProxy().extraParams.famiglia =''
                    store.load(); //carico
                }
            })
            this.listBtnTop.push(
                me.filtroveicolo
            );
            this.listBtnTop.push({
                text: '', width: 25, height: 25, arrowVisible:false,iconCls: 'icon-cross',
                xtype: 'splitbutton', handler : function () {
                    me.filtroveicolo.setValue('')
                    let grid = me.getViewModel().getView(); //grid
                    let store = grid.getStore(); //store
                    store.getProxy().extraParams.veicolo =''
                    store.load(); //carico
                }
            })
        }
        this.callParent(arguments)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text:Locale.t('gpr.grids.prodotti.column.codice'), dataIndex: 'schcdr', width:200, filter: {type: 'string'}},
            {text:Locale.t('gpr.grids.prodotti.column.italiano'), dataIndex: 'italiano', width:200, filter: {type: 'string'}},
            {text:Locale.t('gpr.grids.prodotti.column.inglese'), dataIndex: 'inglese',width:200, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    onScaricaImgSingola:function(grid, rowIndex) {
        let me = this; //controller
        let rec = grid.getStore().getAt(rowIndex);
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff = wdwpanel.getForm();
                let filigrana = ff.findField('filigrana').getValue(); //id azienda
                if (!filigrana) {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('gpr.grids.prodotti.btn.scaricaimg.obbfiligrana'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                wndw.destroy();
                me.getView().el.mask(Locale.t('gpr.grids.prodotti.btn.scaricaimg.esecuzione'))
                Ext.Ajax.request({
                    url: Backend.REST_API + 'grids/immagini/scaricaimgsingola',method: 'PUT',
                    binary: true,
                    jsonData: {data:rec.data,iduser:Ext.global.Vars.infoUser.id,username:Ext.global.Vars.infoUser.email,tag:Ext.global.Vars.infoApp.version.tagapp,filigrana: filigrana},
                    success: function (response) {
                        me.getView().el.unmask();
                        //imposto un elemento nascosto x fare il download con il nome file che mi arriva
                        let a = document.createElement('a');
                        document.body.appendChild(a);
                        a.style = 'display: none';
                        let headers = response.getAllResponseHeaders();
                        let fileName = response.getResponseHeader('Content-Disposition').split('filename=')[1];
                        if (fileName === 'null.zip') {
                            Ext.Msg.show({
                                title: Locale.t('global.avviso'),
                                msg: Locale.t('gpr.grids.immagini.btn.scarica.noimage'),
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.INFO
                            });
                            return
                        }
                        let blob = new Blob([response.responseBytes], {type: headers['content-type']});
                        let binaryFile = window.URL.createObjectURL(blob);
                        a.href = binaryFile;
                        a.download = fileName;
                        a.click();
                        window.URL.revokeObjectURL(binaryFile);
                    },
                    failure: function (response) {
                        me.getView().el.unmask()
                        let errore='Errore, file immagine non presente nel percorso selezionato'
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: errore,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {
                    xtype: 'radiogroup', hideLabel: true, simpleValue: true, name: 'filigrana', columns: 1,
                    items: [
                        {boxLabel: Locale.t('gpr.grids.prodotti.btn.scaricaimg.nofiligrana'), inputValue: 'NN'},
                        {boxLabel: Locale.t('gpr.grids.prodotti.btn.scaricaimg.acfiligrana'), inputValue: 'AC'},
                        {boxLabel: Locale.t('gpr.grids.prodotti.btn.scaricaimg.scfiligrana'), inputValue: 'SC'},
                        {boxLabel: Locale.t('gpr.grids.prodotti.btn.scaricaimg.lffiligrana'), inputValue: 'LS'}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('gpr.grids.immagini.btn.scarica.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onScaricaImmagini:function() {
        let me = this; //controller
        let filtrofam=me.filtrofam.getValue()
        if (!filtrofam) {filtrofam=''}
        let filtroveicolo=me.filtroveicolo.getValue()
        if (!filtroveicolo) {filtroveicolo=''}
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let filigrana=ff.findField('filigrana').getValue(); //id azienda
                if (!filigrana) {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('gpr.grids.prodotti.btn.scaricaimg.obbfiligrana'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                wndw.destroy();
                me.getView().el.mask(Locale.t('gpr.grids.prodotti.btn.scaricaimg.esecuzione'))
                Ext.Ajax.request({
                    method: 'PUT',timeout : 900000,
                    jsonData: {filigrana:filigrana,famiglia:filtrofam,veicolo:filtroveicolo},
                    url: Backend.REST_API + 'grids/immagini/scaricaimmagini',
                    binary:true,
                    success: function (response) {
                        me.getView().el.unmask()
                        //imposto un elemento nascosto x fare il download con il nome file che mi arriva
                        let a = document.createElement('a');
                        document.body.appendChild(a);
                        a.style = 'display: none';
                        let headers = response.getAllResponseHeaders();
                        let fileName = response.getResponseHeader('Content-Disposition').split('filename=')[1];
                        if (fileName === 'null.zip') {
                            Ext.Msg.show({
                                title: Locale.t('global.avviso'),
                                msg: Locale.t('gpr.grids.immagini.btn.scarica.noimage'),
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.INFO
                            });
                            return
                        }
                        let blob = new Blob([response.responseBytes], {type: headers['content-type']});
                        let binaryFile = window.URL.createObjectURL(blob);
                        a.href = binaryFile;
                        a.download = fileName;
                        a.click();
                        window.URL.revokeObjectURL(binaryFile);
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: response['statusText'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'container',
                    style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:blue;font-size:12px;" >'+Locale.t('gpr.grids.prodotti.btn.scaricaimg.msg')+'</span>'
                },
                {xtype: 'radiogroup', hideLabel:true,simpleValue: true,name:'filigrana', columns: 1,
                    items: [
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.nofiligrana'),inputValue:'NN'},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.acfiligrana'),inputValue:'AC'},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.scfiligrana'),inputValue:'SC'},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.lffiligrana'),inputValue:'LS'}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('gpr.grids.immagini.btn.scarica.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onScaricaImmaginiSel:function() {
        let me = this;
        let grid = me.getViewModel().getView(); //grid
        let imgSel = []; //array
        let selezione = grid.getSelectionModel().getSelection();
        //verifico siano stati selezionati records
        if (selezione.length === 0) {
            Ext.Msg.show({
                title: Locale.t("global.attenzione"),
                msg: Locale.t("global.btn.selrecord"),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR,
            });
            return;
        }
        let i;
        for (i = 0;i < selezione.length; i++) {
            imgSel.push(selezione[i].data.yimnom); //inserisco nome immagine
        }
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let filigrana=ff.findField('filigrana').getValue(); //id azienda
                if (!filigrana) {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('gpr.grids.prodotti.btn.scaricaimg.obbfiligrana'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                wndw.destroy();
                me.getView().el.mask(Locale.t('gpr.grids.prodotti.btn.scaricaimg.esecuzione'))
                Ext.Ajax.request({
                    method: 'PUT',timeout : 900000,
                    jsonData: {'filigrana':filigrana,'data':imgSel},
                    url: Backend.REST_API + 'grids/immagini/scaricaimmaginisel',
                    binary:true,
                    success: function (response) {
                        me.getView().el.unmask()
                        //imposto un elemento nascosto x fare il download con il nome file che mi arriva
                        let a = document.createElement('a');
                        document.body.appendChild(a);
                        a.style = 'display: none';
                        let headers = response.getAllResponseHeaders();
                        let fileName = response.getResponseHeader('Content-Disposition').split('filename=')[1];
                        if (fileName === 'null.zip') {
                            Ext.Msg.show({
                                title: Locale.t('global.avviso'),
                                msg: Locale.t('gpr.grids.immagini.btn.scarica.noimage'),
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.INFO
                            });
                            return
                        }
                        let blob = new Blob([response.responseBytes], {type: headers['content-type']});
                        let binaryFile = window.URL.createObjectURL(blob);
                        a.href = binaryFile;
                        a.download = fileName;
                        a.click();
                        window.URL.revokeObjectURL(binaryFile);
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: response['statusText'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'container',
                    style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:blue;font-size:12px;" >'+Locale.t('gpr.grids.prodotti.btn.scaricaimg.msg')+'</span>'
                },
                {xtype: 'radiogroup', hideLabel:true,simpleValue: true,name:'filigrana', columns: 1,
                    items: [
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.nofiligrana'),inputValue:'NN'},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.acfiligrana'),inputValue:'AC'},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.scfiligrana'),inputValue:'SC'},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.lffiligrana'),inputValue:'LS'}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('gpr.grids.immagini.btn.scarica.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})