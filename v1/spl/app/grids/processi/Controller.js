/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('spl.grids.processi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-spl-grid-processi',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'spl.forms.processo.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
        ]
        this.callParent(arguments)
    },
    createForm: function (view, record, isnew) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm', itemId)) {
            return
        }
        this.getView().fireEvent('createTab', Ext.create('spl.forms.processo.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            storeForm: view.getStore(),
            valori: {
                id: record.data['id'],
                isnew: isnew
            }
        }), view)
    },

    onafterrendergrid: function (grid) {
        grid.myColumns = [
            // {
            //     xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
            //     items: [{ handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text') }]
            // },
            { text: Locale.t('spl.grids.processi.columns.dateImport'), dataIndex: 'dateImport', width: 180, xtype: 'datecolumn', format: 'd/m/Y H:i:s', filter: { type: 'date', dateFormat: 'Y-m-d H:i:s' } },
            { text: Locale.t('spl.grids.processi.columns.status'), dataIndex: 'status', width: 200, filter: { type: 'string' } },
            { text: Locale.t('spl.grids.processi.columns.tag'), dataIndex: 'tag', width: 200, filter: { type: 'string' } },
        ]
        this.callParent(arguments)
    },
});