/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stcom.view.grids.nobudgets.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.nobudgets',
    requires:[
        'Ext.grid.column.Action',
        'stcom.view.forms.budget.Panel'
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
        this.getView().fireEvent('createTab',Ext.create('stcom.view.forms.budget.Panel', {
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
            {text: Locale.t('stcom.grids.budgets.columns.cdcli'), dataIndex: 'cdcli', width:300,filter: {type: 'string'}},
            {text: Locale.t('stcom.grids.budgets.columns.ragsoc'), dataIndex: 'ragsoc', flex:1,filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})