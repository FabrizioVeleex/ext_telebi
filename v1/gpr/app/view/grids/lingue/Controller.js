/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.lingue.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.lingue',

    requires: [
        'Ext.grid.column.Action',
        'gpr.model.grids.Lingue',
        'gpr.view.forms.lingua.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','20'])){
            this.listBtnTop.push({
                tooltip: Locale.t('gpr.grids.lingue.btn.new.tooltip'),
                text: Locale.t('gpr.grids.lingue.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('gpr.model.grids.Lingue',{
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
        this.getView().fireEvent('createTab',Ext.create('gpr.view.forms.lingua.Panel', {
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
            {text:Locale.t('gpr.grids.lingue.column.codice'), dataIndex: 'codice', width:200, filter: {type: 'string'}},
            {text:Locale.t('gpr.grids.lingue.column.descrizione'), dataIndex: 'descrizione', flex:1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})