/**
 * Created by luke on 20/06/22.
 */
Ext.define('impexp.view.forms.importazione.cards.CardAllegati', {
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
           title: '<span style="color: black;font-weight:bold">' + Locale.t('impexp.forms.importazione.allegato.card') + '</span>',
            style: {'background-color': "transparent;"},
            collapsible: true, collapsed: false,
            items: [
                {
                    xtype:'container', itemId:'updfile',
                    bind:{
                        hidden:'{!readOnlyAttach}'
                    }
                },
                {
                    xtype:'container', itemId:'updgrid'
                }
            ]
        }
    ]
});