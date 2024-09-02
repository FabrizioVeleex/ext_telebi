/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.scheda.cards.Validation', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.RadioGroup',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMateriale}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.validation.fields.materiale_val'),hideLabel:true,width: 100,readOnly: true,
                    bind: {value: '{record.materiale_val}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dric'),width:150,
                    bind: {value: '{record.dricmatval}',readOnly: '{readOnlyValidation}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dcom'),width:150,
                    bind: {value: '{record.dcommatval}',readOnly: '{readOnlyValidation}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMateriale}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notemateriale_val}',readOnly: '{readOnlyValidation}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'materiale_valfld',
            bind:{hidden:'{hideMateriale}'}
        }, //allegati materiale
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMan}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.validation.fields.man_val'),hideLabel:true,width: 100,readOnly: true,
                    bind: {value: '{record.man_val}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dric'),width:150,
                    bind: {value: '{record.dricmanval}',readOnly: '{readOnlyValidation}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dcom'),width:150,
                    bind: {value: '{record.dcommanval}',readOnly: '{readOnlyValidation}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMan}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.noteman_val}',readOnly: '{readOnlyValidation}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'man_valfld',
            bind:{hidden:'{hideMan}'}
        }, //allegati man
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMachine}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.validation.fields.machine_val'),hideLabel:true,width: 100,readOnly:true,
                    bind: {value: '{record.machine_val}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dric'),width:150,
                    bind: {value: '{record.dricmacval}',readOnly: '{readOnlyValidation}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dcom'),width:150,
                    bind: {value: '{record.dcommacval}',readOnly: '{readOnlyValidation}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMachine}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notemachine_val}',readOnly: '{readOnlyValidation}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'machine_valfld',
            bind:{hidden:'{hideMachine}'}
        }, //allegati machine
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideStrumenti}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.validation.fields.strumenti_val'),hideLabel:true,width: 100,readOnly: true,
                    bind: {value: '{record.strumenti_val}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dric'),width:150,
                    bind: {value: '{record.dricstrval}',readOnly: '{readOnlyValidation}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dcom'),width:150,
                    bind: {value: '{record.dcomstrval}',readOnly: '{readOnlyValidation}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideStrumenti}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notestrumenti_val}',readOnly: '{readOnlyValidation}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'strumenti_valfld',
            bind:{hidden:'{hideStrumenti}'}
        }, //allegati strumenti
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMetodo}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.validation.fields.metodo_val'),hideLabel:true,width: 100,readOnly:true,
                    bind: {value: '{record.metodo_val}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dric'),width:150,
                    bind: {value: '{record.dricmetval}',readOnly: '{readOnlyValidation}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dcom'),width:150,
                    bind: {value: '{record.dcommetval}',readOnly: '{readOnlyValidation}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMetodo}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notemetodo_val}',readOnly: '{readOnlyValidation}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'metodo_valfld',
            bind:{hidden:'{hideMetodo}'}
        }, //allegati metodo
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideProgetto}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.validation.fields.progetto_val'),hideLabel:true,width: 100,readOnly:true,
                    bind: {value: '{record.progetto_val}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dric'),width:150,
                    bind: {value: '{record.dricproval}',readOnly: '{readOnlyValidation}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dcom'),width:150,
                    bind: {value: '{record.dcomproval}',readOnly: '{readOnlyValidation}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideProgetto}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.noteprogetto_val}',readOnly: '{readOnlyValidation}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'progetto_valfld',
            bind:{hidden:'{hideProgetto}'}
        }, //allegati progetto
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideAltrocause}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.validation.fields.altrocause_val'),hideLabel:true,width: 100,readOnly:true,
                    bind: {value: '{record.altrocause_val}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dric'),width:150,
                    bind: {value: '{record.dricaltval}',readOnly: '{readOnlyValidation}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.validation.fields.dcom'),width:150,
                    bind: {value: '{record.dcomaltval}',readOnly: '{readOnlyValidation}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideAltrocause}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notealtrocause_val}',readOnly: '{readOnlyValidation}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'altrocause_valfld',
            bind:{hidden:'{hideAltrocause}'}
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'radiogroup', fieldLabel :Locale.t('gnc.forms.scheda.validation.fields.esito'), width:600,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('gnc.forms.scheda.validation.fields.positivo'),inputValue:1},
                        {boxLabel:Locale.t('gnc.forms.scheda.validation.fields.negativo'),inputValue:-1}
                    ],
                    bind: {value:'{record.esito}',readOnly: '{readOnlyValidation}'}
                }
            ]
        },
        {xtype:'container', itemId:'collaudofld'} //schede collaudo
    ]
});