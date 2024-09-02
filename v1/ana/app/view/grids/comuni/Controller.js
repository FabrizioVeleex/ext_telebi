/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.comuni.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.comuni',
    requires: [
        'Ext.grid.column.Action',
        'ana.model.grids.Comuni',
        'ana.view.forms.comune.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','10'])){
            this.listBtnTop.push({
                tooltip: Locale.t('ana.grids.comuni.btn.new.tooltip'),
                text: Locale.t('ana.grids.comuni.btn.new.text'),
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
        let NewRecord = Ext.create('ana.model.grids.Comuni',{
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
        this.getView().fireEvent('createTab',Ext.create('ana.view.forms.comune.Panel', {
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
            {text: Locale.t('ana.grids.comuni.column.comune'), dataIndex: 'comune',flex:1, filter: {type: 'string'}},
            {text: Locale.t('ana.grids.comuni.column.provincia'), dataIndex: 'provincia', width:100, filter: {type: 'string'}},
            {text: Locale.t('ana.grids.comuni.column.regione'), dataIndex: 'regione', width:300, filter: {type: 'string'}},
            {text: Locale.t('ana.grids.comuni.column.cap'), dataIndex: 'cap', width:100, filter: {type: 'string'}},
            {text: Locale.t('ana.grids.comuni.column.codfis'), dataIndex: 'codfis', width:100, filter: {type: 'string'}},
            {text: Locale.t('ana.grids.comuni.column.codistat'), dataIndex: 'codistat', width:100, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
});