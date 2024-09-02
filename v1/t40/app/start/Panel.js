Ext.define('t40.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        't40.start.Controller',
        't40.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
