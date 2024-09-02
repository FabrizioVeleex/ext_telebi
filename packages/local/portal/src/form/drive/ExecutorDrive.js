/**
 * Created by fabrizio on 17/07/17.
 */
Ext.define('portal.form.drive.ExecutorDrive', {
    extend: 'Ext.panel.Panel',
    xtype: 'executordrive',

    requires: [
        'Ext.layout.container.HBox',
        'portal.form.drive.ExecutorDriveController',
        'portal.form.drive.ExecutorDriveModel'
    ],
    controller:'executordrive',
    viewModel: 'executordrive',
    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },
    items: [],
    listeners:{
        afterRender:'onAfterRender'
    }
});
