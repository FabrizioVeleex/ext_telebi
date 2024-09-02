/**
 * Created by luke on 14/02/24.
 */
Ext.define('cde.view.grids.listbase.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-cde-listbase',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'cde.view.forms.listbase.Panel'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('checksede',false)
        this.callParent(arguments)
    },
    //funzione x params alla prima apertura
    beforeload:function(s) {
        let view = this.getView()
        if (view.infoNode) {
            s.proxy.extraParams.idpadre = view.infoNode.idpadre
        }
    },
    //funzione x gestire campi colonne
    checkColumn: function(griglia) {
        let nodo=this.getView().infoNode;
        if (!nodo) {
            return;
        }
        //nascondo colonna selezione se vista non filtrata
        let colonne = griglia.getColumns()
        if (nodo['idpadre'] === 'NaN') {
            colonne[0].hide();
        } else {
            colonne[0].show();
        }
        //gestione menu
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        if (this.checkRuoli(['99','1'])){
            if (nodo.idpadre==='-1' || nodo.idpadre==='0') {
                this.toolbar.add({
                    tooltip: Locale.t('cde.grids.listbase.btn.sitook.tooltip'),
                    text: Locale.t('cde.grids.listbase.btn.sitook.text'),
                    msg: Locale.t('cde.grids.listbase.btn.sitook.msg'),
                    ui: 'blue', iconCls: 'x-fas fa-share-alt',
                    azione:1, //trasmette al sito
                    handler: 'onAzione'
                })
            }
            if (nodo.idpadre==='1' || nodo.idpadre==='0') {
                this.toolbar.add({
                    tooltip: Locale.t('cde.grids.listbase.btn.sitoko.tooltip'),
                    text: Locale.t('cde.grids.listbase.btn.sitoko.text'),
                    msg: Locale.t('cde.grids.listbase.btn.sitoko.msg'),
                    ui: 'blue', iconCls: 'x-fas fa-backspace',
                    azione:-1, //NON trasmette al sito
                    handler: 'onAzione'
                })
            }
        }
    },
    createForm: function (view, record, isnew) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('cde.view.forms.listbase.Panel', {
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
            {text: Locale.t('cde.grids.listbase.column.cd_art'), dataIndex: 'cd_art', width:120,filter: {type: 'string'}},
            {text: Locale.t('cde.grids.listbase.column.descr_art'), dataIndex: 'descr_art', flex:1,filter: {type: 'string'}},
            {text: Locale.t('cde.grids.listbase.column.datestart'), dataIndex: 'datestart',width:150,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('cde.grids.listbase.column.dateend'), dataIndex: 'dateend',width:150,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('cde.grids.listbase.column.cd_gruppo'), dataIndex: 'cd_gruppo', width:100,filter: {type: 'string'}},
            {text: Locale.t('cde.grids.listbase.column.prezzo'), dataIndex: 'prezzo', width:100,filter: {type: 'number'},
                renderer: function (v) {
                    return Ext.util.Format.currency(v, '€ ', 2);
                }
            }
        ]
        this.callParent(arguments)
    },
    //azioni trasmissione
    onAzione:function(btn) {
        let me = this; //controller
        let recordsGood = []; //array
        let records =this.getView().getSelectionModel().getSelection();
        let i;
        let len = records.length;
        for (i = 0;i < len; i++) {
            recordsGood.push(records[i].data); //inserisco record
        }
        //verifico siano stati selezionati records
        if (recordsGood.length===0) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('cde.grids.listbase.obbrec'),
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
                    jsonData:{data:recordsGood,azione:btn.azione,listino:'base'}, //passo anche listino riferimento
                    url: Backend.REST_API + 'grids/actions/changesito',
                    success: function () {
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
                    html: '<span style="font-weight:bold;color:blue;font-size:12px;" >'+btn.msg+'</span>'
                }
            ]
        })
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: btn.text,
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    }
});