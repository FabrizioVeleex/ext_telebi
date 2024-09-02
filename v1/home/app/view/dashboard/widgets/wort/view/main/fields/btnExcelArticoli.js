/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.main.fields.btnExcelArticoli', {
    extend: 'Ext.button.Button',
    xtype: 'v1-wort-btnexcelarticoli',
    text: Locale.t('wort.grid.toolbar.excelarticoli.text')+'...',
    hidden:true,
    bind: {
        hidden: '{hideExcelArt}'
    },
    ui: 'blue',
    iconCls: 'x-fas fa-file-excel',
    handler: 'onEsportaArticoli'
});
