/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.watt.Main', {
    extend: 'portal.v1.widget.Panel',
    requires:[
        'Ext.button.Button',
        'home.view.dashboard.widgets.watt.Controller',
        'home.view.dashboard.widgets.watt.Model',
    ],
    controller:'v1-watt',
    viewModel:'v1-watt',
    ui:'att',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                iconCls: 'pictos pictos-refresh',
                handler: 'onReloadGrid'
            },
            {
                text: Locale.t('watt.btn.open.text'),
                tooltip: Locale.t('watt.btn.open.tooltip'),
                iconCls: 'ATT-16',
                ui: 'blue',
                handler: 'onOpenApp'
            }
        ]
    }],
    listeners:{
        afterRender:'onAfterRender',
    }
});
