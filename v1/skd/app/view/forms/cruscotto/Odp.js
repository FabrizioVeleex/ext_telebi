/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.view.forms.cruscotto.Odp', {
    extend: 'Ext.form.FieldSet',
    xtype: 'pianificazione',
    requires:[
        'Ext.form.field.Display',
        'Ext.form.FieldSet'
    ],
    collapsible:true,
    collapsed:1,
    bind:{
        collapsed:'{opd}'
    },
    posizione:'pianificazione',
    items:[
        {
            xtype:'displayfield',
            fieldLabel:'Work center',
            userCls:'label_cruscotto',
            bind:{
                value:'{odpStore.ope_work_center_no}'
            }
        },
        {
            xtype:'displayfield',
            fieldLabel:'Stato',
            userCls:'label_cruscotto',
            bind:{
                value:'{odpStore.ope_oper_status_code}'
            }
        }
        // {
        //     xtype:'container',
        //     flex: 1,
        //     layout: {
        //         type: "hbox"
        //     },
        //     defaults: {
        //         msgTarget: 'under',
        //         margin:5
        //     },
        //     items:[
        //         {
        //             xtype:'displayfield',
        //             userCls:'label_cruscotto',
        //             fieldLabel:'_unit_meas',
        //             bind:{
        //                 value:'{pianificazioneStore.unit_meas}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:'_lot_size',
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.lot_size}'
        //             }
        //         }
        //     ]
        // },
        // {
        //     xtype:'container',
        //     flex: 1,
        //     layout: {
        //         type: "hbox"
        //     },
        //     defaults: {
        //         msgTarget: 'under',
        //         margin:5
        //     },
        //     items:[
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:'_safety_stock',
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.safety_stock}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:'_carry_rate',
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.carry_rate}'
        //             }
        //         }
        //     ]
        // },
        // {
        //     xtype:'container',
        //     flex: 1,
        //     layout: {
        //         type: "hbox"
        //     },
        //     defaults: {
        //         msgTarget: 'under',
        //         margin:5
        //     },
        //     items:[
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:'_max_order_qty',
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.max_order_qty}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:'_min_order_qty',
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.min_order_qty}'
        //             }
        //         }
        //     ]
        // },
        // {
        //     xtype:'container',
        //     flex: 1,
        //     layout: {
        //         type: "hbox"
        //     },
        //     defaults: {
        //         msgTarget: 'under',
        //         margin:5
        //     },
        //     items:[
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:'_mul_order_qty',
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.mul_order_qty}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:'_mrp_order_code',
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.mrp_order_code}'
        //             }
        //         }
        //
        //     ]
        // },
        // {
        //     xtype:'container',
        //     flex: 1,
        //     layout: {
        //         type: "hbox"
        //     },
        //     defaults: {
        //         msgTarget: 'under',
        //         margin:5
        //     },
        //     items:[
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:'_maxweek_supply',
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.maxweek_supply}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:'_mrp_order_code',
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.mrp_order_code}'
        //             }
        //         }
        //
        //     ]
        // }
    ],
    listeners:{
        // collapse:'onTogleCollapse',
        // expand:'onTogleCollapse'
    }
    // columns: [
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.operation_no'), dataIndex: 'ope_op_operation_no', width: 40},
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.operation_desctiption'), dataIndex: 'ope_operation_desctiption', width: 100},
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.work_center_no'), dataIndex: 'ope_work_center_no', width: 60},
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.revised_qty_due'), dataIndex:'ope_op_revised_qty_due', width: 60},
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.qty_complete'), dataIndex:'ope_op_qty_complete', width: 60},
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.res_op_ordin'), dataIndex:'ope_res_op_ordine', width: 60},
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.operatore'), dataIndex:'ope_operatore', width: 60},
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.op_start_date'), dataIndex:'ope_op_start_date', width: 60},
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.crew_size'), dataIndex:'crew_size', width: 60},
    //     {text:Locale.t('skd.forms.cruscotto.prev.columns.oper_status_code'), dataIndex:'ope_oper_status_code', width: 60}
    // ]
});