/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.responsabili.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.responsabili',
    requires:[
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'gnc.view.forms.scheda.Panel'
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
        this.getView().fireEvent('createTab',Ext.create('gnc.view.forms.scheda.Panel', {
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
            {text: Locale.t('gnc.grids.incorso.column.numero'), dataIndex: 'numero', width: 90, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.datadoc'), dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date', dateFormat: 'Ymd'}},
            {text: Locale.t('gnc.grids.incorso.column.cdart'), dataIndex: 'cdart', width: 150, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.articolo'), dataIndex: 'articolo', flex:1, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.stabilimento'), dataIndex: 'stabilimento', width: 200, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.descit'), dataIndex: 'descit', width: 200, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})