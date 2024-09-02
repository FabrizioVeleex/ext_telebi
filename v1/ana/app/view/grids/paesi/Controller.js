/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.paesi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.paesi',
    requires: [
        'Ext.grid.column.Action',
        'ana.model.grids.Paesi',
        'ana.view.forms.paese.Panel',
        'portal.util.Functions'
    ],

    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','10'])){
            this.listBtnTop.push({
                tooltip: Locale.t('ana.grids.paesi.btn.new.tooltip'),
                text: Locale.t('ana.grids.paesi.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            })
        }
        this.callParent(arguments)
    },
    //nuovo
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('ana.model.grids.Paesi',{
            id :bdFunctions.bpRandomString(32),
            isnew:1,
            status:1
        });
        this.createForm(view,NewRecord,1);
    },
    createForm: function (view, record, isnew) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('ana.view.forms.paese.Panel', {
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
            {text: Locale.t('ana.grids.paesi.column.alpha2'), dataIndex: 'alpha2', width:200, filter: {type: 'string'}},
            {text: Locale.t('ana.grids.paesi.column.alpha3'), dataIndex: 'alpha3', width:200, filter: {type: 'string'}},
            {text: Locale.t('ana.grids.paesi.column.langit'), dataIndex: 'langit', flex:1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
});