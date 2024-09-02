/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.scheda.cards.Scheda', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.TextField',
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
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.fields.numero'), width:200,readOnly:true,
                    bind: {value: '{record.numero}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.fields.autore'), width:400,readOnly:true,
                    bind: {value: '{record.autore}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('gnc.forms.scheda.fields.stato'), width:400,readOnly:true,
                    bind: {value: '{statodesc}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    html:'<div><a class="add" href="javascript:void(0)">'+Locale.t('gnc.forms.scheda.comprimi')+'</a></div>',
                    listeners: {
                        click: {
                            element: 'el', delegate: 'a.add', tipo:'C',fn: 'onComprimiSezioni'
                        }
                    }
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    html:'<div><a class="add" href="javascript:void(0)">'+Locale.t('gnc.forms.scheda.espandi')+'</a></div>',
                    listeners: {
                        click: {
                            element: 'el', delegate: 'a.add', tipo:'C',fn: 'onEspandiSezioni'
                        }
                    }
                }
            ]
        }
    ]
});