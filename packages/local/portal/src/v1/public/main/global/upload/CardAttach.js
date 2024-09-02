/**
 * Created by luke on 21/05/21.
 */
Ext.define('portal.v1.public.main.global.upload.CardAttach', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.VBox'
    ],
    bodyPadding: 5,
    layout : {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {xtype:'container', itemId:'updfile',
            bind:{
                hidden:'{!readOnlyAttach}'
            }
        },
        {xtype:'container', itemId:'updgrid'}
    ]
});