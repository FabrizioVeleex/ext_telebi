/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.forms.documento.cards.Info', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.TextField',
        'Ext.form.Panel',
        'Ext.form.field.*',
        'Ext.form.FieldSet',
        'Ext.layout.container.HBox',
        'Ext.container.Container'
    ],
    scrollable:'y',
    margin:15,
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false, minHeight: 150,
        title: Locale.t('rec.forms.documento.fields.sezinfo'),
        items: [
            {xtype: 'container', layout: 'hbox',
                items: [
                    {xtype: 'textfield',
                        fieldLabel: Locale.t('rec.forms.documento.fields.numero'),
                        width: 250,readOnly:true,
                        bind: {value: '{record.numero}'}
                    },
                    {xtype: 'displayfield', width: 50},
                    {xtype: 'datefield',
                        fieldLabel: Locale.t('rec.forms.documento.fields.datadoc'),
                        width: 250,readOnly:true,format:'d/m/Y',
                        bind: {value: '{record.datadoc}'}
                    }
                ]
            },
            {xtype: 'container', layout: 'hbox',
                items: [
                    {xtype: 'textfield',
                        fieldLabel: Locale.t('rec.forms.documento.fields.descrizione'),
                        flex:1, readOnly:true,
                        bind: {value: '{record.descrizione}'}
                    }
                ]
            }
        ]
    },
        {xtype: 'fieldset', collapsible: true, collapsed: false, minHeight: 150,
            title: Locale.t('rec.forms.documento.fields.sezsoggetto'),
            items: [
                {xtype: 'container', layout: 'hbox',
                    items: [
                        {xtype: 'textfield',
                            fieldLabel: Locale.t('rec.forms.documento.fields.cdcli'),
                            width: 250,readOnly:true,
                            bind: {value: '{record.cdcli}'}
                        },
                        {xtype: 'displayfield', width: 50},
                        {xtype: 'textfield',
                            fieldLabel: Locale.t('rec.forms.documento.fields.ragsoc'),
                            flex:1,readOnly:true,
                            bind: {value: '{record.ragsoc}'}
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox',
                    items: [
                        {xtype: 'textfield',
                            fieldLabel: Locale.t('rec.forms.documento.fields.indirizzo'),
                            flex:1, readOnly:true,
                            bind: {value: '{record.indirizzo}'}
                        },{xtype: 'displayfield', width: 5}
                    ]
                },
                {xtype: 'container', layout: 'hbox',
                    items: [
                        {xtype: 'textfield',
                            fieldLabel: Locale.t('rec.forms.documento.fields.cap'),
                            width: 250,readOnly:true,
                            bind: {value: '{record.cap}'}
                        },
                        {xtype: 'displayfield', width: 50},
                        {xtype: 'textfield',
                            fieldLabel: Locale.t('rec.forms.documento.fields.comune'),
                            flex:1,readOnly:true,
                            bind: {value: '{record.comune}'}
                        },
                        {xtype: 'displayfield', width: 50},
                        {xtype: 'textfield',
                            fieldLabel: Locale.t('rec.forms.documento.fields.provincia'),
                            width:250,readOnly:true,
                            bind: {value: '{record.provincia}'}
                        }
                    ]
                }
            ]
        }
    ]
});