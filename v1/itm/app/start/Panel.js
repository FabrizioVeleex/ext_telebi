Ext.define('itm.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'itm.start.Controller',
        'itm.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
