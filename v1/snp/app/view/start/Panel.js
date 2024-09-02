Ext.define('snp.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'snp.view.start.Controller',
        'snp.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
