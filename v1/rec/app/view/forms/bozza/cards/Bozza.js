/**
 * Created by luke on 05/05/21.
 */
Ext.define('rec.view.forms.bozza.cards.Bozza', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('rec.forms.bozza.fields.cdcli'),minChars:3,
                    width:300,matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),
                    autoLoadOnValue:true,forceSelection:true,allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    bind: {
                        store: '{storeClienti}',
                        value: '{record.cdcli}',
                        readOnly: '{readOnly}'
                    },
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><b>{codice}</b>: - {ragsoc}</li>',
                        '</tpl></ul>'
                    ),
                    valueField: 'codice',displayField: 'codice',
                    listeners: {
                        select:function (cmb,record) {
                            let ctl = this.lookupController()
                            ctl.form.down('#bozzaragsoc').setValue(record.data.ragsoc)
                            if (record.data.nazionalita==='0') {
                                ctl.form.down('#bozzalingua').setValue('it')
                            } else {
                                ctl.form.down('#bozzalingua').setValue('en')
                            }
                            //pulisco campi contatto se presenti
                            ctl.form.down('#bozzanominativo').setValue('')
                            ctl.form.down('#bozzaemail').setValue('')
                            ctl.form.down('#bozzauser').setValue('')
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                },
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.bozza.fields.ragsoc'),
                    flex:1, readOnly:true,itemId: 'bozzaragsoc',
                    bind: {value: '{record.ragsoc}'}
                },
                //campo lingua nascosto
                {xtype: 'textfield', hidden:true, readOnly:true,itemId: 'bozzalingua',
                    bind: {value: '{record.lingua}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('rec.forms.bozza.fields.nominativo'),minChars:3,
                    width:700,matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    autoLoadOnValue:true,forceSelection:true,itemId: 'bozzanominativo',
                    bind: {
                        store: '{storeContatti}',
                        value: '{record.nominativo}',
                        readOnly: '{readOnly}'
                    },
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><b>{nominativo}</b> - {email}</li>',
                        '</tpl></ul>'
                    ),
                    valueField: 'nominativo',displayField: 'nominativo',
                    listeners: {
                        select:function (cmb,record) {
                            let ctl = this.lookupController()
                            ctl.form.down('#bozzaemail').setValue(record.data.email)
                            ctl.form.down('#bozzauser').setValue(record.data.utente)
                        },
                        afterrender:function() {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            let storecontatti=vm.get('storeContatti')
                            if (storecontatti) {
                                storecontatti.getProxy().extraParams.cdcli=rec.data.cdcli
                            }
                        },
                        beforequery: function (qe) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            delete qe.combo.lastQuery
                            let storecontatti=vm.get('storeContatti')
                            if (storecontatti) {
                                storecontatti.getProxy().extraParams.cdcli=rec.data.cdcli
                            }
                        }
                    }
                },
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.bozza.fields.email'),
                    flex:1, readOnly:true,itemId: 'bozzaemail',
                    bind: {value: '{record.email}'}
                },
                //campo user nascosto
                {xtype: 'textfield', hidden:true, readOnly:true,itemId: 'bozzauser',
                    bind: {value: '{record.user}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('rec.forms.bozza.fields.traspselect'),
                    flex: 1, displayField: 'descrizione', minChars: 3, forceSelection: false,emptyText:Locale.t('rec.forms.bozza.fields.noforcecombo'),
                    valueField: 'descrizione',typeAhead: true,
                    bind: {
                        store: '{storeSpedrolcar}',
                        value: '{record.traspselect}',
                        readOnly: '{readOnly}'
                    }
                },
                {xtype: 'combobox', fieldLabel: Locale.t('rec.forms.bozza.fields.traspcli'),
                    flex: 1,emptyText:Locale.t('rec.forms.bozza.fields.noforcecombo'),
                    displayField: 'descrizione', minChars: 3, forceSelection: false,
                    valueField: 'descrizione',typeAhead: true,
                    bind: {
                        store: '{storeSpedcli}',
                        value: '{record.traspcli}',
                        readOnly: '{readOnly}'
                    }
                },
                {xtype: 'combobox', fieldLabel: Locale.t('rec.forms.bozza.fields.condrot'), flex: 1,
                    displayField: 'descrizione', minChars: 3, forceSelection: true, valueField: 'id',
                    bind: {
                        store: '{storeCondorot}',
                        value: '{record.condrot}',
                        readOnly: '{readOnly}'
                    }
                },
                /*
                {xtype: 'numberfield', fieldLabel: Locale.t('rec.forms.bozza.fields.gggaranzia'),
                    width:250, hideTrigger: true, allowDecimals:false,minValue: 0,
                    bind: {readOnly: '{readOnly}', value: '{record.gggaranzia}'}
                }

                 */
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',
                    flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('rec.forms.bozza.fields.note'),
                    bind: {readOnly: '{readOnly}',value: '{record.note}'}
                }
            ]
        }
    ]
})