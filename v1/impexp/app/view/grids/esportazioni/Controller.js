/**
 * Created by luca on 16/02/2017.
 */
Ext.define('impexp.view.grids.esportazioni.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.esportazioni',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.layout.container.HBox',
        'Ext.window.Window',
        'impexp.view.forms.esportazione.Panel'
    ],
    init: function () {
        this.callParent(arguments)
    },
    onCheckView:function() {
        let nodo=this.getView().infoNode;
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        if (nodo.idpadre!=='NaN') {
            this.toolbar.add({
                tooltip: Locale.t('impexp.grids.esportazioni.btn.new.tooltip'),
                text: Locale.t('impexp.grids.esportazioni.btn.new.text'),
                ui: 'green',
                idmodulo:nodo.idpadre,
                iconCls: 'x-fas fa-file-excel',
                handler: 'onEsporta'
            })
        }
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('impexp.view.forms.esportazione.Panel', {
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
                items: [{handler: 'onDownloadExport', iconCls: 'x-fas fa-download', tooltip: Locale.t('impexp.grids.importazioni.column.download')}]
            },
            {text:Locale.t('impexp.grids.esportazioni.column.creationdate'), dataIndex: 'creationdate', width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date', dateFormat: 'Ymd'}},
            {text:Locale.t('impexp.grids.esportazioni.column.autore'), dataIndex: 'autore', width:350, filter: {type: 'string'}},
            {text:Locale.t('impexp.grids.esportazioni.column.nomefile'), dataIndex: 'nomefile', flex:1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    //scarico file esportato
    onDownloadExport:function(view, rowIndex, colIndex, item, opt, rec) {
        let me = this
        Ext.Ajax.request({
            url: Backend.REST_VERSION + 'getattach', method: 'POST',
            jsonData: {data:rec.data,iduser:Ext.global.Vars.infoUser.id,username:Ext.global.Vars.infoUser.email,tag:Ext.global.Vars.infoApp.version.tagapp},
            success: function (response) {
                let resp = Ext.decode(response.responseText);
                me.onDownloadFile(resp['token'])
            },
            failure: function (response) {
                let resp = Ext.decode(response.responseText);
                let errore = Locale.t('global.attach.errordownload') + ': ' + resp['msg']
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: errore,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        })
    },
    //funzione exportazione
    onEsporta:function(btn) {
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
                    params: {idmodulo:btn.idmodulo},
                    url: Backend.REST_API + 'grids/esporta',
                    success: function (response) {
                        let rest = Ext.decode(response.responseText);
                        me.getView().el.unmask()
                        me.getView().getStore().reload()
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
                        {xtype:'box',html:Locale.t('impexp.grids.esportazioni.btn.new.msg'), flex:1}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title:btn.title,
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    }
})