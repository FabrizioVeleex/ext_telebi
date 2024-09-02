Ext.define('prd.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'prd.start.Controller',
        'prd.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
