/**
 * Created by luke on 19/01/23.
 */
Ext.define('ama.view.forms.scheda.cards.Scheda', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'textfield', fieldLabel: Locale.t('ama.forms.scheda.fields.numero'), readOnly:true,
            bind: {value: '{record.numero}',hidden: '{hidenr}'}
        },
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('ama.forms.scheda.cardscheda')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'datefield', fieldLabel: Locale.t('ama.forms.scheda.fields.richiesta'),
                            width: 250, format: 'd/m/Y',submitFormat:'Y-m-d',allowBlank: false, blankText: Locale.t("global.form.blanktext"),
                            bind: {
                                value: '{record.richiesta}',
                                readOnly: '{readOnly}'
                            }
                        },
                        {xtype: 'datefield', fieldLabel: Locale.t('ama.forms.scheda.fields.scadenza'),
                            width: 250, format: 'd/m/Y',submitFormat:'Y-m-d',allowBlank: false, blankText: Locale.t("global.form.blanktext"),
                            bind: {
                                value: '{record.scadenza}',
                                readOnly: '{readOnly}'
                            }
                        },
                        {xtype: 'combobox', fieldLabel: Locale.t('ama.forms.scheda.fields.idstabilimento'),editable:false,
                            flex:1,matchFieldWidth:true, autoLoadOnValue:true, forceSelection:true,
                            allowBlank: false, blankText: Locale.t("global.form.blanktext"),
                            bind: {
                                store: '{storeStabilimenti}',
                                value: '{record.idstabilimento}',
                                readOnly: '{readOnly}'
                            },
                            valueField: 'id',displayField: 'nome'
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'radiogroup',fieldLabel:Locale.t('ama.forms.scheda.fields.tipo'),
                            columns: 4,flex:1,simpleValue: true,allowBlank: false, blankText: Locale.t("global.form.blanktext"),
                            items: [
                                {boxLabel:Locale.t('ama.forms.scheda.radio.tipo1'),inputValue:1},
                                {boxLabel:Locale.t('ama.forms.scheda.radio.tipo2'),inputValue:2},
                                {boxLabel:Locale.t('ama.forms.scheda.radio.tipo3'),inputValue:3},
                                {boxLabel:Locale.t('ama.forms.scheda.radio.tipo4'),inputValue:4}
                            ],
                            bind: {value:'{record.tipo}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('ama.forms.scheda.fields.articolo'),
                            flex:1,allowBlank: false, blankText: Locale.t("global.form.blanktext"),
                            maxLength: 250,maxLengthText: Locale.t("global.form.maxlengthtext"),
                            bind: {value: '{record.articolo}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'combobox', fieldLabel: Locale.t('ama.forms.scheda.fields.codacr'),minChars:3,width:300,
                            matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),hideTrigger: true,
                            autoLoadOnValue:true,forceSelection:true,
                            bind: {
                                store: '{storeProdotti}',
                                value: '{record.codacr}',
                                readOnly: '{readOnly}'
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                '<li role="option" class="x-boundlist-item"><b>{cdcom1}</b>: - {depar}</li>',
                                '</tpl></ul>'
                            ),
                            valueField: 'cdcom1',displayField: 'cdcom1'
                        },
                        {xtype: 'combobox', fieldLabel: Locale.t('ama.forms.scheda.fields.idfor'),minChars:3,
                            flex:1,matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),
                            autoLoadOnValue:true,forceSelection:true,
                            bind: {
                                store: '{storeFornitori}',
                                readOnly: '{readOnly}',
                                value: '{record.idfor}'
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                '<li role="option" class="x-boundlist-item"><b>{ragsoc}</b><br>{ubicazione}</li>',
                                '</tpl></ul>'
                            ),
                            valueField: 'id',displayField: 'ragsoc'
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {labelAlign: 'top', margin:5},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',allowBlank: false, blankText: Locale.t("global.form.blanktext"),
                            fieldLabel: Locale.t('ama.forms.scheda.fields.attivita'),
                            flex:1,padding:'0 0 10 0',
                            bind: {value: '{record.attivita}',readOnly: '{readOnly}'}
                        }
                    ]
                }
            ]
        }
    ]
});