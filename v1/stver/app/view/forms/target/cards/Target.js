/**
 * Created by luke on 14/09/23.
 */
Ext.define('stver.view.forms.target.cards.Target', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.TextField',
        'Ext.form.field.Number',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'fieldset', collapsible: false, collapsed: false,
            style: {'background-color': "transparent;"},
            bind: {title: '<span style="color: black;font-weight: bold">'+Locale.t('stver.forms.target.sezstab')+'</span>'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('stver.forms.target.fields.anno'),
                            width:100, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            bind: {readOnly: '{readOnlyStab}', value: '{record.anno}'}
                        },
                        {xtype: 'textfield', fieldLabel: Locale.t('stver.forms.target.fields.codstab'),
                            width:100, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            maxLength: 3, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            //margin: '50 0 0 50',
                            bind: {readOnly: '{readOnlyStab}', value: '{record.codstab}'}
                        },
                        {xtype: 'textfield', fieldLabel: Locale.t('stver.forms.target.fields.stabilimento'),
                            flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                            maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                            bind: {readOnly: '{readOnlyStab}', value: '{record.stabilimento}'}
                        }
                    ]
                },
            ]
        },
        {xtype: 'fieldset', collapsible: false, collapsed: false,
            style: {'background-color': "transparent;"},
            bind: {title: '<span style="color: black;font-weight: bold">'+Locale.t('stver.forms.target.seztarget')+'</span>'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,msgTarget: 'side'},
                    items: [
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg1'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 50 10 0',
                            bind: {readOnly: '{readOnly}',value: '{record.trg1}'}
                        },
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg2'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 50 10 50',
                            bind: {readOnly: '{readOnly}',value: '{record.trg2}'}
                        },
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg3'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 0 10 50',
                            bind: {readOnly: '{readOnly}',value: '{record.trg3}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,msgTarget: 'side'},
                    items: [
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg4'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 50 10 0',
                            bind: {readOnly: '{readOnly}',value: '{record.trg4}'}
                        },
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg5'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 50 10 50',
                            bind: {readOnly: '{readOnly}',value: '{record.trg5}'}
                        },
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg6'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 0 10 50',
                            bind: {readOnly: '{readOnly}',value: '{record.trg6}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,msgTarget: 'side'},
                    items: [
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg7'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 50 10 0',
                            bind: {readOnly: '{readOnly}',value: '{record.trg7}'}
                        },
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg8'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 50 10 50',
                            bind: {readOnly: '{readOnly}',value: '{record.trg8}'}
                        },
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg9'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 0 10 50',
                            bind: {readOnly: '{readOnly}',value: '{record.trg9}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,msgTarget: 'side'},
                    items: [
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg10'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 50 10 0',
                            bind: {readOnly: '{readOnly}',value: '{record.trg10}'}
                        },
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg11'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 50 10 50',
                            bind: {readOnly: '{readOnly}',value: '{record.trg11}'}
                        },
                        {xtype: 'numberfield', fieldLabel:Locale.t('stver.forms.target.fields.trg12'),width:250,
                            hideTrigger: true, allowDecimals:false, margin: '10 0 10 50',
                            bind: {readOnly: '{readOnly}',value: '{record.trg12}'}
                        }
                    ]
                }
            ]
        }
    ]
});