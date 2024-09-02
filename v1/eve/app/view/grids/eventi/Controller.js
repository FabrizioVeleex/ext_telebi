/**
 * Created by luca on 16/02/2017.
 */
Ext.define('eve.view.grids.eventi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.eventi',
    requires:[
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'eve.model.grids.Eventi',
        'eve.view.forms.evento.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','1'])){
            this.listBtnTop.push({
                tooltip: Locale.t('eve.grids.eventi.btn.new.tooltip'),
                text: Locale.t('eve.grids.eventi.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('eve.model.grids.Eventi',{
            id :bdFunctions.bpRandomString(32),
            isnew:1
        });
        this.createForm(view,NewRecord,1);
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('eve.view.forms.evento.Panel', {
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
            {text: Locale.t('eve.grids.eventi.column.nome'), dataIndex: 'nome',flex: 1, minWidth: 200, filter: {type: 'string'}},
            {text: Locale.t('eve.grids.eventi.column.luogo'), dataIndex: 'luogo', width: 350, filter: {type: 'string'}},
            {text: Locale.t('eve.grids.eventi.column.datain'), dataIndex: 'datain', width: 120, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('eve.grids.eventi.column.datafin'), dataIndex: 'datafin', width: 120, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}}
        ]
        this.callParent(arguments)
    }
})