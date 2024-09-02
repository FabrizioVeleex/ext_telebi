/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.attive.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.attive',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'portal.util.Functions',
        'sdc.model.grids.attive.Model',
        'sdc.view.forms.shared.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','1'])){
            this.listBtnTop.push({
                tooltip: Locale.t('sdc.grids.attive.btn.new.tooltip'),
                text: Locale.t('sdc.grids.attive.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }

        this.callParent(arguments)
    },

    onRowDbClick: function (view, record) {
        this.createForm(view, record, 0); //apertura da doppio click
    },
    onNew: function () {
        let view = this.getView().view,
            NewRecord = Ext.create('sdc.model.grids.attive.Model', {
                id: bdFunctions.bpRandomString(32),
                isnew: 1
            });
        this.createForm(view, NewRecord, 1);
    },
    createForm: function(view,record,isnew,tipo){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }

        this.getView().fireEvent('createTab',Ext.create('sdc.view.forms.shared.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            storeForm: view.getStore(),
            valori: {
                id: record.data['id'],
                isnew: isnew,
                tipo: tipo
            }
        }),view)
    },

    onafterrendergrid: function (grid) {
        grid.myColumns = [
            {
                xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {
                text: Locale.t('sdc.grids.attive.columns.datestart'),
                dataIndex: 'creationdate',
                width: 120,
                xtype: 'datecolumn',
                format: 'd/m/Y',
                filter: {type: 'date', dateFormat: 'Y-m-d'}
            },
            {
                text: Locale.t('sdc.grids.attive.columns.datestop'),
                dataIndex: 'datestop',
                width: 120,
                xtype: 'datecolumn',
                format: 'd/m/Y',
                filter: {type: 'date', dateFormat: 'Y-m-d'}
            },
            {
                text: Locale.t('sdc.grids.attive.columns.nomecognome'),
                dataIndex: 'nomecognome',
                width: 250,
                filter: {type: 'string'}
            },
            {
                text: Locale.t('sdc.grids.attive.columns.subject'),
                dataIndex: 'subject',
                flex: 1,
                filter: {type: 'string'}
            }
        ]
        this.callParent(arguments)
    },
});