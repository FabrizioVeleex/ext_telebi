Ext.define('skd.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'skd.start.Controller',
        'skd.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
