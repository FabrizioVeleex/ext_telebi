Ext.define('snp.view.forms.scheda.cards.Info', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            bind:{hidden:'{hideScheda}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'label', style: {cursor: 'pointer'},flex:1,
                    html:'<div><a class="add" href="javascript:void(0)">'+Locale.t('snp.forms.scheda.apricld')+'</a></div>',
                    listeners: {
                        click: {
                            element: 'el',
                            delegate: 'a.add',
                            fn: 'onOpenScheda'
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
                {xtype: 'datefield',fieldLabel: Locale.t('snp.forms.scheda.fields.datadoc'),
                    width: 200, format: 'd/m/Y',submitFormat:'Y-m-d',
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    bind: {
                        value: '{record.datadoc}',
                        readOnly: '{readOnlyData}'
                    }
                },
                {xtype: 'combobox', fieldLabel: Locale.t('snp.forms.scheda.fields.idtipologia'),minChars:3,
                    flex:1,forceSelection:true,emptyText:Locale.t('snp.forms.scheda.emptytipologia'),
                    bind: {
                        store: '{storeTipologie}',
                        readOnly: '{readOnly}',
                        value: '{record.idtipologia}'
                    },
                    valueField: 'id',displayField: 'descrizione', queryMode: 'local'
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('snp.forms.scheda.fields.marca'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 100, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {value: '{record.marca}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('snp.forms.scheda.fields.modello'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 100, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {value: '{record.modello}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('snp.forms.scheda.fields.codiceoe'),
                    flex:1, maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {value: '{record.codiceoe}',readOnly: '{readOnly}'}
                },
                {xtype: 'numberfield', fieldLabel:Locale.t('snp.forms.scheda.fields.prezzooe'),flex:1,
                    hideTrigger: true, allowDecimals:true,decimalSeparator: ',',minValue: 0,
                    bind: {readOnly: '{readOnly}',value: '{record.prezzooe}'}
                },
                {xtype: 'radiogroup',fieldLabel: Locale.t('snp.forms.scheda.fields.nporte'),
                    columns: 3, flex:1,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('snp.forms.scheda.fields.3porte'),inputValue:1},
                        {boxLabel:Locale.t('snp.forms.scheda.fields.5porte'),inputValue:2},
                        {boxLabel:Locale.t('snp.forms.scheda.fields.35porte'),inputValue:3}
                    ],
                    bind: {value:'{record.nporte}',readOnly: '{readOnly}'}
                },
                {xtype: 'radiogroup',fieldLabel: Locale.t('snp.forms.scheda.fields.posizione'),
                    columns: 3, flex:1,simpleValue: true,
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    items: [
                        {boxLabel:Locale.t('snp.forms.scheda.fields.posi1'),inputValue:1},
                        {boxLabel:Locale.t('snp.forms.scheda.fields.posi2'),inputValue:2},
                        {boxLabel:Locale.t('snp.forms.scheda.fields.posi3'),inputValue:3}
                    ],
                    bind: {value:'{record.posizione}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',flex:1,autoScroll: true, overflow: 'auto',
                    maxLength: 1500, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    fieldLabel: Locale.t('snp.forms.scheda.fields.note'),
                    height: 100,bind:{value:'{record.note}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});