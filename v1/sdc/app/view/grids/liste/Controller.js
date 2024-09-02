/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.liste.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.liste',
    requires: [
        'Ext.grid.column.Action',
        'portal.util.Functions',
        'sdc.model.grids.liste.Model',
        'sdc.view.forms.lista.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99', '1'])) {
            this.listBtnTop.push({
                tooltip: Locale.t('sdc.grids.liste.btn.new.tooltip'),
                text: Locale.t('sdc.grids.liste.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }

        this.callParent(arguments)
    },

    onNew: function () {
        let view = this.getView().view,
            NewRecord = Ext.create('sdc.model.grids.liste.Model', {
                id: bdFunctions.bpRandomString(32),
                isnew: 1,
                status: 1
            });
        this.createForm(view, NewRecord, 1);
    },
    createForm: function (view, record, isnew, tipo) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm', itemId)) {
            return
        }

        this.getView().fireEvent('createTab', Ext.create('sdc.view.forms.lista.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            storeForm: view.getStore(),
            valori: {
                id: record.data['id'],
                isnew: isnew,
                tipo: tipo
            }
        }), view)
    },

    onafterrendergrid: function (grid) {
        grid.myColumns = [
            {
                xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('sdc.grids.liste.columns.nome'), dataIndex: 'nome', flex: 1, filter: {type: 'string'}},
            {
                text: Locale.t('sdc.grids.liste.columns.autore'),
                dataIndex: 'autore',
                width: 250,
                filter: {type: 'string'}
            }
        ]
        this.callParent(arguments)
    },
});