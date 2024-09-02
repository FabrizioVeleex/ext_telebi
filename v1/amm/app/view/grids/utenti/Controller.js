/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.utenti.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.utenti',
    requires:[
        'Ext.grid.column.Action',
        'amm.view.forms.utente.Panel'
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
        this.getView().fireEvent('createTab',Ext.create('amm.view.forms.utente.Panel', {
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
            {text:Locale.t('amm.grids.utenti.column.cognome'), dataIndex: 'cognome', width:400, filter: {type: 'string'}},
            {text:Locale.t('amm.grids.utenti.column.nome'), dataIndex: 'nome',width:400, filter: {type: 'string'}},
            {text:Locale.t('amm.grids.utenti.column.desktop'), dataIndex: 'desktop',flex:1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})