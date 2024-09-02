/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.main.fields.btnExcel', {
    extend: 'Ext.button.Button',
    xtype: 'v1-wort-btnexcel',
    text: Locale.t('wort.grid.toolbar.excel.text')+'...',
    hidden:true,
    bind: {
        hidden: '{hideexcel}'
    },
    ui: 'blue',
    iconCls: 'x-fas fa-file-excel',
    handler: 'onEsporta'
});
