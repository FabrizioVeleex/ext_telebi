/**
 * Created by luke on 25/03/22.
 */
Ext.define('vda.view.forms.progetto.cards.Progetto', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.TextField',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            style: {'background-color': "transparent;"},
            bind:{title:'<span style="color: black;font-weight:bold">' + Locale.t('vda.forms.progetto.progetto') + ' {record.numero}</span>'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    bind:{hidden:'{hideNew}'},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'label', style: {cursor: 'pointer'},flex:1,
                            html:'<div><a class="add" href="javascript:void(0)">'+Locale.t('vda.forms.progetto.concept.apriprogetto')+'</a></div>',
                            listeners: {
                                click: {
                                    element: 'el',
                                    delegate: 'a.add',
                                    fn: 'onOpenProgetto'
                                }
                            }
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('vda.forms.progetto.concept.fields.nome'),
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            flex:1,maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {value: '{record.nome}',readOnly: '{readOnlyConcept}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('vda.forms.progetto.richiesta')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'radiogroup',fieldLabel:Locale.t('vda.forms.progetto.concept.fields.tipo'),
                            columns: 2,flex:1,simpleValue: true,
                            items: [
                                {boxLabel:Locale.t('vda.forms.progetto.concept.fields.progettazione'),inputValue:1},
                                {boxLabel:Locale.t('vda.forms.progetto.concept.fields.componente'),inputValue:2}
                            ],
                            bind: {value:'{record.tipo}',readOnly: '{readOnlyConcept}'},
                            listeners: {
                                change:function(rdg,value) {
                                    let vm = this.lookupViewModel()
                                    if (value===2) {
                                        vm.set('hideCliente',true)  //visibilità cliente
                                        vm.set('hideComponente',false)  //visibilità componente
                                    } else {
                                        vm.set('hideCliente',false) //visibilità cliente
                                        vm.set('hideComponente',true)  //visibilità componente
                                    }
                                }
                            }
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    bind: {hidden: '{hideComponente}'},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('vda.forms.progetto.concept.fields.progassociato'),
                            flex:1,maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {value: '{record.progassociato}',readOnly: '{readOnlyConcept}'}
                        }
                    ]
                },
                {xtype:'container',flex:1,
                    layout: {
                        type: "hbox"
                    },
                    bind: {hidden: '{hideCliente}'},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'combobox', fieldLabel: Locale.t('vda.forms.progetto.concept.fields.cdcli'),minChars:3,
                            width:700,matchFieldWidth:true,emptyText:Locale.t('global.form.combo.combo'),
                            autoLoadOnValue:true, forceSelection:true,
                            bind: {
                                store: '{storeClienti}',
                                value: '{record.cdcli}',
                                readOnly: '{readOnlyConcept}'
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                '<li role="option" class="x-boundlist-item"><b>{codice}</b>: - {ragsoc}</li>',
                                '</tpl></ul>'
                            ),
                            valueField: 'codice',displayField: 'ragsoc',
                            listeners:{
                                select:function (cmb,record) {
                                    let vm = this.lookupViewModel(),
                                        rec = vm.get('record')
                                    rec.data.cdcli = record.data.codice
                                    rec.data.idsoggetto = record.data.id
                                }
                            }
                        },
                        {xtype: 'textfield', fieldLabel: Locale.t('vda.forms.progetto.concept.fields.nporte'), width:250,
                            maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {value: '{record.nporte}',readOnly: '{readOnlyConcept}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    bind: {hidden: '{hideCliente}'},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'displayfield',width:150, value:Locale.t('vda.forms.progetto.concept.fields.tecnologia')+':'},
                        {xtype: 'checkboxfield', boxLabel:Locale.t('vda.forms.progetto.concept.fields.manuale'),
                            hideLabel: true, width:150, fieldBodyCls: 'check-label',
                            bind: {value: '{record.manuale}', readOnly: '{readOnlyConcept}'}
                        },
                        {xtype: 'checkboxfield', boxLabel:Locale.t('vda.forms.progetto.concept.fields.elettrico'),
                            hideLabel: true, width:150, fieldBodyCls: 'check-label',
                            bind: {value: '{record.elettrico}',readOnly: '{readOnlyConcept}'}
                        },
                        {xtype: 'checkboxfield', boxLabel:Locale.t('vda.forms.progetto.concept.fields.elettricoatp'),
                            hideLabel: true, width:150, fieldBodyCls: 'check-label',
                            bind: {value: '{record.elettricoatp}', readOnly: '{readOnlyConcept}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    bind: {hidden: '{hideCliente}'},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',
                            flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('vda.forms.progetto.concept.fields.applicazione'),
                            bind: {value: '{record.applicazione}',readOnly: '{readOnlyConcept}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    bind: {hidden: '{hideComponente}'},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',
                            flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('vda.forms.progetto.concept.fields.articoli'),
                            bind: {value: '{record.articoli}',readOnly: '{readOnlyConcept}'}
                        }
                    ]
                }
            ]
        }
    ]
});