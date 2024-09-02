/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.Main', {
    extend: 'portal.v1.widget.Panel',
    xtype: 'v1-wort-main',
    requires:[
        'Ext.layout.container.Card',
        'home.view.dashboard.widgets.wort.Controller',
        'home.view.dashboard.widgets.wort.Model'
    ],
    controller:'v1-widgetort',
    viewModel:'v1-widgetort',
    ui:'blue',
    layout: {
        type: "card"
    },
    height: 450,
    listeners:{
        afterRender:'onAfterRender'
    }
});
