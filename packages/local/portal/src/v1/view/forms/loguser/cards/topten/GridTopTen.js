/**
 * Created by fabrizio on 19/03/21.
 */
Ext.define('portal.v1.view.forms.loguser.cards.topten.GridTopTen', {
    extend: 'Ext.grid.Panel',
    alias:'widget.v1-global-gridtopten',
    requires: [
        'portal.util.Locale'
    ],

    forceFit: true,
    autoLoad: true,
    bind:{
        store:'{gridtopten}'
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true
    },
    columns: [
        {text:Locale.t('global.loguser.topten.grid.columns.user'), dataIndex: 'user',flex:2},
        {text:Locale.t('global.loguser.topten.grid.columns.percentage'), dataIndex: 'percentage',flex:1},
        {text:Locale.t('global.loguser.topten.grid.columns.total'), dataIndex: 'total',flex:1},
    ],
    listeners:{
        itemclick:'onitemclick'
    }
});