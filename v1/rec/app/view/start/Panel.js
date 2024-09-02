Ext.define('rec.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'rec.view.start.Controller',
        'rec.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
