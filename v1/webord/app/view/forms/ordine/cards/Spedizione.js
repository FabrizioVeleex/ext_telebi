/**
 * Created by luke on 07/08/23.
 */
Ext.define('webord.view.forms.ordine.cards.Spedizione', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.ragsoc_spedizione'),
                    flex:1,readOnly: true,
                    bind: {value: '{record.ragsoc_spedizione}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.codice_indirizzo'),
                    width:150,readOnly: true,
                    bind: {value: '{record.codice_indirizzo}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.indirizzo_spedizione'),
                    flex:1,readOnly: true,
                    bind: {value: '{record.indirizzo_spedizione}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.cap_spedizione'),
                    width:150,readOnly: true,
                    bind: {value: '{record.cap_spedizione}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.localita_spedizione'),
                    flex:1,readOnly: true,
                    bind: {value: '{record.localita_spedizione}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.prov_spedizione'),
                    width:150,readOnly: true,
                    bind: {value: '{record.prov_spedizione}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.naz_spedizione'),
                    width:150,readOnly: true,
                    bind: {value: '{record.naz_spedizione}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.tel_spedizione'),
                   width:300,readOnly: true,
                    bind: {value: '{record.tel_spedizione}'}
                }
            ]
        }
    ]
});