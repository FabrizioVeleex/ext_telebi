/**
 * Created by luke on 19/10/21.
 */
Ext.define('rec.view.forms.reso.cards.CardImmagini', {
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
            title: '<span style="color: black;font-weight:bold">' + Locale.t('rec.forms.reso.gridimmagini.title') + '</span>',
            style: {'background-color': "transparent;"},
            collapsible: true, collapsed: false,
            items: [
                {
                    xtype:'container', itemId:'updimage',
                    bind:{
                        hidden:'{readOnlyAttach}'
                    }
                },
                {
                    xtype:'container', itemId:'gridimages'
                }
            ]
        }
    ]
});