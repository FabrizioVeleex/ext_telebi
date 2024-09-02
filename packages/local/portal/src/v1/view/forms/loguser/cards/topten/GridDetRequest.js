/**
 * Created by fabrizio on 19/03/21.
 */
Ext.define('portal.v1.view.forms.loguser.cards.topten.GridDetRequest', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.v1-global-griddetrequest',
    requires: [
        'Ext.grid.column.Date',
        'portal.util.Locale'
    ],
    title: 'Elenco completo chiamate ',
    forceFit: true,
    autoLoad: false,
    bind: {
        store: '{griddetrequest}'
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true
    },
    columns: [
        {
            text: Locale.t('global.loguser.topten.grid.columns'),
            dataIndex: 'datelog',
            width: 200,
            xtype: 'datecolumn',
            format: 'd/m/Y H:i:s',
            filter: {type: 'date', dateFormat: 'c'}
        },
        {
            text: Locale.t('global.loguser.topten.gridtype.columns.type'), dataIndex: 'type', width: 140,
            renderer: function (value, meta, record) {
                if (value === 'grids') {
                    return 'Vista'
                }
                if (value === 'forms') {
                    return 'Documento'
                }

            }
        },
        {text: Locale.t('global.loguser.topten.gridrequest.columns.url'), dataIndex: 'url', flex: 1, minWidth: 400},
    ],
});