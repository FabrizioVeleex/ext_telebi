/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.connections.Panel', {
    extend: 'Ext.panel.Panel',
    requires:[
        'skd.view.forms.setting.connections.Controller',
        'skd.view.forms.setting.connections.Model',

        'Ext.layout.container.Card'
    ],
    viewModel:'connections',
    controller:'connections',
    title: Locale.t('skd.forms.cards.connections.title'),
    iconCls:'fas fa-server',
    layout:{
        type:'card'
    },
    listeners:{
        firstRender: 'onAfterRender',
        activate:'onActivate'
    }
});
