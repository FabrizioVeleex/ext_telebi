/**
 * Created by luke on 15/06/21.
 */
Ext.define('bolpas.view.forms.bolla.cards.Info', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.TextField',
        'Ext.form.field.*',
        'Ext.layout.container.HBox',
        'bolpas.model.forms.bolla.Gridresi'
    ],
    scrollable:'y',
    margin:15,
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false, minHeight: 150,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('bolpas.forms.bolla.info')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'radiogroup',fieldLabel: Locale.t('bolpas.forms.bolla.fields.tipo'), columns: 4,flex:1,simpleValue: true,
                            items: [
                                {boxLabel:Locale.t('bolpas.forms.bolla.fields.fornitore'),inputValue:0},
                                {boxLabel:Locale.t('bolpas.forms.bolla.fields.cliente'),inputValue:1},
                                {boxLabel:Locale.t('bolpas.forms.bolla.fields.versamento'),inputValue:2},
                                {boxLabel:Locale.t('bolpas.forms.bolla.fields.laboratorio'),inputValue:3}
                            ],
                            bind: {value:'{record.tipo}',readOnly: '{readOnly}'},
                            listeners: {
                                change:function(rdg,value) {
                                    let vm = this.lookupViewModel(),
                                        rec = vm.get('record')
                                    if (value===2) {
                                        rec.data.idsoggetto = ''
                                        vm.set('hideSoggetto',true);  //visibilità soggetto
                                        vm.set('hideResi',true);  //visibilità grid pratiche resi
                                    } else {
                                        vm.set('hideSoggetto',false);  //visibilità soggetto
                                        if (value===1) {
                                            vm.set('hideResi',false);  //visibilità grid pratiche resi
                                        } else {
                                            vm.set('hideResi',true);  //visibilità grid pratiche resi
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
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'combobox', fieldLabel: Locale.t('bolpas.forms.bolla.fields.idsoggetto'),minChars:3,
                            width:700,matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),
                            autoLoadOnValue:true,forceSelection:true,allowBlank:false,
                            bind: {
                                store: '{storeSoggetti}',
                                readOnly: '{readOnlySogg}',
                                value: '{record.idsoggetto}'
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                '<li role="option" class="x-boundlist-item"><b>{codice}</b>: - {ragsoc} <br>{ubicazione}</li>',
                                '</tpl></ul>'
                            ),
                            valueField: 'id',displayField: 'ragsoc',
                            listeners: {
                                /*
                                select: function (combo, rec) {
                                    if (rec.data.tiposoggetto==='C') {
                                        let vm = this.lookupViewModel()
                                        let controller = this.lookupController()
                                        //creo record reso
                                        let storeresi=vm.get('storeResi')
                                        storeresi.removeAll(); //cancello tutti i record in frontend
                                        storeresi.add(Ext.create('bolpas.model.forms.bolla.Gridresi', {
                                            action: 1, isnew: 1, id: controller.randomString(32),nreso:'',dreso:'',idreso:'',openReso:false
                                            })
                                        )
                                    }
                                },
                                 */
                                beforequery: function (qe) {
                                    let vm = this.lookupViewModel(),
                                        rec = vm.get('record')
                                    delete qe.combo.lastQuery
                                    let storesoggetti=vm.get('storeSoggetti')
                                    if (storesoggetti) {
                                        if (rec.data.tipo===1) {
                                            storesoggetti.getProxy().extraParams.tiposoggetto='C'
                                        } else {
                                            storesoggetti.getProxy().extraParams.tiposoggetto='F'
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    bind: {
                        hidden: '{hideSoggetto}'
                    }
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('bolpas.forms.bolla.fields.numero'),width:400,allowBlank:false,
                            bind: {value: '{record.numero}',readOnly: '{readOnly}'}
                        },
                        {xtype:'displayfield',width:10},
                        {xtype: 'datefield',fieldLabel: Locale.t('bolpas.forms.bolla.fields.datadoc'),labelWidth:150,allowBlank:false,
                            width: 300, format: 'd/m/Y',submitFormat:'Y-m-d',
                            bind: {value: '{record.datadoc}', readOnly: '{readOnly}'}
                        },
                        {xtype:'displayfield',width:10},
                        {xtype: 'combobox', fieldLabel: Locale.t('bolpas.forms.bolla.fields.scaricatoda'),
                            minChars:3, flex:1,forceSelection:true, autoLoadOnValue:true,allowBlank:false,
                            bind: {
                                store: '{storeDip}',
                                value: '{record.scaricatoda}',
                                readOnly: '{readOnly}'
                            },
                            valueField: 'dip_nome',displayField: 'dip_nome'
                        }
                    ],
                    bind: {
                        hidden: '{hideSoggetto}'
                    }
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('bolpas.forms.bolla.fields.numreg'),width:400,readOnly:true,
                            bind: {value: '{record.numreg}'}
                        },
                        {xtype:'displayfield',width:10},
                        {xtype: 'datefield',fieldLabel: Locale.t('bolpas.forms.bolla.fields.datareg'),readOnly:true, width: 300,labelWidth:150,
                            bind: {value: '{record.datareg}'}
                        }
                    ],
                    bind: {
                        hidden: '{hideSoggetto}'
                    }
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',maxHeight:'150',
                            fieldLabel: Locale.t('bolpas.forms.bolla.fields.note'),
                            flex:1,padding:'0 0 10 0',
                            bind: {value: '{record.note}',readOnly: '{readOnly}'}
                        }
                    ]
                }
            ]
        }
    ]
});