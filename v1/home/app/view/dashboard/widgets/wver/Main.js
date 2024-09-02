/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wver.Main', {
    extend: 'portal.v1.widget.Panel',
    xtype: 'v1-wver-main',
    requires:[
        'Ext.layout.container.Card',
        'home.view.dashboard.widgets.wver.Controller',
        'home.view.dashboard.widgets.wver.Model'
    ],
    controller:'v1-widgetwver',
    viewModel:'v1-widgetwver',
    ui:'blue',
    layout: {
        type: "card"
    },
    height: 500,
    listeners:{
        afterRender:'onAfterRender'
    }
});
