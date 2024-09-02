/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.scheda.cards.Istituzionalize', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Display',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                    flex:1,padding:'0 0 10 0',hideLabel: true,
                    bind: {value: '{record.notechiusura}',readOnly: '{readOnlyIstituzionalize}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.istituzionalize.fields.dfmea'),hideLabel:true,width: 150,
                    bind: {value: '{record.dfmea}', readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.istituzionalize.fields.note'), flex:1,
                    bind: {value: '{record.dfmeanote}',readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'displayfield', value: Locale.t('gnc.forms.scheda.istituzionalize.updattachnew'),
                    bind: {  hidden:'{hideUpdDfmeaNew}'}
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{dwnDfmea}',
                        hidden:'{hideUpdDfmeaDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDwnAttach'}
                    }
                },
                {xtype:'container', itemId:'dfmeafld',
                    bind:{
                    hidden:'{hideUpdDfmea}'
                    }
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{delDfmea}',
                        hidden:'{hideDelDfmeaDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDelAttach'}
                    }
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.istituzionalize.fields.pfmea'),hideLabel:true,width: 150,
                    bind: {value: '{record.pfmea}', readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.istituzionalize.fields.note'), flex:1,
                    bind: {value: '{record.pfmeanote}',readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'displayfield', value: Locale.t('gnc.forms.scheda.istituzionalize.updattachnew'),
                    bind: {  hidden:'{hideUpdPfmeaNew}'}
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{dwnPfmea}',
                        hidden:'{hideUpdPfmeaDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDwnAttach'}
                    }
                },
                {xtype:'container', itemId:'pfmeafld',
                    bind:{
                        hidden:'{hideUpdPfmea}'
                    }
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{delPfmea}',
                        hidden:'{hideDelPfmeaDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDelAttach'}
                    }
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.istituzionalize.fields.cplan'),hideLabel:true,width: 150,
                    bind: {value: '{record.cplan}', readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.istituzionalize.fields.note'), flex:1,
                    bind: {value: '{record.cplannote}',readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'displayfield', value: Locale.t('gnc.forms.scheda.istituzionalize.updattachnew'),
                    bind: {  hidden:'{hideUpdCplanNew}'}
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{dwnCplan}',
                        hidden:'{hideUpdCplanDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDwnAttach'}
                    }
                },
                {xtype:'container', itemId:'cplanfld',
                    bind:{
                        hidden:'{hideUpdCplan}'
                    }
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{delCplan}',
                        hidden:'{hideDelCplanDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDelAttach'}
                    }
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.istituzionalize.fields.istruzioni'),hideLabel:true,width: 150,
                    bind: {value: '{record.istruzioni}', readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.istituzionalize.fields.note'),flex:1,
                    bind: {value: '{record.istnote}',readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'displayfield', value: Locale.t('gnc.forms.scheda.istituzionalize.updattachnew'),
                    bind: {  hidden:'{hideUpdIstNew}'}
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{dwnIstruzioni}',
                        hidden:'{hideUpdIstDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDwnAttach'}
                    }
                },
                {xtype:'container', itemId:'istfld',
                    bind:{
                        hidden:'{hideUpdIst}'
                    }
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{delIstruzioni}',
                        hidden:'{hideDelIstDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDelAttach'}
                    }
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.istituzionalize.fields.proc'),hideLabel:true,width: 150,
                    bind: {value: '{record.proc}', readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.istituzionalize.fields.note'), flex:1,
                    bind: {value: '{record.procnote}',readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'displayfield', value: Locale.t('gnc.forms.scheda.istituzionalize.updattachnew'),
                    bind: {  hidden:'{hideUpdProcNew}'}
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{dwnProc}',
                        hidden:'{hideUpdProcDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDwnAttach'}
                    }
                },
                {xtype:'container', itemId:'procfld',
                    bind:{
                        hidden:'{hideUpdProc}'
                    }
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{delProc}',
                        hidden:'{hideDelProcDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDelAttach'}
                    }
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.istituzionalize.fields.altroist'),hideLabel:true,width: 150,
                    bind: {value: '{record.altroist}', readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.istituzionalize.fields.note'), flex:1,
                    bind: {value: '{record.altroistnote}',readOnly: '{readOnlyIstituzionalize}'}
                },
                {xtype: 'displayfield', value: Locale.t('gnc.forms.scheda.istituzionalize.updattachnew'),
                    bind: {  hidden:'{hideUpdAltroNew}'}
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{dwnAltro}',
                        hidden:'{hideUpdAltroDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDwnAttach'}
                    }
                },
                {xtype:'container', itemId:'altroistfld',
                    bind:{
                        hidden:'{hideUpdAltro}'
                    }
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{delAltro}',
                        hidden:'{hideDelAltroDoc}'
                    },
                    listeners: {
                        click: {element: 'el', delegate: 'a.add', fn: 'onDelAttach'}
                    }
                }
            ]
        },
        {xtype:'container', itemId:'correlatifld'} ,//grid correlati
        {xtype:'container', itemId:'istituzionalizefld'} //allegati
    ]
});