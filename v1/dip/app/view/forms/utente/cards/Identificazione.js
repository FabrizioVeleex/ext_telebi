Ext.define('dip.view.forms.utente.cards.Identificazione', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable: true,
    margin: 15,
    items: [
        { //definizione campi nascosti aggiornamento record
            xtype: 'container',
            hidden:true,
            items:[
                { xtype: 'textfield',itemId:'img_new', bind:{value:'{record.img_new}'}},
                { xtype: 'textfield',itemId:'img_remove', bind:{value:'{record.img_remove}'}},
                { xtype: 'numberfield',itemId:'idsfondo', bind:{value:'{record.idsfondo}'}},
                { xtype: 'numberfield',itemId:'idsfondo', bind:{value:'{record.idsfondo}'}},
            ]
        },
        {
            xtype: 'fieldset',
            title: Locale.t('dip.forms.utente.identificazione'),
            items: [

                {
                    xtype: 'container', bodyStyle: 'background-color:trasparent',
                    layout: {
                        type: 'hbox', align: 'stretch'
                    },
                    items: [
                        {
                            xtype:'container', itemId:'imgUser',
                        },
                        {
                            xtype: 'container', flex: 1,
                            items: [
                                {
                                    xtype: 'container', flex: 1,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        msgTarget: 'side', labelAlign: 'top', margin: 5
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.utente.fields.titolo'), width: 80,
                                            name: 'titolo', maxLength:10,maxLengthText: Locale.t('global.form.maxlengthtext'),
                                            bind: {
                                                readOnly: '{readOnly}',
                                                value: '{record.titolo}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.utente.fields.cognome'),
                                            flex: 1, minWidth: 150, maxLength:100,blankText: Locale.t('global.form.blanktext'),
                                            allowBlank: false,maxLengthText: Locale.t('global.form.maxlengthtext'),
                                            bind: {
                                                readOnly: '{readOnly}',
                                                value: '{record.cognome}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.utente.fields.nome'),
                                            flex: 1, minWidth: 150, maxLength:100,maxLengthText: Locale.t('global.form.maxlengthtext'),
                                            bind: {
                                                readOnly: '{readOnly}',
                                                value: '{record.nome}'
                                            }
                                        },
                                        {
                                            xtype: 'datefield', fieldLabel: Locale.t('dip.forms.utente.fields.datanascita'),
                                            width: 140, format: 'd/m/Y', submitFormat: 'Y-m-d',
                                            bind: {
                                                readOnly: '{readOnly}',
                                                value: '{record.datanascita}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container', flex: 1,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        msgTarget: 'side', labelAlign: 'top', margin: 5
                                    },
                                    items: [
                                        {
                                            xtype: 'combo', fieldLabel: Locale.t('dip.forms.utente.fields.stato'),
                                            displayField: 'stato', valueField: 'id', queryMode: 'local',
                                            allowBlank: false,blankText: Locale.t('global.form.blanktext'),
                                            flex: 1, minWidth: 200, forceSelection: true,
                                            bind: {
                                                store: '{comboStato}',
                                                value: '{record.stato}',
                                                readOnly: '{readOnlyGestore}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.utente.fields.matricola'),
                                            flex: 1, maxLength: 10,maxLengthText: Locale.t('global.form.maxlengthtext'),
                                            bind: {
                                                readOnly: '{readOnly}',
                                                value: '{record.matricola}'
                                            }
                                        },
                                        {
                                            xtype: 'datefield', fieldLabel: Locale.t('dip.forms.utente.fields.dataass'),
                                            width: 140,format: 'd/m/Y', submitFormat: 'Y-m-d',
                                            bind: {
                                                readOnly: '{readOnly}',
                                                value: '{record.dataass}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox', align: 'stretch'
                    },
                    defaults: {
                        msgTarget: 'side', labelAlign: 'top', margin: 5
                    },
                    items: [
                        {
                            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.utente.fields.tel'),
                            flex: 1,
                            //vtype:'validatePhone',
                            bind: {
                                readOnly: '{readOnly}',
                                value: '{record.tel}'
                            }
                        },
                        {
                            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.utente.fields.interno'),
                            flex: 1, maxLength: 10,maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {
                                readOnly: '{readOnly}',
                                value: '{record.interno}'
                            }
                        },
                        {
                            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.utente.fields.cel'),
                            vtype:'validatePhone', flex: 1,
                            bind: {
                                readOnly: '{readOnly}',
                                value: '{record.cel}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox', align: 'stretch'
                    },
                    defaults: {
                        msgTarget: 'side', labelAlign: 'top', margin: 5
                    },
                    items: [
                        {
                            xtype: 'textfield', vtype:'email', fieldLabel: Locale.t('dip.forms.utente.fields.email'),
                            flex: 1,maxLength:250,maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {
                                readOnly: '{readOnly}',
                                value: '{record.email}'
                            }
                        },
                        {
                            xtype: 'textfield', vtype:'email', fieldLabel: Locale.t('dip.forms.utente.fields.email2'),
                            flex: 1,maxLength:250,maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {
                                readOnly: '{readOnly}',
                                value: '{record.email2}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset', collapsible: true, collapsed: false, title: Locale.t('dip.forms.utente.qualifiche'),
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox', align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left', labelWidth: 110, msgTarget: 'side', margin: 5
                    },
                    items: [
                        {
                            xtype: 'textfield',fieldLabel: Locale.t('dip.forms.utente.fields.ufficio'),
                            maxLength: 100,maxLengthText: Locale.t('global.form.maxlengthtext'), flex: 1,
                            bind: {readOnly: '{readOnly}', value: '{record.ufficio}'}
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox', align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left', labelWidth: 110, msgTarget: 'side', margin: 5
                    },
                    items: [
                        {
                            xtype: 'combo', fieldLabel: Locale.t('dip.forms.utente.fields.qualifica'),
                            flex: 1, displayField: 'qualifica', valueField: 'id',
                            queryMode: 'local', forceSelection: true,
                            bind: {
                                store: '{comboQualifica}',
                                value: '{record.idqualifica}',
                                readOnly: '{readOnly}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox', align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left', labelWidth: 110, msgTarget: 'side', margin: 5
                    },
                    items: [
                        {
                            xtype: 'combo', fieldLabel: Locale.t('dip.forms.utente.fields.ruolo'),
                            flex: 1, displayField: 'ruolo', valueField: 'id',
                            queryMode: 'local', forceSelection: true,
                            bind: {
                                store: '{comboRuolo}',
                                value: '{record.idruolo}',
                                readOnly: '{readOnly}'
                            }
                        }
                    ]
                }

            ]
        },
        {
            xtype: 'fieldset',
            defaults: {labelWidth: 150},
            collapsible: true, collapsed: false, title: Locale.t('dip.forms.utente.abilitazioni'),
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox', align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left',
                        msgTarget: 'side',
                        margin: 5
                    },
                    items: [
                        {
                            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.utente.fields.shortname'),
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),flex: 1,
                            bind: {readOnly: '{readOnlyGestore}', value: '{record.shortname}'}
                        },
                        {
                            xtype: 'button', iconCls: 'fas fa-key',
                            text: Locale.t('dip.forms.utente.fields.password'), hidden: true,
                            bind: {
                                hidden:'{readOnlyGestore}'
                            },
                            handler: 'onResetPassword'
                        },
                        {
                            xtype: 'checkboxfield', boxLabel:Locale.t('dip.forms.utente.fields.disabled.false'),
                            hideLabel: true, width:100, fieldBodyCls: 'check-label',
                            bind: {
                                value: '{record.disabled}',
                                readOnly: '{readOnlyGestore}'
                            },
                            listeners:{
                                change:function(field,newValue){
                                    if (newValue===true){
                                        field.setBoxLabel(Locale.t('dip.forms.utente.fields.disabled.true'))
                                    }else{
                                        field.setBoxLabel(Locale.t('dip.forms.utente.fields.disabled.false'))
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'radiogroup', fieldLabel: Locale.t('dip.forms.utente.fields.abilitato'),
                            simpleValue: true, columns: 2, width: 280,labelWidth: 150,
                            items: [
                                {
                                    boxLabel: Locale.t('dip.forms.utente.fields.abilitatoS'),
                                    inputValue: 'S',
                                },
                                {
                                    boxLabel: Locale.t('dip.forms.utente.fields.abilitatoN'),
                                    inputValue: 'N',
                                }
                            ],
                            bind: {
                                value: '{record.accessoesterno}',
                                readOnly: '{readOnlyGestore}'
                            }
                        },
                    ]
                },

                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox', align: 'stretch'
                    },
                    defaults: {labelWidth: 150},
                    items: [
                        {
                            xtype: 'checkboxfield', boxLabel: Locale.t('dip.forms.utente.fields.zimbramail'),
                            hideLabel: true, flex: 1,
                            bind: {value: '{record.zimbramail}', readOnly: '{readOnlyGestore}'}
                        },
                        {xtype: 'displayfield', width: 40},
                        {
                            xtype: 'checkboxfield', boxLabel: Locale.t('dip.forms.utente.fields.allineacli'),
                            readOnly: true, hideLabel: true, flex: 1,
                            bind: {value: '{record.mailcli}'}
                        },
                        {xtype: 'displayfield', width: 40},
                        {
                            xtype: 'checkboxfield', boxLabel: Locale.t('dip.forms.utente.fields.allineafor'),
                            readOnly: true, hideLabel: true, flex: 1,
                            bind: {value: '{record.mailfor}'}
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox', align: 'stretch'
                    },
                    defaults: {labelWidth: 150},
                    items: [
                        {
                            xtype: 'combo', labelWidth: 150, fieldLabel: Locale.t('dip.forms.utente.fields.zona'),
                            flex: 1, displayField: 'descrizione', valueField: 'id',
                            queryMode: 'local', forceSelection: true,
                            bind: {
                                store: '{comboZone}',
                                value: '{record.idzona}',
                                readOnly: '{readOnly}'
                            }
                        },
                        {xtype: 'displayfield', width: 40},
                        {
                            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.utente.fields.cdage'),
                            width: 300,maxLength: 3, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {
                                readOnly: '{readOnly}',
                                value: '{record.cdage}'}
                        }
                    ]
                }
            ]
        }

    ]
});