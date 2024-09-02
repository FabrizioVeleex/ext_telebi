/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.classi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.classi',
    requires: [
        'Ext.grid.column.Action',
        'itm.forms.classe.Model',
        'itm.forms.classe.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
        ]
        /* al momento solo dal gestionale
        if (this.checkRuoli(['99','10'])){
            this.listBtnTop.push({
                tooltip: Locale.t('itm.grids.classi.btn.new.tooltip'),
                text: Locale.t('itm.grids.classi.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        */
        this.callParent(arguments)
    },
    onNew: function () {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('itm.forms.classe.Model', {
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
        this.getView().fireEvent('createTab', Ext.create('itm.forms.classe.Panel', {
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
            { text: Locale.t('itm.grids.classi.column.cd_clm'), dataIndex: 'cd_clm', width: 150, filter: { type: 'string' } },
            { text: Locale.t('itm.grids.classi.column.descr_clm'), dataIndex: 'descr_clm', flex: 1, filter: { type: 'string' } }
        ]
        this.callParent(arguments)
    }
})