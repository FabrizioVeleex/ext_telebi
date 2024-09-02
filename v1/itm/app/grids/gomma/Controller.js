/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.gomma.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.gomma',
    requires: [
        'Ext.grid.column.Action',
        'itm.grids.gomma.Model',
        'itm.forms.gomma.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
        ]

        if (this.checkRuoli(['99', '10'])) {
            this.listBtnTop.push({
                tooltip: Locale.t('itm.grids.gomma.btn.new.tooltip'),
                text: Locale.t('itm.grids.gomma.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }

        this.callParent(arguments)
    },
    onNew: function () {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('itm.grids.gomma.Model', {
            id: bdFunctions.bpRandomString(32),
            isnew: 1
        });
        this.createForm(view, NewRecord, 1);
    },
    createForm: function (view, record, isnew) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm', itemId)) {
            return
        }
        this.getView().fireEvent('createTab', Ext.create('itm.forms.gomma.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew
            }
        }), view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns = [
            {
                xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
                items: [{ handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text') }]
            },
            { text: Locale.t('itm.grids.gomma.column.cd_rotolo'), dataIndex: 'cd_rotolo', width: 150, filter: { type: 'string' } },
            { text: Locale.t('itm.grids.gomma.column.cd_spezzone'), dataIndex: 'cd_spezzone', minWidth: 150, flex: 1, filter: { type: 'string' } },
        ]
        this.callParent(arguments)
    }
})