/**
 * Created by luke on 03/10/22.
 */
Ext.define('vms.view.forms.prodotto.cards.Prodotto', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox',
        'vms.view.forms.prodotto.component.ComboStabilimento'
    ],
    scrollable:'y',
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('vms.forms.prodotto.informazioni')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'combobox', fieldLabel: Locale.t('vms.forms.prodotto.fields.idtipo'),minChars:3,
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            flex:1,forceSelection:true,emptyText:Locale.t('vms.forms.prodotto.emptytipo'),
                            bind: {
                                store: '{storeTipi}',
                                readOnly: '{readOnlyTipo}',
                                value: '{record.idtipo}'
                            },
                            valueField: 'id',displayField: 'descrizione', queryMode: 'local',
                            listeners: {
                                select: function(cmb,record) {
                                    let vm = this.lookupViewModel()
                                    if (record.data['tipo']==='02') { //strumento
                                        vm.set('hideClasse',false);  //visualizzazione campo classe
                                    } else {
                                        vm.set('hideClasse',true);  //visualizzazione campo classe
                                    }
                                }
                            },
                        },
                        {xtype: "v1-vms-tagstabilimenti",flex: 1,
                            bind: {
                                readOnly: "{readOnly}",
                                store: "{storeStabilimenti}",
                                value: "{record.stabilimenti}",
                            }
                        }
                        /*
                        {xtype: 'combobox', fieldLabel: Locale.t('vms.forms.prodotto.fields.idsede'),minChars:3,
                            flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            forceSelection:true,emptyText:Locale.t('vms.forms.prodotto.emptysede'),
                            bind: {
                                store: '{storeSedi}',
                                readOnly: '{readOnly}',
                                value: '{record.idsede}'
                            },
                            valueField: 'id',displayField: 'descrizione', queryMode: 'local'
                        }
                        */
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('vms.forms.prodotto.fields.descrizione'),
                            flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {value: '{record.descrizione}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'numberfield', fieldLabel:Locale.t('vms.forms.prodotto.fields.numero'),width:250,
                            hideTrigger: true, allowDecimals:false,
                            bind: {readOnly: '{readOnly}',value: '{record.numero}'}
                        },
                        {xtype: 'textfield', fieldLabel: Locale.t('vms.forms.prodotto.fields.matricola'),flex:1,
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {value: '{record.matricola}',readOnly: '{readOnly}'}
                        },
                        {xtype: 'textfield', fieldLabel: Locale.t('vms.forms.prodotto.fields.reparto'),flex:1,
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {value: '{record.reparto}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('vms.forms.prodotto.fields.classe'),width:300,
                            maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {value: '{record.classe}',readOnly: '{readOnly}',hidden: '{hideClasse}'}
                        },
                        {xtype: 'combobox', fieldLabel: Locale.t('vms.forms.prodotto.fields.costruttore'),minChars:3,
                            flex:1,forceSelection:false,
                            bind: {
                                store: '{storeCostruttori}',
                                readOnly: '{readOnly}',
                                value: '{record.costruttore}'
                            },
                            valueField: 'descrizione',displayField: 'descrizione', queryMode: 'local'
                        },
                        {xtype: 'datefield',fieldLabel: Locale.t('vms.forms.prodotto.fields.servizio'),
                            width: 200, format: 'd/m/Y',submitFormat:'Y-m-d',
                            bind: {value: '{record.servizio}', readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto',
                            fieldLabel: Locale.t('vms.forms.prodotto.fields.note'),
                            flex:1,padding:'0 0 10 0',
                            bind: {value: '{record.note}',readOnly: '{readOnly}'}
                        }
                    ]
                }
            ]
        }
    ]
});