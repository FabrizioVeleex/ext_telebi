Ext.define('home.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.layout.container.Card',
        'home.view.main.Controller',
        'home.view.main.Model',
    ],
    controller: 'main',
    viewModel: 'main',
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
