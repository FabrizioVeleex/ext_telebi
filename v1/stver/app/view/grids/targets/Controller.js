/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stver.view.grids.targets.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.targets',
    requires:[
        'Ext.grid.column.Action',
        'portal.util.Functions',
        'stver.model.grids.Targets',
        'stver.view.forms.target.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99'])){
            this.listBtnTop.push({
                tooltip: Locale.t('stver.grids.targets.btn.new.tooltip'),
                text: Locale.t('stver.grids.targets.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('stver.model.grids.Targets',{
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
        this.getView().fireEvent('createTab',Ext.create('stver.view.forms.target.Panel', {
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
            {text: Locale.t('stver.grids.targets.column.anno'), dataIndex: 'anno', width:100,filter: {type: 'numeric'}},
            {text: Locale.t('stver.grids.targets.column.codstab'), dataIndex: 'codstab', width:300,filter: {type: 'string'}},
            {text: Locale.t('stver.grids.targets.column.stabilimento'), dataIndex: 'stabilimento', flex:1,filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})