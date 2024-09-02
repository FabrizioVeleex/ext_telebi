/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.Main', {
    extend: 'portal.v1.widget.Panel',
    requires:[
        'Ext.layout.container.Card',
        'home.view.dashboard.widgets.word.Controller',
        'home.view.dashboard.widgets.word.Model'
    ],
    ui:'viola',
    controller:'v1-word',
    viewModel:'v1-word',
    layout: {
        type: "card"
    },
    height: 650,
    listeners:{
        afterRender:'onAfterRender'
    }
});
