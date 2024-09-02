/**
 * Created by luke on 20/01/23.
 */
Ext.define('ama.view.forms.scheda.cards.Peso', {
    extend: 'Ext.form.Panel',
    requires:[
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'fieldset', collapsible: false, collapsed: false,
            title: '<span style="color: black;font-weight:lighter">'+Locale.t('ama.forms.scheda.parametri.pesosez')+'</span>',
            style: {'background-color': "transparent;"},
            bind:{hidden:'{hidesz2}'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('ama.forms.scheda.parametri.peso'),
                            maxLength: 20,maxLengthText: Locale.t("global.form.maxlengthtext"),
                            width:250, bind: {value: '{record.peso}',readOnly: '{readOnly}'}
                        },
                        {xtype:'displayfield',width:5},
                        {xtype: 'textfield', fieldLabel: Locale.t('ama.forms.scheda.parametri.tol'),
                            maxLength: 20,maxLengthText: Locale.t("global.form.maxlengthtext"),
                            width:230, bind: {value: '{record.tol2}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {labelAlign: 'top', margin:5},
                    items: [
                        {xtype: 'textarea',scrollable:true,overflow:'auto', fieldLabel: Locale.t('ama.forms.scheda.parametri.note'),
                            flex:1,padding:'0 0 10 0',
                            bind: {value: '{record.note2}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype:'container', itemId:'pesofld'} //allegati
            ]
        }
    ]
});