/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.funzioni.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.funzioni',

    requires: [
        'Ext.grid.column.Action',
        'gpr.model.grids.Funzioni',
        'gpr.view.forms.funzione.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','20'])){
            this.listBtnTop.push({
                tooltip: Locale.t('gpr.grids.funzioni.btn.new.tooltip'),
                text: Locale.t('gpr.grids.funzioni.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('gpr.model.grids.Funzioni',{
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
        this.getView().fireEvent('createTab',Ext.create('gpr.view.forms.funzione.Panel', {
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
            {text: Locale.t('gpr.grids.funzioni.column.codice'), dataIndex: 'codice', width:200, filter: {type: 'string'}},
            {text: Locale.t('gpr.grids.funzioni.column.descrizione'), dataIndex: 'descrizione', flex: 1, filter: {type: 'string'}},
            {text: Locale.t('gpr.grids.funzioni.column.colonna'), dataIndex: 'colonna', width:200, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})