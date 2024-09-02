/**
 * Created by luke on 27/09/22.
 */
Ext.define('eve.view.forms.scheda.cards.Struttura', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Number',
        'Ext.layout.container.HBox',
        'eve.store.forms.scheda.Brand',
        'eve.store.forms.scheda.Marche'
    ],
    scrollable:'y',
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('eve.forms.scheda.struttura')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'container', layout: 'hbox',
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'numberfield', fieldLabel: Locale.t('eve.forms.scheda.fields.fattgen')+' €',
                            width: 240, hideTrigger: true, allowDecimals:true, validateOnChange:false,
                            bind: {value: '{record.fattgen}',readOnly: '{readOnly}'}
                        },
                        {xtype: 'displayfield', width: 30},
                        {xtype: 'numberfield', fieldLabel: Locale.t('eve.forms.scheda.fields.fattfam')+' €',
                            width: 240, hideTrigger: true,allowDecimals:true,validateOnChange:false,
                            bind: {value: '{record.fattfam}',readOnly: '{readOnly}'}
                        },
                        {xtype: 'displayfield', width: 30},
                        {xtype: 'numberfield', fieldLabel: Locale.t('eve.forms.scheda.fields.ndip'),
                            labelWidth:50,width: 180, hideTrigger: true,allowDecimals:false,
                            itemId:'numdipfld',
                            bind: {value: '{record.ndip}',readOnly: '{readOnly}'}
                        },
                        {xtype: 'displayfield', width: 30},
                        {xtype: 'combo',fieldLabel: Locale.t('eve.forms.scheda.fields.marca'),
                            flex:1,displayField: 'descrizione', valueField: 'descrizione',forceSelection:true,
                            store: Ext.create('eve.store.forms.scheda.Marche'),
                            bind: {value: '{record.marca}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox',
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'displayfield', width:150,fieldLabel: Locale.t('eve.forms.scheda.fields.tipo'),value:''},
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.tipo01'),hideLabel:true, width: 160,
                            bind: {value: '{record.tipo01}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield',boxLabel: Locale.t('eve.forms.scheda.fields.tipo02'),hideLabel:true, width: 160,
                            bind: {value: '{record.tipo02}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.tipo03'),hideLabel:true, width: 160,
                            bind: {value: '{record.tipo03}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox',
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'displayfield', width:150, value:'',fieldLabel: Locale.t('eve.forms.scheda.fields.tipdist')},
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.tipdist01'),hideLabel:true, width: 160,
                            bind: {value: '{record.tipdist01}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield',boxLabel: Locale.t('eve.forms.scheda.fields.tipdist02'),hideLabel:true, width: 160,
                            bind: {value: '{record.tipdist02}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.tipdist03'), hideLabel:true,width: 160,
                            bind: {value: '{record.tipdist03}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox',
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'displayfield', width:150, value:'',fieldLabel: Locale.t('eve.forms.scheda.fields.preso')},
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.cat01'),hideLabel:true, width: 160,
                            bind: {value: '{record.cat01}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'combo',hideLabel: true,forceSelection:true,
                            width:120,displayField: 'descrizione', valueField: 'descrizione',
                            store: Ext.create('eve.store.forms.scheda.Brand'),
                            bind: {value: '{record.brand01}',readOnly: '{readOnly}'}
                        },
                        {xtype: 'displayfield', width: 30},
                        {xtype: 'checkboxfield',boxLabel: Locale.t('eve.forms.scheda.fields.cat02'),hideLabel:true, width: 240,
                            bind: {value: '{record.cat02}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.cat03'), hideLabel:true,width: 230,
                            bind: {value: '{record.cat03}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.cat04'),hideLabel:true, width: 230,
                            bind: {value: '{record.cat04}', readOnly: '{readOnly}'}
                        }
                    ]
                },
               {xtype: 'container', layout: 'hbox',
                   defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                   items: [
                       {xtype: 'displayfield', width:150, value:'',fieldLabel: Locale.t('eve.forms.scheda.fields.daspedire')},
                       {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.cat01'),hideLabel:true, width: 160,
                           bind: {value: '{record.cat11}', readOnly: '{readOnly}'}
                       },
                       {xtype: 'combo',hideLabel: true,forceSelection:true,
                           width:120,displayField: 'descrizione', valueField: 'descrizione',
                           store: Ext.create('eve.store.forms.scheda.Brand'),
                           bind: {value: '{record.brand11}',readOnly: '{readOnly}'}
                       },
                       {xtype: 'displayfield', width: 30},
                       {xtype: 'checkboxfield',boxLabel: Locale.t('eve.forms.scheda.fields.cat02'),hideLabel:true, width: 240,
                           bind: {value: '{record.cat12}', readOnly: '{readOnly}'}
                       },
                       {xtype: 'checkboxfield', boxLabel: Locale.t('eve.forms.scheda.fields.cat03'),hideLabel:true, width: 230,
                           bind: {value: '{record.cat13}', readOnly: '{readOnly}'}
                       },
                       {xtype: 'checkboxfield',boxLabel: Locale.t('eve.forms.scheda.fields.cat04'),hideLabel:true, width: 230,
                           bind: {value: '{record.cat14}', readOnly: '{readOnly}'}
                       }
                   ]
               }
            ]
        },
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('eve.forms.scheda.note')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'htmleditor', reference:'note',hideLabel: true, autoScroll: true, style: 'font-size:14px;',itemId: 'notehtml',
                bind: {readOnly: '{readOnly}', value: '{record.note}'}
            }]
        },
        //Note da fare
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('eve.forms.scheda.notetodo')+'</span>',
            items: [
                {xtype: 'htmleditor', reference:'notetodo',hideLabel: true, autoScroll: true, style: 'font-size:14px;',itemId: 'notetodohtml',
                bind: {readOnly: '{readOnly}', value: '{record.notetodo}'}
            }]
        }
    ]
});