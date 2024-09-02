/**
 * Created by luke on 04/05/21.
 */
Ext.define('vda.view.forms.progetto.cards.Monitoraggio', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [

            ]
        }
    ]
});