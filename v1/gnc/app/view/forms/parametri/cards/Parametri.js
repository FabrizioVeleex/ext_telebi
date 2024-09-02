/**
 * Created by luca on 16/07/2018.
 */
Ext.define('gnc.view.forms.parametri.cards.Parametri', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype:'box',html:'Eventuali parametri app...'}
            ]
        }
    ]
});