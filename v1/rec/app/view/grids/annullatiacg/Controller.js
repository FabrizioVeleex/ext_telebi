/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.annullatiacg.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.annullatiacg',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'rec.view.forms.documento.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        /*
        if (this.checkRuoli(['99','2'])){
            this.listBtnTop.push({
                tooltip: Locale.t('rec.grids.annullatiacg.btn.ripristina.tooltip'),
                text: Locale.t('rec.grids.annullatiacg.btn.ripristina.text'),
                ui:'green',
                iconCls: 'x-fas fa-undo',
                handler: 'onRipristina'
            });
        }
         */
        this.callParent(arguments)
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('rec.view.forms.documento.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew
            }
        }),view)
    },
    //Ripristina reclamo
    onRipristina: function() {
        let me = this; //controller
        let recordsGood = []; //array
        let records =this.getView().getSelectionModel().getSelection();
        let i;
        let len = records.length;
        for (i = 0;i < len; i++) {
            recordsGood.push(records[i].data.id); //inserisco record
        }
        //verifico siano stati selezionati records
        if (recordsGood.length===0) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('rec.grids.selrecord'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t('global.actions.incorso'));
                Ext.Ajax.request({
                    method: 'PUT',
                    jsonData:{data:recordsGood,azione:'R',tabella:'TBSPEREC01'},
                    url: Backend.REST_API + 'main/changestato',
                    success: function (response) {
                        let resp = Ext.decode(response.responseText);
                        if (typeof resp.msg!=='undefined') {
                            Ext.Msg.show({
                                title: Locale.t('global.errore'),
                                msg: resp['msg'],
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                        me.getView().el.unmask();
                        me.getView().getSelectionModel().deselectAll(); //pulisco selezioni
                        me.getView().getStore().load();
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: resp['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                })
            }
        })
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'container',
                    style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:red;font-size:12px;" >'+Locale.t('rec.grids.annullati.btn.ripristina.messaggio')+'</span>'
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('rec.grids.annullatiacg.btn.ripristina.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        })
        wndw.show();
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {xtype: 'actioncolumn', width: 30, menuDisabled:true,dataIndex:'action2',
                items: [{
                    getClass: function (v, metadata, r) {
                        let dataletto
                        if (r.data.letto=== 'S') {
                            if (r.data.dataletto !== '') {
                                dataletto = Ext.Date.format(r.data.dataletto, 'd/m/Y H:i:s');
                                metadata.tdAttr = 'data-qtip="' + Locale.t('rec.grids.letto') + ' ' + dataletto + '"';
                            } else {
                                metadata.tdAttr = 'data-qtip="' + Locale.t('rec.grids.letto');
                            }
                            return "x-fas fa-envelope bd-color-orange";
                        }
                        //scaricato
                        if (r.data.letto === 'T') {
                            dataletto = Ext.Date.format(r.data.dataletto, 'd/m/Y H:i:s');
                            metadata.tdAttr = 'data-qtip="' + Locale.t('rec.grids.scaricato') + ' ' + dataletto + '"';
                            return "x-fas fa-envelope bd-color-green";
                        }
                        return "null";
                    }
                }]
            },
            {text:Locale.t('rec.grids.annullatiacg.column.anno'),dataIndex: 'anno', width:90, filter: {type: 'numeric'}},
            {text:Locale.t('rec.grids.annullatiacg.column.numero'), dataIndex: 'numero', width:120, filter: {type: 'string'}},
            {text:Locale.t('rec.grids.annullatiacg.column.datadoc'), dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text:Locale.t('rec.grids.annullatiacg.column.cdcli'), dataIndex: 'cdcli', width:90, filter: {type: 'string'}},
            {text:Locale.t('rec.grids.annullatiacg.column.ragsoc'), dataIndex: 'ragsoc', width:200, filter: {type: 'string'}},
            {text:Locale.t('rec.grids.annullatiacg.column.descrizione'), dataIndex: 'descrizione', flex:1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})