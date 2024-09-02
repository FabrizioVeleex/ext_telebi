/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.view.forms.cruscotto.Pianificazione', {
    extend: 'Ext.form.Panel',
    // xtype: 'pianificazione',
    requires:[
        'Ext.container.Container',
        'Ext.form.field.Display',
        // 'Ext.form.FieldSet',
        'Ext.layout.container.HBox'
    ],
    // posizione:'pianificazione',
    defaults:{
      labelWidth:150,
    },
    items:[
        {
            xtype:'displayfield',
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.description}'
            }
        },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.part_no'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.part_no}'
            }
        },
        {
            xtype:'displayfield',
            userCls:'label_cruscotto',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.unit_meas'),
            bind:{
                value:'{pianificazioneStore.unit_meas}'
            }
        },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.lot_size'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.lot_size}'
            }
        },
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
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.unit_meas'),
        //             bind:{
        //                 value:'{pianificazioneStore.unit_meas}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.lot_size'),
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.lot_size}'
        //             }
        //         }
        //     ]
        // },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.safety_stock'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.safety_stock}'
            }
        },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.carry_rate'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.carry_rate}'
            }
        },
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
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.safety_stock'),
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.safety_stock}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.carry_rate'),
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.carry_rate}'
        //             }
        //         }
        //     ]
        // },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.max_order_qty'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.max_order_qty}'
            }
        },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.min_order_qty'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.min_order_qty}'
            }
        },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.mul_order_qty'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.mul_order_qty}'
            }
        },
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
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.max_order_qty'),
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.max_order_qty}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.min_order_qty'),
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.min_order_qty}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.mul_order_qty'),
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.mul_order_qty}'
        //             }
        //         }
        //     ]
        // },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.maxweek_supply'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.maxweek_supply}'
            }
        },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.mrp_order_code'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.mrp_order_code}'
            }
        },
        {
            xtype:'displayfield',
            fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.std_order_size'),
            userCls:'label_cruscotto',
            bind:{
                value:'{pianificazioneStore.std_order_size}'
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
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.maxweek_supply'),
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.maxweek_supply}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.mrp_order_code'),
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.mrp_order_code}'
        //             }
        //         },
        //         {
        //             xtype:'displayfield',
        //             fieldLabel:Locale.t('skd.forms.cruscotto.pianificazione.fields.std_order_size'),
        //             userCls:'label_cruscotto',
        //             bind:{
        //                 value:'{pianificazioneStore.std_order_size}'
        //             }
        //         }
        //
        //     ]
        // }
    ],
    listeners:{
        collapse:'onTogleCollapse',
        expand:'onTogleCollapse'
    }
});