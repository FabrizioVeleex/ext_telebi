Ext.define('mcd.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'mcd.view.start.Controller',
        'mcd.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
