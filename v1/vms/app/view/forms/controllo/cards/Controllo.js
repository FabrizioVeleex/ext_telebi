/**
 * Created by luke on 07/10/22.
 */
Ext.define('vms.view.forms.controllo.cards.Controllo', {
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
            bind: {title: '<span style="color: black;font-weight: bold">'+Locale.t('vms.forms.controllo.sezinfo')+'{record.numero}'+'</span>'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'combobox', fieldLabel: Locale.t('vms.forms.controllo.fields.idprodotto'),minChars:3,typeAhead: true,
                            forceSelection:true,flex:1,matchFieldWidth:false,emptyText:Locale.t('vms.forms.controllo.emptyprodotto'),allowBlank:false,
                            bind: {
                                store: '{storeProdotti}',
                                readOnly: '{readOnlyProd}',
                                value: '{record.idprodotto}'
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                '<li role="option" class="x-boundlist-item"><b>'+Locale.t('vms.forms.controllo.combotitolo1')+'</b>:{stabilimenti} {numero} {tipo} - <b>'+Locale.t('vms.forms.controllo.combotitolo2')+'</b>:{matricola} {descrizione}</li>',
                                '</tpl></ul>'
                            ),
                            valueField: 'id',displayField: 'descrizione', queryMode: 'local',
                            listeners: {
                                select: function(cmb,record) {
                                    let vm = this.lookupViewModel(),ctrl = this.lookupController(), rec = vm.get("record")
                                    let matricola=ctrl.cardControllo.down("#fldmatricola")
                                    if (matricola) {matricola.setValue(record.data.matricola)}
                                    let numprod=ctrl.cardControllo.down("#fldnumprod")
                                    if (numprod) {numprod.setValue(record.data.numero)}
                                    let classe=ctrl.cardControllo.down("#fldclasse")
                                    if (classe) {classe.setValue(record.data.classe)}
                                    let reparto=ctrl.cardControllo.down("#fldreparto")
                                    if (reparto) {reparto.setValue(record.data.reparto)}
                                    if (record.data['codice']==='02') { //strumento
                                        vm.set('hideClasse',false);  //visualizzazione campo classe
                                    } else {
                                        vm.set('hideClasse',true);  //visualizzazione campo classe
                                    }
                                    rec.data["tipo"] = record.data["codice"]; //tipo attrezzatura
                                    rec.data["ubicazione"] = record.data["stabilimenti"]; //ubicazione
                                }
                            }
                        },
                        {xtype: 'textfield',fieldLabel: Locale.t('vms.forms.controllo.fields.numprod'),width:300,readOnly:true,
                            itemId:'fldnumprod',bind: {value: '{record.numprod}'}
                        },
                        {xtype: 'textfield',fieldLabel: Locale.t('vms.forms.controllo.fields.matricola'),width:300,readOnly:true,
                            itemId:'fldmatricola',bind: {value: '{record.matricola}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'textfield',fieldLabel: Locale.t('vms.forms.controllo.fields.classe'),width:400,readOnly:true,
                            itemId:'fldclasse',bind: {value: '{record.classe}',hidden: '{hideClasse}'}
                        },
                        {xtype: 'textfield',fieldLabel: Locale.t('vms.forms.controllo.fields.reparto'),flex:1,readOnly:true,
                            itemId:'fldreparto',bind: {value: '{record.reparto}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'combobox', fieldLabel: Locale.t('vms.forms.controllo.fields.idtipologia'),minChars:3,
                            flex:1,forceSelection:true,emptyText:Locale.t('vms.forms.controllo.emptytipologia'),
                            bind: {
                                store: '{storeTipologie}',
                                readOnly: '{readOnly}',
                                value: '{record.idtipologia}'
                            },
                            valueField: 'id',displayField: 'descrizione', queryMode: 'local',
                            listeners: {
                                select: function(cmb,rec) {
                                    let vm = this.lookupViewModel(),record = vm.get("record")
                                    record.set("durata", rec.data.durata); //imposto durata e calcolo scadenza
                                    if (record.data.datac !== "" && record.data.datac !== "0000-00-00" && rec.data.durata !== 0) {
                                        if (record.data.datasca === "" || record.data.datasca === "0000-00-00" || !record.data.datasca) {
                                            let dt = Ext.Date.add(
                                                new Date(record.get("datac")),
                                                Ext.Date.MONTH,
                                                record.data.durata
                                            );
                                            record.set("datasca", dt); //setto data scadenza
                                        }
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
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'textfield',labelAlign:'top',fieldLabel: Locale.t('vms.forms.controllo.fields.normativa'),flex:1,
                            bind: {value: '{record.normativa}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelWidth:200,labelAlign:'top'},
                    items: [
                        {xtype: 'radiogroup',fieldLabel:Locale.t('vms.forms.controllo.fields.esito'),
                            columns: 2,width:400,simpleValue: true,
                            items: [
                                {boxLabel:Locale.t('vms.forms.controllo.fields.esitook'),inputValue:1,name:'esito'},
                                {boxLabel:Locale.t('vms.forms.controllo.fields.esitoko'),inputValue:-1,name:'esito'}
                            ],
                            bind: {value:'{record.esito}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'datefield',fieldLabel: Locale.t('vms.forms.controllo.fields.datac'),
                            width: 200, format: 'd/m/Y',submitFormat:'Y-m-d',allowBlank:false,
                            bind: {
                                value: '{record.datac}',
                                readOnly: '{readOnly}'
                            },
                            listeners:{
                                blur: function(fld) {
                                    let vm = this.lookupViewModel(),record = vm.get("record")
                                    if (fld.getValue() && record.data.durata !== 0) {
                                        if (record.data.datasca === "" || record.data.datasca === "0000-00-00" || !record.data.datasca) {
                                            let dt = Ext.Date.add(
                                                new Date(fld.getValue()),
                                                Ext.Date.MONTH,
                                                record.data.durata
                                            );
                                            record.set("datasca", dt); //setto data scadenza
                                        }
                                    }
                                }
                            }
                        },
                        {xtype: 'numberfield', fieldLabel: Locale.t('vms.forms.controllo.fields.durata'),
                            width: 200, hideTrigger: true,allowDecimals:false,readOnly:true,
                            bind: {value: '{record.durata}'}
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('vms.forms.controllo.fields.datasca'),
                            width: 200, format: 'd/m/Y',submitFormat:'Y-m-d',
                            bind: {
                                value: '{record.datasca}',
                                readOnly: '{readOnly}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: { margin: 5, labelAlign: 'top' },
                    items: [
                        {
                            xtype: 'numberfield', fieldLabel: Locale.t('vms.forms.controllo.fields.ciclikm'),
                            width: 200, hideTrigger: true, allowDecimals: false,
                            bind: { value: '{record.ciclikm}', readOnly: '{readOnly}' }
                        },
                        {
                            xtype: 'numberfield', fieldLabel: Locale.t('vms.forms.controllo.fields.ciclikmsucc'),
                            width: 200, hideTrigger: true, allowDecimals: false,
                            bind: { value: '{record.ciclikmsucc}', readOnly: '{readOnly}' }
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'textfield',labelAlign:'top',fieldLabel: Locale.t('vms.forms.controllo.fields.esecutore'),width:500,
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
                            html:'<div><a class="add" href="javascript:void(0)"><img src="/images/icons/pencil.png" title="'+Locale.t('vms.forms.controllo.firmaesecutore')+'" alt="firma"></a></img></a></div>',
                            listeners: {
                                click: {
                                    element: 'el', delegate: 'a.add', fn: 'onFirmaEsecutore'
                                }
                            }
                        },
                        {xtype:'image', alt:'&nbsp',  itemId:'fldfirma',width: 500,height:40,src:''}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype: 'textfield',labelAlign:'top',fieldLabel: Locale.t('vms.forms.controllo.fields.compilatore'),width:500,
                            bind: {value: '{record.compilatore}', readOnly: '{readOnly}'}
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
                            fieldLabel: Locale.t('vms.forms.controllo.fields.attivita'),
                            flex:1,padding:'0 0 10 0',maxLength:3000,
                            bind: {value: '{record.attivita}', readOnly: '{readOnly}'}
                        }
                    ]
                }
            ]
        }
    ]
});