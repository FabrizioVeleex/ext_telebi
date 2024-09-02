/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.note.Panel', {
    extend: 'Ext.panel.Panel',
    requires:[
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'home.view.dashboard.widgets.wpre.view.note.Controller',
    ],
    ui:'presenze',
    border:true,
    controller:'v1-vpewgridnote',
    layout: {
         type: "hbox", align: "stretch"
    },
    header: {
        itemPosition: 1,
        items: [{
            xtype:'button',
            tooltips: Locale.t('global.btn.close.text'),
            iconCls: 'x-fas fa-window-close',
            handler: 'onCloseNote'
        }]
    },
    items: [],
});
