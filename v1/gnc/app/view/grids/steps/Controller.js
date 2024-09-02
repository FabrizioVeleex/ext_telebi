/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.steps.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.steps',

    requires: [
        'Ext.grid.column.Action',
        'gnc.model.grids.Steps',
        'gnc.view.forms.step.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99'])){
            this.listBtnTop.push({
                tooltip: Locale.t('gnc.grids.steps.btn.new.tooltip'),
                text: Locale.t('gnc.grids.steps.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('gnc.model.grids.Steps',{
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
        this.getView().fireEvent('createTab',Ext.create('gnc.view.forms.step.Panel', {
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
            {text:Locale.t('gnc.grids.steps.column.valore'), dataIndex: 'valore', width:100},
            {text:Locale.t('gnc.grids.steps.column.descit'), dataIndex: 'descit', flex:1}
        ]
        this.callParent(arguments)
    }
})