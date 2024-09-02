/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.dashboard.Panel', {
    extend: 'Ext.panel.Panel',
    requires:[
        'skd.view.forms.setting.dashboard.Controller',
        'skd.view.forms.setting.dashboard.Model',

        'Ext.layout.container.Card'
    ],
    viewModel:'dashboard',
    controller:'dashboard',
    title: Locale.t('skd.forms.cards.dashboard.title'),
    iconCls:'fas fa-code',
    layout:{
        type:'card'
    },
    listeners:{
        firstRender: 'onAfterRender',
        activate:'onActivate',
        stopPolling: 'onStopPolling'
    }
});
