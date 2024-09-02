Ext.define('cli.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'cli.start.Controller',
        'cli.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
