Ext.define('dip.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'dip.view.start.Controller',
        'dip.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
