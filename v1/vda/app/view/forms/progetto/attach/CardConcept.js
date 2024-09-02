/**
 * Created by luke on 24/03/22.
 */
Ext.define('vda.view.forms.progetto.attach.CardConcept', {
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
        {xtype:'container', itemId:'updgridConcept'}
    ]
});