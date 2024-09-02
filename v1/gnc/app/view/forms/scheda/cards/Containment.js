/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.scheda.cards.Containment', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideLotto}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.containment.fields.lotto'),hideLabel:true,width: 200,
                    bind: {value: '{record.lotto}', readOnly: '{readOnlyContainment}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.responsabile'), flex:1,
                            displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                            bind: {
                                store: '{comboUtente_lotto}',
                                value: '{record.lotto_resp}',
                                readOnly: '{readOnlyContainment}'
                            }
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.dric'),width:150,
                            bind: {value: '{record.driclotto}',readOnly: '{readOnlyContainment}'}
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.dcom'),width:150,
                            bind: {value: '{record.dcomlotto}',readOnly: '{readOnlyLotto}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideLotto}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'numberfield', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.totok'),
                            width:150, hideTrigger: true, allowDecimals:false,
                            bind: {readOnly: '{readOnlyLotto}', value: '{record.totok}'},
                            listeners: {
                                focusleave:function() {
                                    let vm = this.lookupViewModel(),ctrl = this.lookupController(),
                                        rec = vm.get('record')
                                    if (rec) {
                                        let totali = rec.data.totok+rec.data.totko
                                        let totfld=ctrl.cardScheda.down("#totfld")
                                        if (totfld) {
                                            totfld.setValue(totali)
                                        }
                                    }
                                }
                            }
                        },
                        {xtype: 'numberfield', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.totko'),
                            width:150, hideTrigger: true, allowDecimals:false,
                            bind: {readOnly: '{readOnlyLotto}', value: '{record.totko}'},
                            listeners: {
                                focusleave:function() {
                                    let vm = this.lookupViewModel(),ctrl = this.lookupController(),
                                        rec = vm.get('record')
                                    if (rec) {
                                        let totali = rec.data.totok+rec.data.totko
                                        let totfld=ctrl.cardScheda.down("#totfld")
                                        if (totfld) {
                                            totfld.setValue(totali)
                                        }
                                    }
                                }
                            }
                        },
                        {xtype: 'numberfield', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.totali'),
                            width:150, hideTrigger: true, allowDecimals:false,readOnly:true, itemId:'totfld',
                            bind: {value: '{record.totali}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'lottofld',
            bind:{hidden:'{hideLotto}'}
        }, //allegati lotto
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideBlocco}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.containment.fields.blocco'),hideLabel:true,width: 200,
                    bind: {value: '{record.blocco}', readOnly: '{readOnlyContainment}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.responsabile'), flex:1,
                            displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                            bind: {
                                store: '{comboUtente_blocco}',
                                value: '{record.blocco_resp}',
                                readOnly: '{readOnlyContainment}'
                            }
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.dric'),width:150,
                            bind: {value: '{record.dricblocco}',readOnly: '{readOnlyContainment}'}
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.dcom'),width:150,
                            bind: {value: '{record.dcomblocco}',readOnly: '{readOnlyBlocco}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'bloccofld',
            bind:{hidden:'{hideBlocco}'}
        }, //allegati blocco
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideStock}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.containment.fields.stock'),hideLabel:true,width: 200,
                    bind: {value: '{record.stock}', readOnly: '{readOnlyContainment}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.responsabile'), flex:1,
                            displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                            bind: {
                                store: '{comboUtente_stock}',
                                value: '{record.stock_resp}',
                                readOnly: '{readOnlyContainment}'
                            }
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.dric'),width:150,
                            bind: {value: '{record.dricstock}',readOnly: '{readOnlyContainment}'}
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.dcom'),width:150,
                            bind: {value: '{record.dcomstock}',readOnly: '{readOnlyStock}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideStock}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'numberfield', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.totok'),
                            width:150, hideTrigger: true, allowDecimals:false,
                            bind: {readOnly: '{readOnlyStock}', value: '{record.totokstock}'},
                            listeners: {
                                focusleave:function() {
                                    let vm = this.lookupViewModel(),ctrl = this.lookupController(),
                                        rec = vm.get('record')
                                    if (rec) {
                                        let totali = rec.data.totokstock+rec.data.totkostock
                                        let totfld=ctrl.cardScheda.down("#totfldstock")
                                        if (totfld) {
                                            totfld.setValue(totali)
                                        }
                                    }
                                }
                            }
                        },
                        {xtype: 'numberfield', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.totko'),
                            width:150, hideTrigger: true, allowDecimals:false,
                            bind: {readOnly: '{readOnlyStock}', value: '{record.totkostock}'},
                            listeners: {
                                focusleave:function() {
                                    let vm = this.lookupViewModel(),ctrl = this.lookupController(),
                                        rec = vm.get('record')
                                    if (rec) {
                                        let totali = rec.data.totokstock+rec.data.totkostock
                                        let totfld=ctrl.cardScheda.down("#totfldstock")
                                        if (totfld) {
                                            totfld.setValue(totali)
                                        }
                                    }
                                }
                            }
                        },
                        {xtype: 'numberfield', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.totali'),
                            width:150, hideTrigger: true, allowDecimals:false,readOnly:true, itemId:'totfldstock',
                            bind: {value: '{record.totalistock}'}
                        }
                    ]
                }
            ]
        },
        {xtype:'container', itemId:'stockfld',
            bind:{hidden:'{hideStock}'}
        }, //allegati stock
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideAltrocontainment}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('gnc.forms.scheda.containment.fields.altrocontainment'),hideLabel:true,width: 200,
                    bind: {value: '{record.altrocontainment}', readOnly: '{readOnlyContainment}'}
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'combo', fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.responsabile'),flex:1,
                            displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                            bind: {
                                store: '{comboUtente_altrocontainment}',
                                value: '{record.altrocontainment_resp}',
                                readOnly: '{readOnlyContainment}'
                            }
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.dric'),width:150,
                            bind: {value: '{record.dricaltrocont}',readOnly: '{readOnlyContainment}'}
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.containment.fields.dcom'),width:150,
                            bind: {value: '{record.dcomaltrocont}',readOnly: '{readOnlyAltroContainment}'}
                        }
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideAltrocontainment}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                    flex:1,padding:'0 0 10 0',hideLabel:true,
                    bind: {value: '{record.notecontainment}',readOnly: '{readOnlyAltroContainment}'}
                }
            ]
        },
        {xtype:'container', itemId:'altrofld',
            bind:{hidden:'{hideAltrocontainment}'}
        } //allegati altro
    ]
});