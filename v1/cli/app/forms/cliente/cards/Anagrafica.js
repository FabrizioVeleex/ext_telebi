/**
 * Created by luke on 03/06/23.
 */
Ext.define('cli.forms.cliente.cards.Anagrafica', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.azienda'),
                    flex:1,readOnly:true,
                    bind: {value: '{record.azienda}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.cdcli'), flex:1,
                    bind: {readOnly: '{readOnly}',value: '{record.cdcli}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.codice'), flex:1,
                    bind: {readOnly: '{readOnly}',value: '{record.codice}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.codicesost'), flex:1,
                    bind: {readOnly: '{readOnly}',value: '{record.codicesost}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.ragsoc'),
                    flex:1,allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.ragsoc}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.codfis'),
                    flex:1, maxLength: 20,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.codfis}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.piva'),
                    flex:1, maxLength: 20,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.piva}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'radiogroup',fieldLabel: Locale.t('cli.forms.cliente.fields.estero'), columns: 2,width:300,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('cli.forms.cliente.radio.ita'),inputValue:0},
                        {boxLabel:Locale.t('cli.forms.cliente.radio.ee'),inputValue:1}
                    ],
                    bind: {value:'{record.estero}',readOnly: '{readOnly}'},
                    listeners: {
                        change:function(rdg,value) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            if (value===1) {
                                vm.set('hideIta',true);
                                vm.set('hideEE',false);
                            } else {
                                vm.set('hideIta',false);
                                vm.set('hideEE',true);
                            }
                        }
                    }
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.indirizzo'),
                    flex:1, maxLength: 250,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.indirizzo}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.cap'),
                    width:250, maxLength: 10,maxLengthText:Locale.t('global.maxlengthtext'), itemId:'fldcap',
                    bind: {value: '{record.cap}',readOnly: '{readOnly}'}
                }
            ]
        },
        //italia
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            bind: {hidden: '{hideIta}'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('cli.forms.cliente.fields.idlocalita'),minChars:3,
                    flex:1,matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),
                    autoLoadOnValue:true,forceSelection:true,
                    bind: {
                        store: '{storeLocalita}',
                        readOnly: '{readOnly}',
                        value: '{record.idlocalita}'
                    },
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">{cap}: - {comune} - {regione} - {provincia}</li>',
                        '</tpl></ul>'
                    ),
                    valueField: 'id',displayField: 'comune',
                    listeners: {
                        select: function (combo, rec) {
                            let controller = this.lookupController()
                            let p = controller.listForms.filter(obj => { return obj.posizione ==='anagrafica'})
                            if (p.length===1){
                                p = p[0]
                                p.card.down('#fldcap').setValue(rec.data.cap)
                                p.card.down('#fldprovincia').setValue(rec.data.provincia)
                                p.card.down('#fldregione').setValue(rec.data.regione)
                            }
                        }
                    }
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.provincia'),
                    flex:1, maxLength: 4,maxLengthText:Locale.t('global.maxlengthtext'), itemId:'fldprovincia',
                    bind: {value: '{record.provincia}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.regione'),
                    flex:1, itemId:'fldregione',readOnly:true,
                    bind: {value: '{record.regione}'}
                }
            ]
        },
        //estero
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            bind: {hidden: '{hideEE}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.comune'),
                    flex:1, maxLength: 250,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.comune}',readOnly: '{readOnly}', hidden: '{hideEE}'}
                },
                {xtype: 'combobox', fieldLabel: Locale.t('cli.forms.cliente.fields.cdnaz'),minChars:3,
                    flex:1,matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),
                    autoLoadOnValue:true,forceSelection:true,
                    bind: {
                        store: '{storeNazioni}',
                        readOnly: '{readOnly}',
                        value: '{record.cdnaz}'
                    },
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">{alpha3}: - {langit}</li>',
                        '</tpl></ul>'
                    ),
                    valueField: 'alpha3',displayField: 'langit'
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.telefono'),
                    flex:1, maxLength: 50,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.telefono}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.fax'),
                    flex:1, maxLength: 50,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.fax}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.cellulare'),
                    flex:1, maxLength: 25,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.cellulare}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.email'),
                    flex:1, maxLength: 100,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.email}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.emailpec'),
                    flex:1, maxLength: 150,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.emailpec}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.fields.sitoweb'),
                    flex:1, maxLength: 250,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.sitoweb}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: "container", flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: "textarea", scrollable: true, overflow: "auto",padding: "0 0 10 0",
                    fieldLabel: Locale.t("cli.forms.cliente.fields.note"), flex: 1,
                    bind: { value: "{record.note}", readOnly: "{readOnlyExtra}" }
                }
            ]
        }
    ]
});