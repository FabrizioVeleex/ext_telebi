Ext.define('eve.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'eve.view.start.Controller',
        'eve.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
