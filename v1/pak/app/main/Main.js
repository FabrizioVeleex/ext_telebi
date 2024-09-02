
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 */
Ext.define('pak.main.Main', {
    extend: 'portal.v1.view.main.Main',
    xtype: 'app-main',
    requires: [
        'pak.main.Controller',
        'pak.main.Model'
    ],
    controller: 'main',
    viewModel: 'main',
    bodyStyle: {
        'background': 'transparent'
    },
    listeners: {
        afterrender: 'onAfterRender',
        runapertura: 'onRunApertura',
        checkDati: 'onCheckDati'
    }
});
