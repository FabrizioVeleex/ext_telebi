/**
 * Created by luke on 15/07/23.
 */
Ext.define('bolfor.forms.bolla.cards.Bolla', {
    extend: 'Ext.form.Panel',
    requires:[
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'fieldset', collapsible: true,collapsed:false,
            style: {'background-color': "transparent;"},
            bind: {
                title: '<span style="color: black;font-weight: bold">'+Locale.t('bolfor.forms.bolla.sezinfo')+'</span>'
            },
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
                    items: [
                        {xtype: 'textfield',fieldLabel: Locale.t('bolfor.forms.bolla.fields.num_doc'),width:200,
                            maxLength: 20, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            bind: {value: '{record.num_doc}', readOnly: '{readOnly}'}
                        },
                        {xtype: 'combobox', fieldLabel: Locale.t('bolfor.forms.bolla.fields.idtipologia'),
                            minChars:2, flex:1,allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            queryMode: 'local', forceSelection: true,
                            bind: {
                                store: '{storeTipo}',
                                value: '{record.idtipologia}',
                                readOnly: '{readOnly}'
                            },
                            valueField: 'id',displayField: 'descrizione',
                            listeners: {
                                select:function (cmb,record) {
                                    let vm = this.lookupViewModel(), rec = vm.get('record'),ctrl = this.lookupController()
                                    switch (record.data.codice){
                                        case '01': //acquisto
                                            vm.set("hideAcquisto", false)
                                            break
                                        case '02': //conto lavorazione
                                            vm.set("hideAcquisto", true)
                                            break
                                        case '03': //conto visione
                                            vm.set("hideAcquisto", true)
                                            break
                                    }
                                    rec.data.codice = record.data.codice //imposto codice tipologia
                                    //pulisco cmq il campo id_ordine
                                    let p = ctrl.listForms.filter(obj => { return obj.posizione ==='bolla'})
                                    if (p.length===1){
                                        let modulo = p[0]
                                        modulo.card.down('#id_ordinefld').setValue('')
                                    }
                                }
                            }
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
                    items: [
                        {xtype: 'datefield',fieldLabel: Locale.t('bolfor.forms.bolla.fields.data_doc'),
                            width: 200, format: 'd/m/Y',submitFormat:'Y-m-d',allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            bind: {
                                value: '{record.data_doc}',
                                readOnly: '{readOnly}'
                            }
                        },
                        {xtype: 'combobox', fieldLabel: Locale.t('bolfor.forms.bolla.fields.id_sogg_fat'),
                            minChars:2, flex:1,forceSelection:true, autoLoadOnValue: true,itemId:'id_sogg_fatfld',
                            allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            bind: {
                                store: '{storeFornitori}',
                                value: '{record.id_sogg_fat}',
                                readOnly: '{readOnly}'
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                '<li role="option" class="x-boundlist-item"><b>{ragsoc}</b><br>{ubicazione}</li>',
                                '</tpl></ul>'
                            ),
                            valueField: 'id',displayField: 'ragsoc',
                            listeners: {
                                beforequery:function (qe) {
                                    delete qe.combo.lastQuery;
                                },
                                select:function (cmb,record) {
                                    let vm = this.lookupViewModel(),ctrl = this.lookupController()
                                    let p = ctrl.listForms.filter(obj => { return obj.posizione ==='bolla'})
                                    if (p.length===1){
                                        let modulo = p[0]
                                        modulo.card.down('#id_ordinefld').setValue('') //azzero scelta ordine
                                    }
                                    //cambio extraparams store ordini
                                    let st=vm.get('storeOrdini')
                                    if (st) {
                                        st.getProxy().extraParams.idfornitore =  record.data.id
                                    }
                                }
                            }
                        },
                        {xtype: 'combobox', fieldLabel: Locale.t('bolfor.forms.bolla.fields.id_ordine'),
                            minChars:2, width:300,forceSelection:true, autoLoadOnValue: true,itemId:'id_ordinefld',
                            emptyText: Locale.t('bolfor.forms.bolla.info.blankordine'),
                            bind: {
                                store: '{storeOrdini}',
                                value: '{record.id_ordine}',
                                readOnly: '{readOnly}',
                                hidden:'{hideAcquisto}'
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                '<li role="option" class="x-boundlist-item"><b>{num_doc}</b> - {data_doc}</li>',
                                '</tpl></ul>'
                            ),
                            valueField: 'id',displayField: 'num_doc',
                            listeners: {
                                beforequery:function (qe) {
                                    delete qe.combo.lastQuery //faccio rigenerare la query nel caso abbia cambiato id
                                    //recupero id fornitore
                                    let vm = this.lookupViewModel(),ctrl = this.lookupController()
                                    let p = ctrl.listForms.filter(obj => { return obj.posizione ==='bolla'})
                                    if (p.length===1){
                                        let modulo = p[0]
                                        let idfornitore=modulo.card.down('#id_sogg_fatfld').getValue() //recupero id fornitore
                                        let st=vm.get('storeOrdini')
                                        if (st && idfornitore!=='') {
                                            st.getProxy().extraParams.idfornitore = idfornitore
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});