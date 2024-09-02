/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.scheda.cards.Cause', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.cause.fields.dcausa'),width:150,
                    bind: {value: '{record.dcausa}',readOnly: '{readOnlyCause}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMateriale}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.cause.fields.materiale'),hideLabel:true,width: 100,
                    bind: {value: '{record.materiale}', readOnly: '{readOnlyCause}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notemateriale}',readOnly: '{readOnlyCause}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'materialefld',
            bind:{hidden:'{hideMateriale}'}
        }, //allegati materiale
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMan}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.cause.fields.man'),hideLabel:true,width: 100,
                    bind: {value: '{record.man}', readOnly: '{readOnlyCause}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.noteman}',readOnly: '{readOnlyCause}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'manfld',
            bind:{hidden:'{hideMan}'}
        }, //allegati man
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMachine}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.cause.fields.machine'),hideLabel:true,width: 100,
                    bind: {value: '{record.machine}', readOnly: '{readOnlyCause}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notemachine}',readOnly: '{readOnlyCause}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'machinefld',
            bind:{hidden:'{hideMachine}'}
        }, //allegati machine
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideStrumenti}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.cause.fields.strumenti'),hideLabel:true,width: 100,
                    bind: {value: '{record.strumenti}', readOnly: '{readOnlyCause}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notestrumenti}',readOnly: '{readOnlyCause}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'strumentifld',
            bind:{hidden:'{hideStrumenti}'}
        }, //allegati strumenti
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideMetodo}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.cause.fields.metodo'),hideLabel:true,width: 100,
                    bind: {value: '{record.metodo}', readOnly: '{readOnlyCause}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notemetodo}',readOnly: '{readOnlyCause}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'metodofld',
            bind:{hidden:'{hideMetodo}'}
        }, //allegati metodo
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideProgetto}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.cause.fields.progetto'),hideLabel:true,width: 100,
                    bind: {value: '{record.progetto}', readOnly: '{readOnlyCause}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.noteprogetto}',readOnly: '{readOnlyCause}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'progettofld',
            bind:{hidden:'{hideProgetto}'}
        }, //allegati progetto
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideAltrocause}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.cause.fields.altrocause'),hideLabel:true,width: 100,
                    bind: {value: '{record.altrocause}', readOnly: '{readOnlyCause}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                            flex:1,padding:'0 0 10 0',hideLabel: true,
                            bind: {value: '{record.notealtrocause}',readOnly: '{readOnlyCause}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'altrocausefld',
            bind:{hidden:'{hideAltrocause}'}
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                    flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('gnc.forms.scheda.cause.fields.notecausa'),
                    bind: {value: '{record.notecausa}',readOnly: '{readOnlyCause}'}
                }
            ]
        }
    ]
});