/**
 * Created by luke on 15/06/21.
 */
Ext.define('bolpas.view.forms.bolla.cards.Dettaglio', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.TextField',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    margin:15,
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false, minHeight: 150,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('bolpas.forms.bolla.info')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'radiogroup',fieldLabel: Locale.t('bolpas.forms.bolla.fields.tipo'), columns: 4,flex:1,simpleValue: true,
                            items: [
                                {boxLabel:Locale.t('bolpas.forms.bolla.fields.fornitore'),inputValue:0},
                                {boxLabel:Locale.t('bolpas.forms.bolla.fields.cliente'),inputValue:1},
                                {boxLabel:Locale.t('bolpas.forms.bolla.fields.versamento'),inputValue:2},
                                {boxLabel:Locale.t('bolpas.forms.bolla.fields.laboratorio'),inputValue:3}
                            ],
                            bind: {value:'{record.tipo}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'combobox', fieldLabel: Locale.t('bolpas.forms.bolla.fields.idsoggetto'),minChars:3,
                            width:700,matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),
                            autoLoadOnValue:true,forceSelection:true,readOnly: true,
                            bind: {
                                store: '{storeSoggetti}',
                                value: '{record.idsoggetto}'
                            },
                            valueField: 'id',displayField: 'ragsoc'
                        }
                    ],
                    bind: {
                        hidden: '{hideSoggetto}'
                    }
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('bolpas.forms.bolla.fields.numero'),width:400,allowBlank:false,readOnly: true,
                            bind: {value: '{record.numero}'}
                        },
                        {xtype:'displayfield',width:10},
                        {xtype: 'datefield',fieldLabel: Locale.t('bolpas.forms.bolla.fields.datadoc'),labelWidth:150,allowBlank:false,readOnly: true,
                            width: 300, format: 'd/m/Y',submitFormat:'Y-m-d',
                            bind: {value: '{record.datadoc}'}
                        },
                        {xtype:'displayfield',width:10},
                        {xtype: 'combobox', fieldLabel: Locale.t('bolpas.forms.bolla.fields.scaricatoda'),
                            minChars:3, flex:1,forceSelection:true, autoLoadOnValue:true,allowBlank:false,readOnly: true,
                            bind: {
                                store: '{storeDip}',
                                value: '{record.scaricatoda}'
                            },
                            valueField: 'dip_nome',displayField: 'dip_nome'
                        }
                    ],
                    bind: {
                        hidden: '{hideSoggetto}'
                    }
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('bolpas.forms.bolla.fields.numreg'),width:400,readOnly:true,
                            bind: {value: '{record.numreg}'}
                        },
                        {xtype:'displayfield',width:10},
                        {xtype: 'datefield',fieldLabel: Locale.t('bolpas.forms.bolla.fields.datareg'),readOnly:true, width: 300,labelWidth:150,
                            bind: {value: '{record.datareg}'}
                        }
                    ],
                    bind: {
                        hidden: '{hideSoggetto}'
                    }
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',maxHeight:'150',readOnly: true,
                            fieldLabel: Locale.t('bolpas.forms.bolla.fields.note'),
                            flex:1,padding:'0 0 10 0',
                            bind: {value: '{record.note}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',maxHeight:'150',
                            fieldLabel: Locale.t('bolpas.forms.bolla.fields.notemag'),
                            flex:1,padding:'0 0 10 0',
                            bind: {value: '{record.notemag}',readOnly: '{readArt}'}
                        }
                    ]
                }
            ]
        }
    ]
});