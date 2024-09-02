/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.view.forms.cruscotto.Previsioni', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.util.Format'
    ],

    viewConfig: {
        enableTextSelection: true,
        emptyText: Locale.t('skd.forms.cruscotto.prev.emptyText')
    },
    columns: {
        items: [
            {text: Locale.t('skd.forms.cruscotto.prev.columns.order_no'), dataIndex: 'order_no', width: 90},
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.order_supply_demand_type'),
                dataIndex: 'order_supply_demand_type',
                flex: 1,
                minWidth: 120
            },
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.qty_supply'),
                renderer: 'onRenderQty',
                dataIndex: 'qty_supply',
                align:'end',
                width: 60
            },
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.qty_reserved'),
                renderer: 'onRenderQtyGiacenza',
                dataIndex: 'qty_reserved',
                align:'end',
                width: 80
            },
            // {text: '<span class="x-fa fa-lock"></span>', dataIndex: 'qty_reserved', width: 50},
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.progettato'),
                renderer: 'onRenderQtyProgettato',
                dataIndex: 'progettato',
                align:'end',
                width: 75
            },
            {
                text: Locale.t('skd.forms.cruscotto.prev.columns.date_required'),
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                dataIndex: 'date_required',
                width: 120
            },
            {text: Locale.t('skd.forms.cruscotto.prev.columns.status_desc'), dataIndex: 'status_desc', width: 120},
            {text: Locale.t('skd.forms.cruscotto.prev.columns.info'), dataIndex: 'info', width: 120}
        ],
        defaults: {
            menuDisabled: true,
            sortable: false
        }
    }
});
