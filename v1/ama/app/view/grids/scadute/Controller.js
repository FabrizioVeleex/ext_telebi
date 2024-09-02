/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ama.view.grids.scadute.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.scadute',
    requires:[
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'ama.view.forms.scheda.Panel'
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
        this.getView().fireEvent('createTab',Ext.create('ama.view.forms.scheda.Panel', {
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
            {text: Locale.t('ama.grids.schede.column.numero'), dataIndex: 'numero', width:100,filter: {type: 'string'}},
            {text: Locale.t('ama.grids.schede.column.richiesta'), dataIndex: 'richiesta',width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('ama.grids.schede.column.scadenza'), dataIndex: 'scadenza',width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('ama.grids.schede.column.articolo'), dataIndex: 'articolo',flex:1,filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})