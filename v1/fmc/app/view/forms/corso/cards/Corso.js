/**
 * Created by luke on 07/10/22.
 */
Ext.define('fmc.view.forms.corso.cards.Corso', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            style: {'background-color': "transparent;"},
            bind: {title: '<span style="color: black;font-weight: bold">'+Locale.t('fmc.forms.corso.sezinfo')+'{record.numero}'+'</span>'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5},
                    bind: {hidden: '{hideUpdate}'},
                    items: [
                        {xtype: 'textfield',labelAlign:'top',fieldLabel: Locale.t('fmc.forms.corso.fields.aggiornamento'),flex:1,readOnly:true,
                            bind: {value: '{record.updcorso}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'datefield',fieldLabel: Locale.t('fmc.forms.corso.fields.datac'),
                            width: 160, format: 'd/m/Y',submitFormat:'Y-m-d',
                            bind: {
                                value: '{record.datac}',
                                readOnly: '{readOnly}'
                            }
                        },
                        {xtype: 'numberfield', fieldLabel: Locale.t('fmc.forms.corso.fields.durata'),
                            width: 160, hideTrigger: true,allowDecimals:false,
                            bind: {value: '{record.durata}',readOnly: '{readOnly}'},
                            listeners:{
                                blur:'onChangeDurata'
                            }
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('fmc.forms.corso.fields.datasca'),
                            width: 160, format: 'd/m/Y',submitFormat:'Y-m-d',
                            bind: {
                                value: '{record.datasca}',
                                readOnly: '{readOnly}'
                            }
                        },
                        {xtype: 'combobox', fieldLabel: Locale.t('fmc.forms.corso.fields.idtipologia'),minChars:3,
                            flex:1,forceSelection:true,emptyText:Locale.t('fmc.forms.corso.emptytipologia'),
                            bind: {
                                store: '{storeTipologie}',
                                readOnly: '{readOnly}',
                                value: '{record.idtipologia}'
                            },
                            valueField: 'id',displayField: 'descrizione', queryMode: 'local'
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield',labelAlign:'top',fieldLabel: Locale.t('fmc.forms.corso.fields.docente'),width:500,
                            bind: {value: '{record.docente}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'combobox', labelAlign:'top',fieldLabel: Locale.t('fmc.forms.corso.fields.idsede'),minChars:3,
                            flex:1,forceSelection:true,emptyText:Locale.t('fmc.forms.corso.emptysede'),
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            bind: {
                                store: '{storeSedi}',
                                readOnly: '{readOnly}',
                                value: '{record.idsede}'
                            },
                            valueField: 'id',displayField: 'nome', queryMode: 'local'
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                            html:'<src><a class="add" href="javascript:void(0)"><img src="/images/icons/pencil.png" title="'+Locale.t('fmc.forms.corso.firmadocente')+'" alt="Firma"></src></a></div>',
                            listeners: {
                                click: {
                                    element: 'el', delegate: 'a.add', fn: 'onFirmaDocente'
                                }
                            }
                        },
                        {xtype:'image', alt:'&nbsp',itemId:'fldfirmadocente',width: 500,height:40,src:''}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',grow:true,
                            fieldLabel: Locale.t('fmc.forms.corso.fields.oggetto'),
                            flex:1,padding:'0 0 10 0',maxLength:3000,
                            bind: {value: '{record.oggetto}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',grow:true,
                            fieldLabel: Locale.t('fmc.forms.corso.fields.materiale'),
                            flex:1,padding:'0 0 10 0',maxLength:3000,
                            bind: {value: '{record.materiale}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelWidth:200,labelAlign:'top'},
                    items: [
                        {xtype: 'radiogroup',fieldLabel:Locale.t('fmc.forms.corso.fields.esito'),
                            columns: 2,width:400,simpleValue: true,
                            items: [
                                {boxLabel:Locale.t('fmc.forms.corso.fields.esitook'),inputValue:1},
                                {boxLabel:Locale.t('fmc.forms.corso.fields.esitoko'),inputValue:-1}
                            ],
                            bind: {value:'{record.esito}',readOnly: '{readOnly}'}
                        }
                    ]
                }
            ]
        }
    ]
});