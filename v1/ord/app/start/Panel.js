Ext.define('ord.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'ord.start.Controller',
        'ord.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
})