/**
 * Created by luke on 21/05/21.
 */
Ext.define('portal.v1.view.main.global.upload.CardAttach', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.layout.container.VBox'
    ],
    bodyPadding: 5,
    layout : {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            title: '<span style="color: black;font-weight:bold">' + Locale.t('global.attach.title') + '</span>',
            style: {'background-color': "transparent;"},
            collapsible: true, collapsed: false,
            items: [
                {
                    xtype:'container', itemId:'updfile',
                    bind:{
                        hidden:'{readOnlyAttach}'
                    }
                },
                {
                    xtype:'container', itemId:'updgrid'
                }
            ]
        }
    ]
});