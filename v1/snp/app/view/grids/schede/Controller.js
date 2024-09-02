/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('snp.view.grids.schede.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-schede',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'portal.util.Functions',
        'snp.model.grids.Schede',
        'snp.view.forms.scheda.Panel'
    ],
    init: function () {
        this.callParent(arguments)
    },
    //funzione x gestire tasti
    checkColumn: function() {
        let nodo=this.getView().infoNode;
        if (!nodo) {
            return;
        }
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        if (nodo.itemId==='compilate' && this.checkRuoli(['99','1' ,'10'])){
            this.toolbar.add({
                tooltip: Locale.t('snp.grids.schede.btn.new.tooltip'),
                text: Locale.t('snp.grids.schede.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
    },
    onNew: function () {
        let view = this.getView().view,
            newRecord = Ext.create('snp.model.grids.Schede', {
                id: bdFunctions.bpRandomString(32),
                isnew: 1
            });
        this.createForm(view, newRecord, 1);
    },
    createForm: function (view, record, isnew) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('snp.view.forms.scheda.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns = [
            {xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('snp.grids.schede.column.datadoc'), dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('snp.grids.schede.column.numero'), dataIndex: 'numero', width: 100, filter: {type: 'string'}},
            {text: Locale.t('snp.grids.schede.column.tipologia'), dataIndex: 'tipologia', width:200, filter: {type: 'string'}},
            {text: Locale.t('snp.grids.schede.column.marca'), dataIndex: 'marca', width:250, filter: {type: 'string'}},
            {text: Locale.t('snp.grids.schede.column.modello'), dataIndex: 'modello',flex:1, filter: {type: 'string'}},
            {text: Locale.t('snp.grids.schede.column.codiceoe'), dataIndex: 'codiceoe',width:200, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
});