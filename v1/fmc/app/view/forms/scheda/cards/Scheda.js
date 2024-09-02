/**
 * Created by luke on 15/11/2019.
 */
Ext.define('fmc.view.forms.scheda.cards.Scheda', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('fmc.forms.scheda.sezuser')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('fmc.forms.scheda.fields.nome'),
                            flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            maxLength: 250,maxLengthText:Locale.t('global.maxlengthtext'),
                            bind: {value: '{record.nome}',readOnly: '{readOnly}'}
                        },
                        {xtype: 'textfield', fieldLabel: Locale.t('fmc.forms.scheda.fields.cognome'),
                            flex:1,allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            maxLength: 250,maxLengthText:Locale.t('global.maxlengthtext'),
                            bind: {value: '{record.cognome}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('fmc.forms.scheda.fields.matricola'),
                            flex:1,allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            maxLength: 20,maxLengthText:Locale.t('global.maxlengthtext'),
                            bind: {value: '{record.matricola}',readOnly: '{readOnly}'}
                        },
                        {xtype: 'combobox', fieldLabel: Locale.t('fmc.forms.scheda.fields.idmansione'),minChars:3,
                            flex:1,forceSelection:true,emptyText:Locale.t('fmc.forms.scheda.emptymansione'),itemId:'fld_mansione',
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),autoLoadOnValue: true,
                            bind: {
                                store: '{storeMansioni}',
                                readOnly: '{readOnlyMansione}',
                                value: '{record.idmansione}'
                            },
                            valueField: 'id',displayField: 'descrizione', queryMode: 'local'
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'combobox', fieldLabel: Locale.t('fmc.forms.scheda.fields.idsede'),minChars:3,
                            flex:1,forceSelection:true,emptyText:Locale.t('fmc.forms.scheda.emptysede'),
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            bind: {
                                store: '{storeSedi}',
                                readOnly: '{readOnly}',
                                value: '{record.idsede}'
                            },
                            valueField: 'id',displayField: 'nome', queryMode: 'local'
                        },
                        {xtype: 'datefield', fieldLabel: Locale.t('fmc.forms.scheda.fields.datanascita'),
                            width: 170, format: 'd/m/Y',readOnly: true,
                            bind: {
                                value: '{record.datanascita}'
                            }
                        },
                        {xtype:'displayfield',width:60},
                        {xtype: 'datefield', fieldLabel: Locale.t('fmc.forms.scheda.fields.dtass'),
                            width: 170, format: 'd/m/Y',submitFormat:'Y-m-d',
                            bind: {
                                value: '{record.dtass}',
                                readOnly: '{readOnly}'
                            }
                        },
                        {xtype:'displayfield',width:60},
                        {xtype: 'datefield', fieldLabel: Locale.t('fmc.forms.scheda.fields.dtcess'),
                            width: 170, format: 'd/m/Y',readOnly:true,
                            bind: {value: '{record.dtcess}'}
                        }
                    ]
                }
            ]
        }
    ]
});