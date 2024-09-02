
Ext.define('bol.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'bol.start.Controller',
        'bol.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
