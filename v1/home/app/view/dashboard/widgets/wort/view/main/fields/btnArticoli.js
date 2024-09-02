/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.main.fields.btnArticoli', {
    extend: 'Ext.button.Button',
    xtype: 'v1-wort-btnarticoli',
    text: Locale.t('wort.grid.toolbar.articoli.text')+'...',
    hidden:true,
    bind: {
        hidden: '{hidearticoli}'
    },
    ui: 'ocra',
    iconCls: 'x-fas fa-list',
    handler: 'onArticoli'
});
