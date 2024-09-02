/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.scheda.cards.Define', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        //campi nascosti x immagini
        {xtype: 'container', hidden:true,
            items:[
                { xtype: 'textfield',itemId:'imgko_new', bind:{value:'{record.imgko_new}'}},
                { xtype: 'textfield',itemId:'imgko_remove', bind:{value:'{record.imgko_remove}'}},
                { xtype: 'textfield',itemId:'imgok_new', bind:{value:'{record.imgok_new}'}},
                { xtype: 'textfield',itemId:'imgok_remove', bind:{value:'{record.imgok_remove}'}},
                { xtype: 'textfield',itemId:'imgaltro_new', bind:{value:'{record.imgaltro_new}'}},
                { xtype: 'textfield',itemId:'imgaltro_remove', bind:{value:'{record.imgaltro_remove}'}}
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'radiogroup', fieldLabel :Locale.t('gnc.forms.scheda.define.fields.tipo'), width:300,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('gnc.forms.scheda.define.fields.interno'),inputValue:0},
                        {boxLabel:Locale.t('gnc.forms.scheda.define.fields.esterno'),inputValue:1}
                    ],
                    bind: {value:'{record.tipo}',readOnly: '{readOnlyDefine}'},
                    listeners: {
                        change:function(rdg,value) {
                            let vm = this.lookupViewModel()
                            if (value===0) {
                                vm.set('hideFornitore',true)  //nascondo fornitore
                            } else {
                                vm.set('hideFornitore',false)  //vsiualizzo fornitore
                            }
                        }
                    }
                },
                {xtype: 'datefield',fieldLabel: Locale.t('gnc.forms.scheda.define.fields.datadoc'),width:200,
                    bind: {value: '{record.datadoc}',readOnly: '{readOnlyDefine}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.define.fields.rilevato'), flex:1,
                    bind: {value: '{record.rilevato}',readOnly: '{readOnlyDefine}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('gnc.forms.scheda.define.fields.qta'),
                    width:150, hideTrigger: true, allowDecimals:false,
                    bind: {readOnly: '{readOnlyDefine}', value: '{record.qta}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('gnc.forms.scheda.define.fields.cdart'),minChars:3,width:200,
                    matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),hideTrigger: true,
                    autoLoadOnValue:true,forceSelection:true,
                    bind: {
                        store: '{storeProdotti}',
                        value: '{record.cdart}',
                        readOnly: '{readOnlyDefine}'
                    },
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><b>{cdpar}</b>: - {depar}</li>',
                        '</tpl></ul>'
                    ),
                    valueField: 'cdpar',displayField: 'cdpar',
                    listeners: {
                        select:function (cmb,record) {
                            let ctl = this.lookupController()
                            ctl.form.down('#descart').setValue(record.data.depar)
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                },
                {xtype: 'textfield',fieldLabel:Locale.t('gnc.forms.scheda.define.fields.descprodotto'), flex:1,itemId: 'descart',readOnly:true,
                    bind: {value: '{record.descprodotto}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('gnc.forms.scheda.define.fields.idstabilimento'),editable:false,
                    flex:1,matchFieldWidth:true, autoLoadOnValue:true, forceSelection:true,
                    bind: {
                        store: '{storeStabilimenti}',
                        value: '{record.idstabilimento}',
                        readOnly: '{readOnlyDefine}'
                    },
                    valueField: 'id',displayField: 'nome'
                },
                {xtype:'displayfield',flex:1,value:'',
                    bind: {hidden:'{!hideFornitore}'} //usato x flex campi stabilimento/fornitore
                },
                {xtype: 'combobox', fieldLabel: Locale.t('gnc.forms.scheda.define.fields.idfornitore'),minChars:3,
                    flex:1,matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),
                    autoLoadOnValue:true,forceSelection:true,allowBlank:false,
                    bind: {
                        hidden:'{hideFornitore}',
                        store: '{storeFornitori}',
                        readOnly: '{readOnlyDefine}',
                        value: '{record.idfornitore}'
                    },
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><b>{codice}</b>: - {ragsoc} <br>{ubicazione}</li>',
                        '</tpl></ul>'
                    ),
                    valueField: 'id',displayField: 'ragsoc',
                    listeners: {
                        beforequery: function (qe) {
                            let vm = this.lookupViewModel()
                            delete qe.combo.lastQuery
                            let storesoggetti=vm.get('storeFornitori')
                            storesoggetti.getProxy().extraParams.tiposoggetto='F'
                        }
                    }
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                    flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('gnc.forms.scheda.define.fields.descrizione'),
                    bind: {value: '{record.descrizione}',readOnly: '{readOnlyDefine}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                    flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('gnc.forms.scheda.define.fields.notedefine'),
                    bind: {value: '{record.notedefine}',readOnly: '{readOnlyDefine}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'label', text: Locale.t('gnc.forms.scheda.define.fields.imgko')},
                {xtype: 'displayfield',value:'', width:150},
                {xtype: 'label', text: Locale.t('gnc.forms.scheda.define.fields.imgok')},
                {xtype: 'displayfield',value:'', width:150},
                {xtype: 'label', text: Locale.t('gnc.forms.scheda.define.fields.imgaltro')}
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            items: [
                {xtype:'container', itemId:'imgko'},//immagine ko
                {xtype: 'displayfield',value:'', width:150},
                {xtype:'container', itemId:'imgok'},//immagine ok
                {xtype: 'displayfield',value:'', width:150},
                {xtype:'container', itemId:'imgaltro'}//immagine altro
            ]
        },
        {xtype:'container', itemId:'definefld'} //allegati
    ]
});