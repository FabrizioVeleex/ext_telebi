/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.worf.Main', {
    extend: 'portal.v1.widget.Panel',
    xtype: 'v1-worf-main',
    requires:[
        'Ext.layout.container.Card',
        'home.view.dashboard.widgets.worf.Controller',
        'home.view.dashboard.widgets.worf.Model'
    ],
    controller:'v1-worf',
    viewModel:'v1-worf',
    ui:'blue',
    layout: {
        type: "card"
    },
    height: 450,
    listeners:{
        afterRender:'onAfterRender'
    }
});
