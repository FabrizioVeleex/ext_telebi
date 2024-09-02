/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.province.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.province',
    requires: [
        'Ext.grid.column.Action',
        'ana.model.grids.Province',
        'ana.view.forms.provincia.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','10'])){
            this.listBtnTop.push({
                tooltip: Locale.t('ana.grids.province.btn.new.tooltip'),
                text: Locale.t('ana.grids.province.btn.new.text'),
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
        let NewRecord = Ext.create('ana.model.grids.Province',{
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
        this.getView().fireEvent('createTab',Ext.create('ana.view.forms.provincia.Panel', {
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
            {text: Locale.t('ana.grids.province.column.codice'), dataIndex: 'codice', width:100, filter: {type: 'string'}},
            {text: Locale.t('ana.grids.province.column.provincia'), dataIndex: 'provincia', flex:1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
});