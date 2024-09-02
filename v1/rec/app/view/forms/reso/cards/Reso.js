/**
 * Created by luke on 05/05/21.
 */
Ext.define('rec.view.forms.reso.cards.Reso', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.reso.fields.cdcli'),
                    width:300, readOnly:true,
                    bind: {value: '{record.cdcli}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.reso.fields.ragsoc'),
                    flex:1, readOnly:true,
                    bind: {value: '{record.ragsoc}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.reso.fields.nominativo'),
                    flex:1, readOnly:true,
                    bind: {value: '{record.nominativo}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.reso.fields.email'),
                    flex:1, readOnly:true,
                    bind: {value: '{record.email}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.reso.fields.traspselect'),
                    flex:1, readOnly:true,
                    bind: {value: '{record.traspselect}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.reso.fields.traspcli'),
                    flex:1, readOnly:true,
                    bind: {value: '{record.traspcli}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.reso.fields.condrot'),
                    flex:1, readOnly:true,
                    bind: {value: '{record.condizioni}'}
                },
                /*
                {xtype: 'numberfield', fieldLabel: Locale.t('rec.forms.reso.fields.gggaranzia'),
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
                    flex:1,padding:'0 0 10 0',readOnly:true,fieldLabel: Locale.t('rec.forms.reso.fields.note'),
                    bind: {value: '{record.note}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',
                    flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('rec.forms.reso.fields.notetecnico'),
                    bind: {value: '{record.notetecnico}', readOnly: '{readOnlyGrid}'}
                }
            ]
        }
    ]
});