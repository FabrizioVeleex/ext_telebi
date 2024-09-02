/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.ruoli.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.ruoli',
    requires:[
        'Ext.grid.column.Action',
        'amm.model.grids.Ruoli',
        'amm.view.forms.ruolo.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','1'])){
            this.listBtnTop.push({
                tooltip: Locale.t('amm.grids.ruoli.btn.new.tooltip'),
                text: Locale.t('amm.grids.ruoli.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            })
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('amm.model.grids.Ruoli',{
            id :bdFunctions.bpRandomString(32),
            isnew:1,
            status:1
        });
        this.createForm(view,NewRecord,1);
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('amm.view.forms.ruolo.Panel', {
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
            {text:Locale.t('amm.grids.ruoli.column.codice'), dataIndex: 'codice', width:150, filter: {type: 'string'}},
            {text:Locale.t('amm.grids.ruoli.column.nome'), dataIndex: 'nome',width:400, filter: {type: 'string'}},
            {text:Locale.t('amm.grids.ruoli.column.descrizione'), dataIndex: 'descrizione',flex:1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})