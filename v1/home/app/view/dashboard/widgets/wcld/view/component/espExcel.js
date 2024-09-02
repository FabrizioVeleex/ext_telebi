/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.view.component.espExcel', {
    extend: 'Ext.button.Button',
    text: Locale.t('wcld.esporta.title')+'...',
    hidden:true,
    bind: {
        hidden: '{hideexcel}'
    },
    ui: 'blue',
    iconCls: 'x-fas fa-file-excel',
    handler: 'onEsporta'
});
