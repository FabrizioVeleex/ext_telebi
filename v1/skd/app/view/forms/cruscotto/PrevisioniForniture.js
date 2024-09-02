/**
 * Created by fabrizio on 14/03/18.
 */
Ext.define('skd.view.forms.cruscotto.PrevisioniForniture', {
    extend: 'Ext.grid.Panel',

    xtype: 'previsioniforniture',

    requires: [
        'Ext.util.Format'
    ],
    shadow: true,
    height: 400,
    viewConfig: {
        enableTextSelection: true,
        emptyText: Locale.t('skd.forms.cruscotto.prev.emptyText')
    },
    columns: {
        items: [
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.date_required'),
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                dataIndex: 'date_required',
                width: 120
            },
            {text: Locale.t('skd.forms.cruscotto.prev.columns.status_desc'), dataIndex: 'status_desc', width: 120},
            {text: Locale.t('skd.forms.cruscotto.prev.columns.info'), dataIndex: 'info', minWidth: 200,flex:1},
            {text: Locale.t('skd.forms.cruscotto.prev.columns.order_no'), dataIndex: 'order_no', width: 90},
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.order_supply_demand_type'),
                dataIndex: 'order_supply_demand_type',
                width: 150
            },
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.qty_supply'),
                dataIndex: 'qty_supply',
                renderer:function (value,meta,record,rowIndex,colIndex,store,view) {
                    let v,
                        v1 = record.data['qty_supply'] - record.data['qty_demand'];
                    if (v1 < 0) {
                        v = '-' + Ext.util.Format.number(record.data['qty_demand'], '0,000.0');
                        meta.tdCls += ' cell_qta_negativa ';
                    } else {
                        v = Ext.util.Format.number(record.data['qty_supply'], '0,000.0');
                        meta.tdCls += ' cell_qta_positiva ';
                    }
                    return v
                },
                align:'end',
                width: 90
            },
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.qty_reserved'),
                renderer: function (value,meta,record,rowIndex,colIndex,store,view) {
                    if (value>=0){
                        meta.tdCls +=' cell_qta_positiva ';
                    } else{
                        meta.tdCls +=' cell_qta_negativa ';
                    }
                    return Ext.util.Format.number(value,'0,000.0');
                },
                dataIndex: 'qty_reserved',
                align:'end',
                width: 90
            },
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.progettato'),
                dataIndex: 'progettato',
                renderer: function (value,meta,record,rowIndex,colIndex,store,view) {
                    if (value<0){
                        meta.tdCls +=' cell_qta_negativa ';
                        return Ext.util.Format.number(value,'0,000.0');
                    }else{
                        return Ext.util.Format.number(value,'0,000.0');
                    }
                },
                align:'end',
                width: 90
            },
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.progettato_no_pop_rda'),
                dataIndex: 'progettatonopr',
                renderer: function (value,meta,record,rowIndex,colIndex,store,view) {
                    if (value<0){
                        meta.tdCls +=' cell_qta_negativa ';
                        return Ext.util.Format.number(value,'0,000.0');
                    }else{
                        return Ext.util.Format.number(value,'0,000.0');
                    }
                },
                align:'end',
                width: 120
            },
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.residuo_giacenza'),
                dataIndex: 'residuogiacenza',
                renderer: function (value,meta,record,rowIndex,colIndex,store,view) {
                    if (value<0){
                        meta.tdCls +=' cell_qta_negativa ';
                        return Ext.util.Format.number(value,'0,000.0');
                    }else{
                        return Ext.util.Format.number(value,'0,000.0');
                    }
                },
                align:'end',
                width: 120
            }
        ],
        defaults: {
            menuDisabled: true
        }
    }
});
