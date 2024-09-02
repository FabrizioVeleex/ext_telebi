/**
 * Created by luca on 17/07/2018.
 */
Ext.define('mcd.view.grids.archivio.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.archivio',
    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'mcd.model.grids.Archivio',
        'mcd.view.forms.modulo.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','1'])){
            this.listBtnTop.push({
                tooltip: Locale.t('mcd.grids.archivio.btn.new.tooltip'),
                text: Locale.t('mcd.grids.archivio.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            })
        }
        //rigenerazione PDF
        if (this.checkRuoli(['99'])){
            this.listBtnTop.push({
                tooltip: Locale.t('mcd.grids.archivio.btn.rigenerapdf.tooltip'),
                text: Locale.t('mcd.grids.archivio.btn.rigenerapdf.text'),
                ui: 'blue',
                iconCls: 'icon-pdf',
                handler: 'onRigeneraPdf'
            })
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('mcd.model.grids.Archivio',{
            id :bdFunctions.bpRandomString(32),
            isnew:1,
            status:1
        });
        this.createForm(view,NewRecord,1);
    },
    createForm: function (view, record, isnew) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('mcd.view.forms.modulo.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('mcd.grids.archivio.column.consegna'), dataIndex: 'consegna',width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('mcd.grids.archivio.column.dip_nome'), dataIndex: 'dip_nome', flex:1,filter: {type: 'string'}},
            {text: Locale.t('mcd.grids.archivio.column.sede'), dataIndex: 'sede', width:250,filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    //rigenera pdf
    onRigeneraPdf:function() {
        let me = this
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
                msg: Locale.t('mcd.grids.archivio.btn.rigenerapdf.select'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        let btnX = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                me.view.el.mask(Locale.t("global.actions.incorso"));
                wndw.hide();
                Ext.Ajax.request({
                    method: "PUT",
                    jsonData:{data:recordsGood},
                    url: Backend.REST_API + "grids/actions/rigenerapdf",
                    success: function () {
                        me.getView().el.unmask()
                        me.getView().getSelectionModel().deselectAll(); //pulisco selezioni
                        me.getView().getStore().load();
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype:'box',html:'Esegue la rigenerazione PDF sulla base della select codice backend'}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('mcd.grids.archivio.btn.rigenerapdf.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
});