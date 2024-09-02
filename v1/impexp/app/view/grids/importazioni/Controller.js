/**
 * Created by luca on 16/02/2017.
 */
Ext.define('impexp.view.grids.importazioni.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.importazioni',

    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'impexp.model.grids.Importazioni',
        'impexp.view.forms.importazione.Panel',
        'portal.util.Functions'
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
                tooltip: Locale.t('impexp.grids.importazioni.btn.new.tooltip'),
                text: Locale.t('impexp.grids.importazioni.btn.new.text'),
                ui: 'green',
                idmodulo:nodo.idpadre,
                iconCls: 'x-fas fa-file-excel',
                handler: 'onNew'
            });
        }
    },
    onNew: function(btn) {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('impexp.model.grids.Importazioni',{
            id :bdFunctions.bpRandomString(32),
            isnew:1
        });
        this.createForm(view,NewRecord,1,btn.idmodulo);
    },
    createForm: function(view,record,isnew,idmodulo){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('impexp.view.forms.importazione.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew,
                idmodulo: idmodulo
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onDownloadImport', iconCls: 'x-fas fa-download', tooltip: Locale.t('impexp.grids.importazioni.column.download')}]
            },
            {text:Locale.t('impexp.grids.importazioni.column.creationdate'), dataIndex: 'creationdate', width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date', dateFormat: 'Ymd'}},
            {text:Locale.t('impexp.grids.importazioni.column.autore'), dataIndex: 'autore', width:350, filter: {type: 'string'}},
            {text:Locale.t('impexp.grids.importazioni.column.nomefile'), dataIndex: 'nomefile', flex:1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    //scarico file importato
    onDownloadImport:function(view, rowIndex, colIndex, item, opt, record) {
        let me = this
        let rec=record
        //modifico 2 valori x avere il download standard
        rec.data.id=rec.data.idallegato
        rec.data.file=rec.data.nomefile
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
    }
})