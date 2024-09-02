/**
 * Created by luke on 07/10/22.
 */
Ext.define('fmc.view.forms.verifica.cards.Verifica', {
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
            bind: {title: '<span style="color: black;font-weight: bold">'+Locale.t('fmc.forms.verifica.sezinfo')+'{record.numero}'+'</span>'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield',labelAlign:'top',fieldLabel: Locale.t('fmc.forms.verifica.fields.corsocheck'),flex:1,readOnly:true,
                            bind: {value: '{record.updverifica}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield',labelAlign:'top',fieldLabel: Locale.t('fmc.forms.verifica.fields.titolo'),flex:1,
                            bind: {value: '{record.titolo}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'datefield',fieldLabel: Locale.t('fmc.forms.verifica.fields.datachk'),
                            width: 200, format: 'd/m/Y',submitFormat:'Y-m-d',
                            bind: {
                                value: '{record.datachk}',
                                readOnly: '{readOnly}'
                            }
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield',labelAlign:'top',fieldLabel: Locale.t('fmc.forms.verifica.fields.esecutore'),width:500,
                            bind: {value: '{record.esecutore}', readOnly: '{readOnly}'}
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
                            html:'<div><a class="add" href="javascript:void(0)"><img src="/images/icons/pencil.png" title="'+Locale.t('verifica.firmaesecutore')+'" alt="Firma"></a></src></div>',
                            listeners: {
                                click: {
                                    element: 'el', delegate: 'a.add', fn: 'onFirmaEsecutore'
                                }
                            }
                        },
                        {xtype:'image',itemId:'fldfirmaesecutore',alt:'&nbsp',width: 500,height:40,src:''}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',grow:true,
                            fieldLabel: Locale.t('fmc.forms.verifica.fields.note'),
                            flex:1,padding:'0 0 10 0',maxLength:3000,
                            bind: {value: '{record.note}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelWidth:200,labelAlign:'top'},
                    items: [
                        {xtype: 'radiogroup',fieldLabel:Locale.t('fmc.forms.verifica.fields.esito'),
                            columns: 2,width:400,simpleValue: true,
                            items: [
                                {boxLabel:Locale.t('fmc.forms.verifica.fields.esitook'),inputValue:1,name:'esito'},
                                {boxLabel:Locale.t('fmc.forms.verifica.fields.esitoko'),inputValue:-1,name:'esito'}
                            ],
                            bind: {value:'{record.esito}',readOnly: '{readOnly}'}
                        }
                    ]
                }
            ]
        }
    ]
});