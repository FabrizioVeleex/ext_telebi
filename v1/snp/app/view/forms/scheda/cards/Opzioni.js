/**
 * Created by luke on 07/08/23.
 */
Ext.define('snp.view.forms.scheda.cards.Opzioni', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.RadioGroup',
        'Ext.form.field.Checkbox',
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
                {xtype: 'radiogroup',fieldLabel: Locale.t('snp.forms.scheda.fields.acqportiera'),
                    columns: 2, flex:1,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('snp.forms.scheda.fields.si'),inputValue:1},
                        {boxLabel:Locale.t('snp.forms.scheda.fields.no'),inputValue:-1}
                    ],
                    bind: {value:'{record.acqportiera}',readOnly: '{readOnlyOpzioni}'}
                },
                {xtype: 'radiogroup',fieldLabel: Locale.t('snp.forms.scheda.fields.acqoe'),
                    columns: 2, flex:1,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('snp.forms.scheda.fields.si'),inputValue:1},
                        {boxLabel:Locale.t('snp.forms.scheda.fields.no'),inputValue:-1}
                    ],
                    bind: {value:'{record.acqoe}',readOnly: '{readOnlyOpzioni}'}
                },
                {xtype: 'radiogroup',fieldLabel: Locale.t('snp.forms.scheda.fields.acqfor'),
                    columns: 2, flex:1,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('snp.forms.scheda.fields.si'),inputValue:1},
                        {boxLabel:Locale.t('snp.forms.scheda.fields.no'),inputValue:-1}
                    ],
                    bind: {value:'{record.acqfor}',readOnly: '{readOnlyOpzioni}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideDisp}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'checkbox', fieldLabel: Locale.t('snp.forms.scheda.fields.portieradisp'), flex:1,itemId:'fld_portiera',
                    bind: {value: '{record.portieradisp}',
                        readOnly: '{readOnlyDispPortiera}'
                    },
                    listeners:{
                        change :'onArrivoMateriale'
                    }
                },
                {xtype: 'checkbox', fieldLabel: Locale.t('snp.forms.scheda.fields.oedisp'), flex:1,itemId:'fld_oe',
                    bind: {value: '{record.oedisp}',
                        readOnly: '{readOnlyDispOe}'
                    },
                    listeners:{
                        change:'onArrivoMateriale'
                    }
                },
                {xtype: 'checkbox', fieldLabel: Locale.t('snp.forms.scheda.fields.fordisp'), flex:1,itemId:'fld_for',
                    bind: {value: '{record.fordisp}',
                        readOnly: '{readOnlyDispFor}'
                    },
                    listeners:{
                        change:'onArrivoMateriale'
                    }
                }
            ]
        }
    ]
});