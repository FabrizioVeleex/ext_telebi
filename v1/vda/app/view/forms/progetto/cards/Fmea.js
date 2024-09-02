/**
 * Created by luke on 04/05/21.
 */
Ext.define('vda.view.forms.progetto.cards.Fmea', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',
                    flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('vda.forms.progetto.fmea.fields.stabilimenti'),
                    bind: {value: '{record.stabilimenti}',readOnly: '{readOnlyFmea}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',
                    flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('vda.forms.progetto.fmea.fields.fornitori'),
                    bind: {value: '{record.fornitori}',readOnly: '{readOnlyFmea}'}
                }
            ]
        }
    ]
});