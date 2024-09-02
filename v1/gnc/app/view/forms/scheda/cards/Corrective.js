/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.scheda.cards.Corrective', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
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
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.corrective.fields.materiale_ca'),hideLabel:true,width: 100,readOnly: true,
                    bind: {value: '{record.materiale_ca}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notemateriale_ca}',readOnly: '{readOnlyMateriale}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMateriale}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.responsabile'), flex:1,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente_materiale}',
                        value: '{record.materiale_resp}',
                        readOnly: '{readOnlyCorrective}'
                    }
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dric'),width:150,
                    bind: {value: '{record.dricmatca}',readOnly: '{readOnlyCorrective}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dcom'),width:150,
                    bind: {value: '{record.dcommatca}',readOnly: '{readOnlyMateriale}'}
                }
            ]
        },
        {xtype:'container', itemId:'materiale_cafld',
            bind:{hidden:'{hideMateriale}'}
        }, //allegati materiale
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMan}'},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.corrective.fields.man_ca'),hideLabel:true,width: 100,readOnly: true,
                    bind: {value: '{record.man_ca}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.noteman_ca}',readOnly: '{readOnlyMan}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMan}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.responsabile'), flex:1,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente_man}',
                        value: '{record.man_resp}',
                        readOnly: '{readOnlyCorrective}'
                    }
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dric'),width:150,
                    bind: {value: '{record.dricmanca}',readOnly: '{readOnlyCorrective}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dcom'),width:150,
                    bind: {value: '{record.dcommanca}',readOnly: '{readOnlyMan}'}
                }
            ]
        },
        {xtype:'container', itemId:'formazionefld', //corsi formazione
            bind:{hidden:'{hideMan}'}
        },
        {xtype:'container', itemId:'man_cafld',
            bind:{hidden:'{hideMan}'}
        }, //allegati man
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMachine}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.corrective.fields.machine_ca'),hideLabel:true,width: 100,readOnly:true,
                    bind: {value: '{record.machine_ca}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notemachine_ca}',readOnly: '{readOnlyMachine}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMachine}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.responsabile'), flex:1,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente_machine}',
                        value: '{record.machine_resp}',
                        readOnly: '{readOnlyCorrective}'
                    }
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dric'),width:150,
                    bind: {value: '{record.dricmacca}',readOnly: '{readOnlyCorrective}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dcom'),width:150,
                    bind: {value: '{record.dcommacca}',readOnly: '{readOnlyMachine}'}
                }
            ]
        },
        {xtype:'container', itemId:'macchinarifld', //monitoraggio macchinari
            bind:{hidden:'{hideMachine}'}
        },
        {xtype:'container', itemId:'machine_cafld',
            bind:{hidden:'{hideMachine}'}
        }, //allegati machine
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideStrumenti}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.corrective.fields.strumenti_ca'),hideLabel:true,width: 100,readOnly: true,
                    bind: {value: '{record.strumenti_ca}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notestrumenti_ca}',readOnly: '{readOnlyStrumenti}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideStrumenti}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.responsabile'), flex:1,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente_strumenti}',
                        value: '{record.strumenti_resp}',
                        readOnly: '{readOnlyCorrective}'
                    }
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dric'),width:150,
                    bind: {value: '{record.dricstrca}',readOnly: '{readOnlyCorrective}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dcom'),width:150,
                    bind: {value: '{record.dcomstrca}',readOnly: '{readOnlyStrumenti}'}
                }
            ]
        },
        {xtype:'container', itemId:'strumenti_cafld',
            bind:{hidden:'{hideStrumenti}'}
        }, //allegati strumenti
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMetodo}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.corrective.fields.metodo_ca'),hideLabel:true,width: 100,readOnly:true,
                    bind: {value: '{record.metodo_ca}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notemetodo_ca}',readOnly: '{readOnlyMetodo}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMetodo}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.responsabile'), flex:1,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente_metodo}',
                        value: '{record.metodo_resp}',
                        readOnly: '{readOnlyCorrective}'
                    }
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dric'),width:150,
                    bind: {value: '{record.dricmetca}',readOnly: '{readOnlyCorrective}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dcom'),width:150,
                    bind: {value: '{record.dcommetca}',readOnly: '{readOnlyMetodo}'}
                }
            ]
        },
        {xtype:'container', itemId:'metodo_cafld',
            bind:{hidden:'{hideMetodo}'}
        }, //allegati metodo
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideProgetto}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.corrective.fields.progetto_ca'),hideLabel:true,width: 100,readOnly:true,
                    bind: {value: '{record.progetto_ca}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.noteprogetto_ca}',readOnly: '{readOnlyProgetto}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideProgetto}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.responsabile'), flex:1,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente_progetto}',
                        value: '{record.progetto_resp}',
                        readOnly: '{readOnlyCorrective}'
                    }
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dric'),width:150,
                    bind: {value: '{record.dricproca}',readOnly: '{readOnlyCorrective}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dcom'),width:150,
                    bind: {value: '{record.dcomproca}',readOnly: '{readOnlyProgetto}'}
                }
            ]
        },
        {xtype:'container', itemId:'progetto_cafld',
            bind:{hidden:'{hideProgetto}'}
        }, //allegati progetto
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideAltrocause}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.corrective.fields.altrocause_ca'),hideLabel:true,width: 100,readOnly:true,
                    bind: {value: '{record.altrocause_ca}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notealtrocause_ca}',readOnly: '{readOnlyAltro}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideAltrocause}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.responsabile'), flex:1,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente_altro}',
                        value: '{record.altro_resp}',
                        readOnly: '{readOnlyCorrective}'
                    }
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dric'),width:150,
                    bind: {value: '{record.dricaltca}',readOnly: '{readOnlyCorrective}'}
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.corrective.fields.dcom'),width:150,
                    bind: {value: '{record.dcomaltca}',readOnly: '{readOnlyAltro}'}
                }
            ]
        },
        {xtype:'container', itemId:'altrocause_cafld',
            bind:{hidden:'{hideAltrocause}'}
        }
    ]
});