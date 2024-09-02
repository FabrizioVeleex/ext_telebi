Ext.define('sgv.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'sgv.view.start.Controller',
        'sgv.view.start.Model'
    ],
    width:400,
    controller: 'start',
    viewModel: 'start'
});
