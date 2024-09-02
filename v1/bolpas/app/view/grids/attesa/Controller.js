/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.attesa.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.attesa',
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
            {text: Locale.t('bolpas.grids.column.creationdate'),dataIndex: 'creationdate', width: 180, xtype: 'datecolumn', format: 'd/m/Y H:i:s', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('bolpas.grids.column.descrizione'), dataIndex: 'descrizione', width:350,filter: {type: 'string'}},
            {text: Locale.t('bolpas.grids.column.spool'), dataIndex: 'spool',flex:1,filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})