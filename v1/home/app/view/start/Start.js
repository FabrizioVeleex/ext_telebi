
Ext.define('home.view.start.Start', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Card',
        'home.view.start.StartController',
        'home.view.start.StartModel'
    ],
    controller: 'start',
    viewModel: 'start',
    layout :{
        type:'card'
    },
    bodyStyle:{
        'background-color':'transparent'
    },
    items:[

    ],
    listeners: {
        afterrender: 'onAfterRender'
    }
});
