Ext.define('acq.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'acq.start.Controller',
        'acq.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
