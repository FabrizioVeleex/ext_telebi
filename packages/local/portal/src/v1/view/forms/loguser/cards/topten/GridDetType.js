/**
 * Created by fabrizio on 19/03/21.
 */
Ext.define('portal.v1.view.forms.loguser.cards.topten.GridDetType', {
    extend: 'Ext.grid.Panel',
    alias:'widget.v1-global-griddettype',
    requires: [
        'portal.util.Locale'
    ],
    title:'Divisione chiamate viste/documenti',

    forceFit: true,
    autoLoad: false,
    bind:{
        store:'{griddettype}'
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true
    },
    columns: [
        {text:Locale.t('global.loguser.topten.gridtype.columns.type'), dataIndex: 'type',flex:1},
        {text:Locale.t('global.loguser.topten.grid.columns.percentage'), dataIndex: 'percentage',flex:1},
        {text:Locale.t('global.loguser.topten.grid.columns.total'), dataIndex: 'total',flex:1},
    ]
});