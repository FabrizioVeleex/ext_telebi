/**
 * Created by luke on 22/09/21.
 */
Ext.define('rec.view.forms.reso.info.Panel', {
    extend: 'Ext.form.Panel',
    requires:[
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'rec.view.forms.reso.info.Controller',
        'rec.view.forms.reso.info.Model'
    ],
    controller:'v1-info',
    viewModel:'v1-info',
    scrollable:true,
    dockedItems: [{
        xtype: 'toolbar', dock: 'top',
        items: [
            {
                text:  Locale.t('global.btn.close.text'),
                handler: 'onCloseInfo'
            }
        ]
    }],
    items: [
        {xtype: 'fieldset', collapsible: false, collapsed: false,
            style: {'background-color': "#F8FFB6;"},
            bind: {title: '<span style="color: black;font-weight: bold">'+Locale.t('rec.forms.reso.info.title')+'{record.CODICE}'+'</span>'},
            items: [
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.codice')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.CODICE}'}},
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.dspcodice')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.DSPCODICE}'}},
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.codicesost')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.CODICESOST}'}}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.rigabolla')+'</span>',
                            width:200,readOnly:true, bind: {value: '{record.RIGABOLLA}'}},
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.numbolla')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.NUMBOLLA}'}},
                        {xtype:'datefield',format: 'd/m/Y',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.databolla')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.DATABOLLA}'}}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.qtaric')+'</span>',
                            width:200,readOnly:true, bind: {value: '{record.QTARIC}'}},
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.pcdos')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.PCDOS}'}},
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.seriale')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.SERIALE}'}},
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.pscaus')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.PSDESC}'}},
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.azione')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.AZIONE}'}}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.rigaord')+'</span>',
                            width:200,readOnly:true, bind: {value: '{record.RIGAORD}'}},
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.numord')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.NUMORD}'}},
                        {xtype:'datefield',format: 'd/m/Y',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.dataord')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.DATAORD}'}}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.rifaddt')+'</span>',
                            width:200,readOnly:true, bind: {value: '{record.RIFADDT}'}},
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.numddt')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.NUMDDT}'}},
                        {xtype:'datefield',format: 'd/m/Y',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.dataddt')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.DATADDT}'}}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.numnc')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.NUMNC}'}},
                        {xtype:'datefield',format: 'd/m/Y',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.datanc')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.DATANC}'}}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5,labelAlign:'top'},
                    items: [
                        {xtype:'textfield',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.nddtreso')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.NDDTRESO}'}},
                        {xtype:'datefield',format: 'd/m/Y',fieldLabel:'<span style="color: black;font-weight:bold">'+Locale.t('rec.forms.reso.info.dtddtreso')+'</span>',
                            flex:1,readOnly:true, bind: {value: '{record.DTDDTREESO}'}}
                    ]
                }
            ]
        }
    ],
    listeners:{
        afterRender: 'onAfterRender'
    }
});