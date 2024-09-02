/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.Main', {
    extend: 'portal.v1.widget.Panel',
    requires:[
        'Ext.layout.container.Card',
        'home.view.dashboard.widgets.wpre.Controller',
        'home.view.dashboard.widgets.wpre.Model'
    ],
    ui:'presenze',
    controller:'v1-widgetpre',
    viewModel:'v1-widgetpre',
    layout: {
        type: "card"
    },
    height: 450,
    listeners:{
        afterRender:'onAfterRender'
    }
});
