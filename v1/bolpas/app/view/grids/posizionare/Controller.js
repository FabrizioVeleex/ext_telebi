/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.posizionare.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.posizionare',
    requires:[
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'bolpas.view.forms.bolla.Panel'
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
        this.getView().fireEvent('createTab',Ext.create('bolpas.view.forms.bolla.Panel', {
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
            {text: Locale.t('bolpas.grids.column.numreg'),dataIndex: 'numreg', width: 150,filter: {type: 'string'}},
            {text: Locale.t('bolpas.grids.column.datareg'),dataIndex: 'datareg', width: 150, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('bolpas.grids.column.datadoc'),dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('bolpas.grids.column.numero'), dataIndex: 'numero', width:300,filter: {type: 'string'}},
            {text: Locale.t('bolpas.grids.column.soggetto'), dataIndex: 'soggetto',flex:1,filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})