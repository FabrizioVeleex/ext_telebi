/**
 * Created by luke on 20/01/23.
 */
Ext.define('ama.view.forms.scheda.cards.Colore', {
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
            title: '<span style="color: black;font-weight:lighter">'+Locale.t('ama.forms.scheda.parametri.coloresez')+'</span>',
            style: {'background-color': "transparent;"},
            bind:{hidden:'{hidesz4}'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    defaults: {margin: 5},
                    items: [
                        {xtype: 'textfield', fieldLabel: Locale.t('ama.forms.scheda.parametri.colore'),
                            maxLength: 250,maxLengthText: Locale.t("global.form.maxlengthtext"),
                            flex:1, bind: {value: '{record.colore}',readOnly: '{readOnly}'}
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
                            bind: {value: '{record.note4}',readOnly: '{readOnly}'}
                        }
                    ]
                },
                {xtype:'container', itemId:'colorefld'} //allegati
            ]
        }
    ]
});