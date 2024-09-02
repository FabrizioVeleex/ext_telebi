Ext.define('fat.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'fat.start.Controller',
        'fat.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
})