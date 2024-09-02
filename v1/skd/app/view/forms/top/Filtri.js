/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.forms.top.Filtri', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.Checkbox',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'skd.view.forms.top.grids.Cdl',
        'skd.view.forms.top.grids.Lab',
        'skd.view.forms.top.grids.Odp',
        'skd.view.forms.top.grids.Operatore',
        'skd.view.forms.top.grids.Operazione',
        'skd.view.forms.top.grids.Order',
        'skd.view.forms.top.grids.Part',
        'skd.view.forms.top.grids.Reparto'
    ],
    collapsible: false,
    layout:{
        type:'hbox'
    },
    style:'border:none',
    scrollable: 'x',
    defaults:{
        userCls:'goma-filtri-grid'
    },
    frame: true,
    items: [
        {
            xtype:'panel',
            userCls:'goma-filtri',
            layout:{
                type:'vbox'
            },
            margin:0,
            items:[
                {
                    xtype: 'fieldset',
                    margin:0,
                    layout:{
                        type:'hbox'
                    },
                    title:Locale.t('skd.top.filtri.date.title'),
                    userCls:'goma-filtri',
                    defaults: {
                        labelAlign: 'top',
                        xtype: 'datefield',
                        startDay:1,
                        width: 130,
                        labelCls:'goma-date-filter-label',
                        userCls:'goma-date-filter'
                    },
                    items:[
                        {
                            fieldLabel: Locale.t('skd.top.filtri.date.dal'),
                            name:'work_day_dal',
                            bind: {value: '{filtri.work_day_dal}'},
                            allowBlank:false,
                            listeners:{
                                change:function(field, newValue, eOpts){
                                    if (newValue===null){

                                    }
                                }
                            }
                        },
                        {
                            fieldLabel: Locale.t('skd.top.filtri.date.al'),
                            allowBlank:false,
                            name:'work_day_al',
                            bind: {value: '{filtri.work_day_al}'}
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    margin:0,
                    layout:{
                        type:'vbox'
                    },
                    title:Locale.t('skd.top.filtri.producibilita.title'),
                    userCls:'goma-filtri',
                    width:270,
                    height:108,
                    defaults: {
                        labelWidth: 30,
                        xtype: 'datefield',
                        startDay:1,
                        width: 260
                    },
                    items:[
                        {
                            xtype: 'panel',
                            layout:{
                                type:'hbox'
                            },
                            userCls:'goma-panel-checkbox',
                            height:40,
                            defaults:{
                                listeners:{
                                    change:'onChangeProducibilita'
                                }
                            },
                            items:[
                                {
                                    xtype:'checkboxfield',
                                    width:130,
                                    boxLabel: Locale.t('skd.top.filtri.producibilita.check.acquisti'),
                                    name: 'acquisti',
                                    bind: '{filtri.acquisti}',
                                    inputValue: '1'
                                },
                                {
                                    xtype:'checkboxfield',
                                    width:130,
                                    boxLabel: Locale.t('skd.top.filtri.producibilita.check.produzione'),
                                    name: 'producibilita',
                                    bind:'{filtri.produzione}',
                                    inputValue: '2'
                                }
                            ]
                        },
                        {
                            xtype:'combobox',
                            queryMode: 'locale',
                            width:260,
                            minChars:2,
                            bind:{
                                value : '{filtri.giacenza}',
                                store:'{storeComboGiacenza}'
                            },
                            displayField: 'giacenza',
                            valueField:'id',
                            typeAhead: true,
                            matchFieldWidth:false,
                            forceSelection:true,
                            emptyText:Locale.t('skd.top.filtri.seleziona'),
                            listeners:{
                                select:'onChangeComboProducibilita'
                            }
                        }
                     ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title:Locale.t('skd.top.filtri.grids.lab.title'),
            layout:{
                type:'vbox'
            },
            userCls:'goma-filtri-grid',
            defaults: {
                width: 140
            },
            items:[
                {
                    xtype:'combobox',
                    queryMode: 'remote',
                    width:140,
                    minChars:2,
                    bind:{
                      store:'{storeComboLab}'
                    },
                    displayField: 'field',
                    valueField:'sc_op_lab',
                    typeAhead: true,
                    value : '',
                    forceSelection:true,
                    matchFieldWidth:false,
                    emptyText:Locale.t('skd.top.filtri.seleziona'),
                    listConfig: {
                        emptyText: Locale.t('skd.top.filtri.grids.lab.emptyText')
                    },
                    listeners : {
                        select:'onSelectFilterLab'
                    }
                },
                {
                    xtype:'grid-filter-lab',
                    bind:{
                        store:'{storeGridLab}'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title:Locale.t('skd.top.filtri.grids.part.title'),
            layout:{
                type:'vbox'
            },
            userCls:'goma-filtri-grid',
            defaults: {
                width: 150
            },
            items:[
                {
                    xtype:'combobox',
                    queryMode: 'remote',
                    labelWidth:50,
                    width:150,
                    minChars:2,
                    bind:{
                        store:'{storeComboPart}'
                    },
                    displayField: 'sc_op_part_no',
                    valueField:'sc_op_part_no',
                    typeAhead: true,
                    value : '',
                    forceSelection:true,
                    matchFieldWidth:false,
                    emptyText:Locale.t('skd.top.filtri.seleziona'),
                    listConfig: {
                        emptyText: Locale.t('skd.top.filtri.grids.part.emptyText')
                    },
                    listeners : {
                        select:'onSelectFilterPart'
                    }
                },
                {
                    xtype:'grid-filter-part',
                    bind:{
                        store:'{storeGridPart}'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title:Locale.t('skd.top.filtri.grids.order.title'),
            layout:{
                type:'vbox'
            },
            userCls:'goma-filtri-grid',
            defaults: {
                width: 150
            },
            items:[
                {
                    xtype:'combobox',
                    queryMode: 'remote',
                    labelWidth:50,
                    width:150,
                    minChars:2,
                    bind:{
                        store:'{storeComboOrder}'
                    },
                    displayField: 'field',
                    valueField:'field',
                    typeAhead: true,
                    value : '',
                    matchFieldWidth:false,
                    forceSelection:true,
                    emptyText:Locale.t('skd.top.filtri.seleziona'),
                    listConfig: {
                        emptyText: Locale.t('skd.top.filtri.grids.order.emptyText')
                    },
                    listeners : {
                        select:'onSelectFilterOrder'
                    }
                },
                {
                    xtype:'grid-filter-order',
                    bind:{
                        store:'{storeGridOrder}'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title:Locale.t('skd.top.filtri.grids.reparto.title'),
            layout:{
                type:'vbox'
            },
            userCls:'goma-filtri-grid',
            defaults: {
                width: 112
            },
            items:[
                {
                    xtype:'combobox',
                    queryMode: 'remote',
                    labelWidth:50,
                    flex:1,
                    minChars:2,
                    bind:{
                        store:'{storeComboReparto}'
                    },
                    displayField: 'rep_cdl_dept_des',
                    valueField:'rep_cdl_department_no',
                    typeAhead: true,
                    value : '',
                    forceSelection:true,
                    matchFieldWidth:false,
                    emptyText:Locale.t('skd.top.filtri.seleziona'),
                    listConfig: {
                        emptyText: Locale.t('skd.top.filtri.grids.reparto.emptyText'),
                        getInnerTpl: function(a,b) {
                            return '<div class="item">' +
                                '<b>{rep_cdl_department_no}</b> - {rep_cdl_dept_des}'+
                                ' </div>';
                        }
                    },
                    listeners : {
                        select:'onSelectFilterReparto'
                    }
                },
                {
                    xtype:'grid-filter-reparto',
                    bind:{
                        store:'{storeGridReparto}'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title:Locale.t('skd.top.filtri.grids.cdl.title'),
            layout:{
                type:'vbox'
            },
            defaults: {
                width: 112
            },
            items:[
                {
                    xtype:'combobox',
                    queryMode: 'remote',
                    labelWidth:50,
                    flex:1,
                    minChars:2,
                    bind:{
                        store:'{storeComboCdl}'
                    },
                    displayField: 'rep_cdl_wc_des',
                    valueField:'ope_work_center_no',
                    typeAhead: true,
                    value : '',
                    forceSelection:true,
                    matchFieldWidth:false,
                    emptyText:Locale.t('skd.top.filtri.seleziona'),
                    listConfig: {
                        emptyText: Locale.t('skd.top.filtri.grids.cdl.emptyText'),
                        getInnerTpl: function(a,b) {
                            return '<div class="item">' +
                                '<b>{ope_work_center_no}</b> - {rep_cdl_wc_des}'+
                                ' </div>';
                        }
                    },
                    listeners : {
                        select:'onSelectFilterCdl'
                    }
                },
                {
                    xtype:'grid-filter-cdl',
                    bind:{
                        store:'{storeGridCdl}'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title:Locale.t('skd.top.filtri.grids.operatore.title'),
            layout:{
                type:'vbox'
            },
            defaults: {
                width: 112
            },
            items:[
                {
                    xtype:'combobox',
                    queryMode: 'remote',
                    labelWidth:50,
                    flex:1,
                    minChars:2,
                    bind:{
                        store:'{storeComboOperatore}'
                    },
                    displayField: 'ope_operatore',
                    valueField:'ope_operatore',
                    typeAhead: true,
                    value : '',
                    matchFieldWidth:false,
                    forceSelection:true,
                    emptyText:Locale.t('skd.top.filtri.seleziona'),
                    listConfig: {
                        emptyText: Locale.t('skd.top.filtri.grids.operatore.emptyText'),
                        getInnerTpl: function(a,b) {
                            return '<div class="item">' +
                                '<b>{ope_operatore}</b>'+
                                ' </div>';
                        }
                    },
                    listeners : {
                        select:'onSelectFilterOperatore'
                    }
                },
                {
                    xtype:'grid-filter-operatore',
                    bind:{
                        store:'{storeGridOperatore}'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title:Locale.t('skd.top.filtri.grids.odp.title'),
            layout:{
                type:'vbox'
            },
            defaults: {
                width: 112
            },
            items:[
                {
                    xtype:'combobox',
                    queryMode: 'remote',
                    labelWidth:50,
                    flex:1,
                    minChars:2,
                    bind:{
                        store:'{storeComboOdp}'
                    },
                    displayField: 'sc_op_objstate',
                    valueField:'sc_op_objstate',
                    typeAhead: true,
                    value : '',
                    forceSelection:true,
                    matchFieldWidth:false,
                    emptyText:Locale.t('skd.top.filtri.seleziona'),
                    listConfig: {
                        emptyText: Locale.t('skd.top.filtri.grids.odp.emptyText')
                    },
                    listeners : {
                        select:'onSelectFilterOdp'
                    }
                },
                {
                    xtype:'grid-filter-odp',
                    bind:{
                        store:'{storeGridOdp}'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title:Locale.t('skd.top.filtri.grids.operazione.title'),
            layout:{
                type:'vbox'
            },
            defaults: {
                width: 112
            },
            items:[
                {
                    xtype:'combobox',
                    queryMode: 'remote',
                    labelWidth:50,
                    flex:1,
                    minChars:2,
                    bind:{
                        store:'{storeComboOperazione}'
                    },
                    displayField: 'ope_oper_status_code',
                    valueField:'ope_oper_status_code',
                    typeAhead: true,
                    value : '',
                    forceSelection:true,
                    matchFieldWidth:false,
                    emptyText:Locale.t('skd.top.filtri.seleziona'),
                    listConfig: {
                        emptyText: Locale.t('skd.top.filtri.grids.operazione.emptyText')
                    },
                    listeners : {
                        select:'onSelectFilterOperazione'
                    }
                },
                {
                    xtype:'grid-filter-operazione',
                    bind:{
                        store:'{storeGridOperazione}'
                    }
                }
            ]
        }
    ]
});
