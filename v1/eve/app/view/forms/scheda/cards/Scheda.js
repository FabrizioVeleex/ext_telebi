/**
 * Created by luke on 27/09/22.
 */
Ext.define('eve.view.forms.scheda.cards.Scheda', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.TextField',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('eve.forms.scheda.anagrafica')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'container', layout: 'hbox',
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'datefield',
                            fieldLabel: Locale.t('eve.forms.scheda.fields.creationdate'),
                            width: 230,readOnly:true, dateFormat: 'd/m/Y',
                            bind: {value: '{record.creationdate}'}
                        },
                        {xtype: 'displayfield', width: 50},
                        {xtype: 'textfield',
                            fieldLabel: Locale.t('eve.forms.scheda.fields.numero'),
                            anchor: '90%',readOnly:true,
                            bind: {value: '{record.numero}'}
                        },
                        {xtype: 'displayfield', width: 50},
                        { xtype: 'combobox',fieldLabel: Locale.t('eve.forms.scheda.fields.idzona'), forceSelection:true,
                            bind: {store: '{storeZone}', readOnly: '{readOnly}', value: '{record.idzona}'},
                            valueField: 'id', displayField: 'codice', queryMode: 'local'
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox',
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textfield',
                            fieldLabel: Locale.t('eve.forms.scheda.fields.ragsoc'),
                            flex:1,allowBlank: false, blankText: Locale.t('global.blanktext'),
                            maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {readOnly: '{readOnly}', value: '{record.ragsoc}'}
                        },
                        {xtype: 'textfield',
                            fieldLabel: Locale.t('eve.forms.scheda.fields.gruppo'), flex:1,
                            maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {readOnly: '{readOnly}', value: '{record.gruppo}'}
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox',
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'combo',
                            fieldLabel: Locale.t('eve.forms.scheda.fields.cdnaz'), flex:1,
                            displayField:'langit', valueField:'alpha2',minChars:3,forceSelection:true,autoLoadOnValue: true,
                            bind: {
                                store: '{storeNazioni}',
                                readOnly: '{readOnly}',
                                value: '{record.cdnaz}'
                            }
                        },
                        {xtype: 'combo',
                            fieldLabel: Locale.t('eve.forms.scheda.fields.lingua'), flex:1,
                            displayField:'lingua', valueField:'lingua',minChars:3,forceSelection:true,autoLoadOnValue: true,
                            bind: {
                                store: '{storeLingue}',
                                readOnly: '{readOnly}',
                                value: '{record.lingua}'
                            }
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox',
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'displayfield', fieldLabel:Locale.t('eve.forms.scheda.fields.tipologia'),value:'',width:110},
                        {xtype: 'checkboxfield', boxLabel:Locale.t('eve.forms.scheda.fields.distnaz'),hideLabel:true,width: 200,
                            bind: {value: '{record.distnaz}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield',boxLabel: Locale.t('eve.forms.scheda.fields.distreg'),hideLabel:true, width: 200,
                            bind: {value: '{record.distreg}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.ng'),hideLabel:true, width: 150,
                            bind: {value: '{record.negozio}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.of'),hideLabel:true, width: 150,
                            bind: {value: '{record.officina}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.web'),hideLabel:true, width: 150,
                            bind: {value: '{record.web}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox',
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'displayfield', fieldLabel:Locale.t('eve.forms.scheda.fields.vende'),value:'',width:110},
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.vende01'),hideLabel:true,width: 200,
                            bind: {value: '{record.vende01}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield',boxLabel: Locale.t('eve.forms.scheda.fields.vende02'),hideLabel:true, width: 200,
                            bind: {value: '{record.vende02}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.vende03'),hideLabel:true, width: 150,
                            bind: {value: '{record.vende03}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.vende04'),hideLabel:true, width: 150,
                            bind: {value: '{record.vende04}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'textfield', hideLabel: true, flex:1,
                            bind: {value: '{record.altro}', readOnly: '{readOnly}'}
                        }
                    ]
                }
            ]
        },
    ]
});