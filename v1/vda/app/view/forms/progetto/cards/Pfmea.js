/**
 * Created by luke on 04/05/21.
 */
Ext.define('vda.view.forms.progetto.cards.Pfmea', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        //campi nascosti x immagini
        {xtype: 'container', hidden:true,
            items:[
                { xtype: 'textfield',itemId:'imgdis1_new', bind:{value:'{record.imgdis1_new}'}},
                { xtype: 'textfield',itemId:'imgdis1_remove', bind:{value:'{record.imgcodis1_remove}'}},
                { xtype: 'textfield',itemId:'imgdis2_new', bind:{value:'{record.imgdis2_new}'}},
                { xtype: 'textfield',itemId:'imgdis2_remove', bind:{value:'{record.imgdis2_remove}'}},
                { xtype: 'textfield',itemId:'imgdis3_new', bind:{value:'{record.imgdis3_new}'}},
                { xtype: 'textfield',itemId:'imgdis3_remove', bind:{value:'{record.imgdis3_remove}'}},
                { xtype: 'textfield',itemId:'imgdis4_new', bind:{value:'{record.imgdis4_new}'}},
                { xtype: 'textfield',itemId:'imgdis4_remove', bind:{value:'{record.imgdis4_remove}'}},
                { xtype: 'textfield',itemId:'imgdis5_new', bind:{value:'{record.imgdis5_new}'}},
                { xtype: 'textfield',itemId:'imgdis5_remove', bind:{value:'{record.imgdis5_remove}'}}
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            bind:{hidden:'{hideScheda}'},
            items: [
                {xtype: 'label', style: {cursor: 'pointer'},flex:1,
                    html:'<div><a class="add" href="javascript:void(0)">'+Locale.t('vda.forms.progetto.pfmea.aprischeda')+'</a></div>',
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
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('vda.forms.progetto.pfmea.fields.idscheda'),
                    displayField: 'descrizione', width:500,minChars:3,
                    valueField: 'id',autoLoadOnValue:true,forceSelection:true,
                    bind: {
                        store: '{storeSchede}',
                        value: '{record.idscheda}',
                        readOnly: '{readOnlyPfmea}'
                    },
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><b>{numero}</b>: - {articolo}</li>',
                        '</tpl></ul>'
                    )
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {
                        type: "hbox"
                    },
                    items:[
                        {xtype: 'displayfield',value: Locale.t('vda.forms.progetto.pfmea.disegni')}
                    ]
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            items:[
                {xtype:'container',  itemId:'imgDis1'},
                {xtype: 'displayfield',value:'', width:100},
                {xtype:'container',itemId:'imgDis2'},
                {xtype: 'displayfield',value:'', width:100},
                {xtype:'container',itemId:'imgDis3'},
                {xtype: 'displayfield',value:'', width:100},
                {xtype:'container',itemId:'imgDis4'},
                {xtype: 'displayfield',value:'', width:100},
                {xtype:'container',itemId:'imgDis5'}
            ]
        }
    ]
});