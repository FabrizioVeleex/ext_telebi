/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wver.view.main.fields.btnExcel', {
    extend: 'Ext.button.Button',
    xtype: 'v1-wver-btnexcel',
    text: Locale.t('wver.grid.toolbar.excel.text')+'...',
    hidden:true,
    bind: {
        hidden: '{hideexcel}'
    },
    ui: 'blue',
    iconCls: 'x-fas fa-file-excel',
    handler: 'onEsportaVer'
});
