/**
 * Created by luke on 25/03/22.
 */
Ext.define('vda.view.forms.progetto.cards.Concept', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        //campi nascosti x immagini
        {xtype: 'container', hidden:true,
            items:[
                { xtype: 'textfield',itemId:'imgcon1_new', bind:{value:'{record.imgcon1_new}'}},
                { xtype: 'textfield',itemId:'imgcon1_remove', bind:{value:'{record.imgcon1_remove}'}},
                { xtype: 'textfield',itemId:'imgcon2_new', bind:{value:'{record.imgcon2_new}'}},
                { xtype: 'textfield',itemId:'imgcon2_remove', bind:{value:'{record.imgcon2_remove}'}}
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('vda.forms.progetto.concept.fields.codprod'), width:400,
                    maxLength: 100, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {hidden: '{hideCliente}',value: '{record.codprod}',readOnly: '{readOnlyConcept}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('vda.forms.progetto.concept.fields.codcomp'), width:400,
                    maxLength: 100, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {hidden: '{hideComponente}',value: '{record.codcomp}',readOnly: '{readOnlyConcept}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('vda.forms.progetto.concept.fields.esponente'), width:400,
                    maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {value: '{record.esponente}',readOnly: '{readOnlyConcept}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'datefield',fieldLabel: Locale.t('vda.forms.progetto.concept.fields.richiesta'),width:150,
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    bind: {value: '{record.richiesta}',readOnly: '{readOnlyConcept}'}
                },
                {xtype:'displayfield',width:100,value:''},
                {xtype: 'datefield',fieldLabel: Locale.t('vda.forms.progetto.concept.fields.dataprogetto'),width:150,
                    bind: {value: '{record.dataprogetto}',readOnly: '{readOnlyConcept}'}
                },
                {xtype:'displayfield',width:100,value:''},
                {xtype: 'datefield',fieldLabel: Locale.t('vda.forms.progetto.concept.fields.dataprototipo'),width:150,
                    bind: {value: '{record.dataprototipo}',readOnly: '{readOnlyConcept}'}
                },
                {xtype:'displayfield',width:100,value:''},
                {xtype: 'datefield',fieldLabel: Locale.t('vda.forms.progetto.concept.fields.dataprod'),width:150,
                    bind: {value: '{record.dataprod}',readOnly: '{readOnlyConcept}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            bind: {hidden: '{hideCliente}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',
                    flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('vda.forms.progetto.concept.fields.destinazione'),
                    bind: {value: '{record.destinazione}',readOnly: '{readOnlyConcept}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            bind: {hidden: '{hideCliente}'},
            items:[
                {xtype: 'displayfield',value: Locale.t('vda.forms.progetto.concept.fields.imgcon1')},
                {xtype: 'displayfield',value:'', width:100},
                {xtype: 'displayfield',value: Locale.t('vda.forms.progetto.concept.fields.imgcon2')},
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            bind: {hidden: '{hideCliente}'},
            items:[
                {
                    xtype:'container',  itemId:'imgCon1',
                },
                {xtype: 'displayfield',value:'', width:100},
                {
                    xtype:'container',itemId:'imgCon2',
                }
            ]
        }
    ]
});