/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.sql.Panel', {
    extend: 'Ext.panel.Panel',
    requires:[
        'Ext.layout.container.Card',
        'skd.view.forms.setting.sql.Controller',
        'skd.view.forms.setting.sql.Model'
    ],
    viewModel:'sql',
    controller:'sql',
    title: Locale.t('skd.forms.cards.sql.title'),
    iconCls:'fas fa-code',
    layout:{
        type:'card'
    },
    listeners:{
        firstRender: 'onAfterRender',
        activate:'onActivate'
    }
});
