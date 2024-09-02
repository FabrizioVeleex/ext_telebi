/**
 * Created by luke on 07/08/23.
 */
Ext.define('webord.view.forms.ordine.cards.Testata', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Number',
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
                {xtype: 'datefield',fieldLabel: Locale.t('webord.forms.ordine.fields.data_ordine'),
                    width: 200, format: 'd/m/Y',readOnly: true,
                    bind: {
                        value: '{record.data_ordine}'
                    }
                },
                {xtype: 'numberfield', fieldLabel:Locale.t('webord.forms.ordine.fields.id_ordine'),flex:1,
                    hideTrigger: true, readOnly: true,
                    bind: {value: '{record.id_ordine}'}
                },
                {xtype: 'numberfield', fieldLabel:Locale.t('webord.forms.ordine.fields.progressivo_giorno'),flex:1,
                    hideTrigger: true, readOnly: true,
                    bind: {value: '{record.progressivo_giorno}'}
                },
                {xtype: 'numberfield', fieldLabel:Locale.t('webord.forms.ordine.fields.ordine_gestionale'),flex:1,
                    hideTrigger: true, readOnly: true,
                    bind: {value: '{record.ordine_gestionale}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('webord.forms.ordine.fields.codice_cliente'),minChars:3,
                    width:150,matchFieldWidth:false,forceSelection:true,
                    bind: {
                        store: '{storeClienti}',
                        value: '{record.codice_cliente}',
                        readOnly: '{readOnly}'
                    },
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><b>{codice}</b>: - {ragsoc}</li>',
                        '</tpl></ul>'
                    ),
                    valueField: 'codice',displayField: 'codice',
                    listeners: {
                        select:function (cmb,record) {
                            let ctl = this.lookupController()
                            ctl.form.down('#bozzaragsoc').setValue(record.data.ragsoc)
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                },
                /*
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.codice_cliente'),
                    width:150,readOnly: true,
                    bind: {value: '{record.codice_cliente}'}
                },

                 */
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.ragsoc'),
                    flex:1,readOnly: true,itemId: 'bozzaragsoc',
                    bind: {value: '{record.ragsoc}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.email_cliente'),
                    flex:1,readOnly: true,
                    bind: {value: '{record.email_cliente}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.ordine.fields.note'),
                    flex:1,readOnly: true,
                    bind: {value: '{record.note}'}
                }
            ]
        }
    ]
});