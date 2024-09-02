/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.component.espExcel', {
    extend: 'Ext.button.Button',
    text: '',
    tooltip: Locale.t('wcon.esporta.tooltip'),
    ui: 'blue',
    iconCls: 'x-fas fa-file-excel',
    handler: 'onEsporta'
});
