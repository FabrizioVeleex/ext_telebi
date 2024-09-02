/**
 * Created by luca on 13/06/2017.
 */
Ext.define('amm.view.forms.utente.cards.Utente', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.utente.fields.cognomenome'),
                    flex:1, readOnly: true,
                    bind: { value: '{record.cognomenome}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.utente.fields.desktop'),
                    flex:1, readOnly: true,
                    bind: { value: '{record.nomedsk}'}
                }
            ]
        }
    ]
});