/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.steps.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.steps',

    requires: [
        'Ext.grid.column.Action',
        'portal.util.Functions',
        'vda.model.grids.Steps',
        'vda.view.forms.step.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99'])){
            this.listBtnTop.push({
                tooltip: Locale.t('vda.grids.steps.btn.new.tooltip'),
                text: Locale.t('vda.grids.steps.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('vda.model.grids.Steps',{
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
        this.getView().fireEvent('createTab',Ext.create('vda.view.forms.step.Panel', {
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
            {text:Locale.t('vda.grids.steps.column.valore'), dataIndex: 'valore', width:100},
            {text:Locale.t('vda.grids.steps.column.descit'), dataIndex: 'descit', flex:1}
        ]
        this.callParent(arguments)
    }
})