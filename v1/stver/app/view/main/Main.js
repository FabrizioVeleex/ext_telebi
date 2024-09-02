/**
 */
Ext.define('stver.view.main.Main', {
    extend: 'portal.v1.view.main.Main',
    xtype: 'app-main',
    requires: [
        'stver.view.main.Controller',
        'stver.view.main.Model'
    ],
    controller: 'main',
    viewModel: 'main',
    bodyStyle:{
        'background':'transparent'
    },
    listeners: {
        afterrender: 'onAfterRender',
        checkDati:'onCheckDati'
    }
});
