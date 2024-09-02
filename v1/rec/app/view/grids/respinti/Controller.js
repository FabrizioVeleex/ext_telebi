/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.respinti.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.respinti',
    requires:[
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'rec.view.forms.reso.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        this.callParent(arguments)
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('rec.view.forms.reso.Panel', {
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
            {text: Locale.t('rec.grids.respinti.column.progressivo'), dataIndex: 'progressivo', width: 120, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.respinti.column.datadoc'), dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date', dateFormat: 'Ymd'}},
            {text: Locale.t('rec.grids.respinti.column.cdcli'), dataIndex: 'cdcli', width: 90, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.respinti.column.ragsoc'), dataIndex: 'ragsoc', flex: 1, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.respinti.column.tipo'), dataIndex: 'tipo', width: 200, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})