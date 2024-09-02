/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.bozze.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.bozze',
    requires:[
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'portal.util.Functions',
        'rec.model.grids.Resi',
        'rec.view.forms.bozza.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','4'])){
            this.listBtnTop.push({
                tooltip: Locale.t('rec.grids.bozze.btn.new.tooltip'),
                text: Locale.t('rec.grids.bozze.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('rec.model.grids.Resi',{
            id :bdFunctions.bpRandomString(32),
            isnew:1
        });
        this.createForm(view,NewRecord,1)
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('rec.view.forms.bozza.Panel', {
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
            {text: Locale.t('rec.grids.bozze.column.datadoc'), dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date', dateFormat: 'Ymd'}},
            {text: Locale.t('rec.grids.bozze.column.cdcli'), dataIndex: 'cdcli', width: 90, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.bozze.column.ragsoc'), dataIndex: 'ragsoc', flex: 1, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.bozze.column.nomecognome'), dataIndex: 'nomecognome', width: 300, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
})