/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('webord.view.grids.ordini.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-ordini',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.layout.container.HBox',
        'Ext.window.Window',
        'webord.view.forms.ordine.Panel'
    ],
    init: function () {
        this.callParent(arguments)
    },
    //funzione x gestire tasti
    checkColumn: function(griglia) {
        let nodo=this.getView().infoNode;
        if (!nodo) {
            return;
        }
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        //esportazione excel
       if (nodo.itemId==='trasmessi') {
           this.toolbar.add({
               tooltip: Locale.t('webord.grids.btn.esporta.tooltip'),
               text: Locale.t('webord.grids.btn.esporta.text'),
               ui: 'blue',
               iconCls: 'x-fas fa-file-excel',
               handler: 'onEsporta'
           });
       }
        let colonne = griglia.getColumns()
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'ordine_gestionale') {
                if (nodo.itemId === 'trasmessi') {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
        }
    },
    createForm: function (view, record, isnew) {
        let itemId = 'f' + record.data.id;
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('webord.view.forms.ordine.Panel', {
            itemId: 'f' + record.data.id,
            record: record,
            valori: {
                id:record.data.id,
                idpadre:record.data.id_ordine.toString(),
                isnew: isnew
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns = [
            {xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('webord.grids.ordini.column.data_ordine'), dataIndex: 'data_ordine', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('webord.grids.ordini.column.id_ordine'), dataIndex: 'id_ordine', width: 100, filter: {type: 'numeric'}},
            {text: Locale.t('webord.grids.ordini.column.codice_cliente'), dataIndex: 'codice_cliente',width:100,filter: {type: 'string'}},
            {text: Locale.t('webord.grids.ordini.column.ragsoc'), dataIndex: 'ragsoc', flex:1,filter: {type: 'string'}},
            {text: Locale.t('webord.grids.ordini.column.email_cliente'), dataIndex: 'email_cliente', width:300,filter: {type: 'string'}},
            {text: Locale.t('webord.grids.ordini.column.ordine_gestionale'), dataIndex: 'ordine_gestionale', width: 120, filter: {type: 'numeric'}}
        ]
        this.callParent(arguments)
    },
    onEsporta:function() {
        let me = this
        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                wndw.destroy()
                me.getView().el.mask(Locale.t('global.actions.incorso'))
                Ext.Ajax.request({
                    method: 'GET', timeout: 900000,
                    url: Backend.REST_API + 'grids/esporta',
                    success: function (response) {
                        let rest = Ext.decode(response.responseText);
                        me.getView().el.unmask()
                        me.onDownloadFile(rest['token'])
                    },
                    failure: function (a) {
                        me.getView().el.unmask()
                        let rest = Ext.decode(a.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: rest['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'container', layout: 'hbox', defaults: {margin: 5,labelAlign:'top'}, items: [

                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('webord.grids.btn.esporta.text'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    },
});