/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.Main', {
    extend: 'portal.v1.widget.Panel',
    xtype: 'v1-wcld-main',
    requires:[
        'Ext.layout.container.Card',
        'home.view.dashboard.widgets.wcld.Controller',
        'home.view.dashboard.widgets.wcld.Model'
    ],
    controller:'v1-wcld',
    viewModel:'v1-wcld',
    ui:'blue',
    layout: {
        type: "card"
    },
    height: 450,
    listeners:{
        afterRender:'onAfterRender'
    }
});
