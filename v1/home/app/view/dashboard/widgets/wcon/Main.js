/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.Main', {
    extend: 'portal.v1.widget.Panel',
    requires:[
        'Ext.layout.container.Card',
        'home.view.dashboard.widgets.wcon.Controller',
        'home.view.dashboard.widgets.wcon.Model'
    ],
    ui:'wcon',
    controller:'v1-wcon',
    viewModel:'v1-wcon',
    layout: {
        type: "card"
    },
    height: 400,
    listeners:{
        afterRender:'onAfterRender'
    }
});
