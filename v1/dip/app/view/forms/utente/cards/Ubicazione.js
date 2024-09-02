Ext.define('dip.view.forms.utente.cards.Ubicazione', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable: true,
    margin: 15,
    items: [
        {xtype: 'fieldset', collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('dip.forms.utente.filiale')+'</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'container',
                    layout: {type: 'hbox', align: 'stretch'},
                    defaults: {msgTarget: 'side', labelAlign: 'left', margin: 5},
                    items: [
                        {xtype: 'displayfield', fieldLabel: Locale.t('dip.forms.filiale.fields.codice'),
                            flex: 1, itemId: 'fcodid',
                            bind: {value: '{record.fcodice}'}
                        },
                        {xtype: 'displayfield', fieldLabel: Locale.t('dip.forms.filiale.fields.numero'),
                            flex: 1,itemId: 'fnumid',
                            bind: {value: '{record.fnumero}'}
                        }
                    ]
                },
                {xtype: 'combo', fieldLabel: Locale.t('dip.forms.filiale.fields.filiale'), anchor: '100%',
                    displayField: 'filiale', valueField: 'id', queryMode: 'local', forceSelection: true,allowBlank: false,
                    bind: {store: '{comboFiliale}', value: '{record.idfiliale}', readOnly: '{readOnlyGestore}'},
                    listeners: {
                        select: function(cmb,record) {
                            let controller = this.lookupController()
                            let p = controller.listForms.filter(obj => { return obj.posizione ==='ubicazione'})
                            if (p.length===1){
                                p = p[0]
                                p.card.down('#fcodid').setValue(record.data.codice)
                                p.card.down('#fnumid').setValue(record.data.numero)
                                p.card.down('#findid').setValue(record.data.indirizzo)
                                p.card.down('#ftelid').setValue(record.data.tel)
                                p.card.down('#ffaxid').setValue(record.data.fax)
                                p.card.down('#fbreveid').setValue(record.data.breve)
                                p.card.down('#ffiliale').setValue(record.data.filiale)
                            }
                        }
                    }
                },
                {   //campo x salvataggio nome filiale
                    xtype: 'displayfield',hidden:true, flex: 1, itemId:'ffiliale',
                    bind: {value: '{record.ffiliale}'}
                },
                {xtype: 'displayfield', fieldLabel: Locale.t('dip.forms.filiale.fields.indirizzo'),
                    anchor: '100%',itemId: 'findid',
                    bind: {value: '{record.findirizzo}'}
                },
                {xtype: 'container',
                    layout: {type: 'hbox', align: 'stretch'},
                    defaults: {msgTarget: 'side', labelAlign: 'left', margin: 5},
                    items: [
                        {xtype: 'displayfield', fieldLabel: Locale.t('dip.forms.filiale.fields.telefono'),
                            flex: 1,itemId: 'ftelid',
                            bind: {value: '{record.ftelefono}'}
                        },
                        {xtype: 'displayfield', fieldLabel: Locale.t('dip.forms.filiale.fields.breve'), flex: 1,itemId: 'fbreveid',
                            bind: {value: '{record.fbreve}'}
                        },
                        {xtype: 'displayfield', fieldLabel: Locale.t('dip.forms.filiale.fields.fax'), flex: 1,itemId: 'ffaxid',
                            bind: {value: '{record.ffax}'}
                        }
                    ]
                }
            ]
        }
    ]
});