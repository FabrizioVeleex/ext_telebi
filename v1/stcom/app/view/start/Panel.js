Ext.define('stcom.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'stcom.view.start.Controller',
        'stcom.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
