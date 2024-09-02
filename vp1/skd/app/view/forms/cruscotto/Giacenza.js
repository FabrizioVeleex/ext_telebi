/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.view.forms.cruscotto.Giacenza', {
    extend: 'Ext.grid.Panel',
    xtype: 'giacenzaforniture',

    requires: [
        'Ext.util.Format'
    ],
    viewConfig:{
        enableTextSelection: true,
        emptyText:Locale.t('skd.forms.cruscotto.giacenze.emptyText')
    },
    columns: {
        items: [
            {text: Locale.t('skd.forms.cruscotto.giacenze.columns.location_no'), dataIndex: 'location_no', width: 90},
            {
                text: Locale.t('skd.forms.cruscotto.giacenze.columns.qty_onhand'),
                dataIndex: 'qty_onhand',
                renderer: function (value,meta,record,rowIndex,colIndex,store,view) {
                    return Ext.util.Format.number(value,'0,000.0');
                },
                align:'end',
                width: 90
            },
            {
                text: Locale.t('skd.forms.cruscotto.giacenze.columns.qty_reserved'),
                dataIndex: 'qty_reserved',
                renderer: function (value,meta,record,rowIndex,colIndex,store,view) {
                    return Ext.util.Format.number(value,'0,000.0');
                },
                align:'end',
                width: 90
            },
            {
                text: Locale.t('skd.forms.cruscotto.giacenze.columns.disponibile'),
                dataIndex: 'disponibile',
                renderer: function (value,meta,record,rowIndex,colIndex,store,view) {
                    return Ext.util.Format.number(value,'0,000.0');
                },
                align:'end',
                width: 90
            }
        ],
        defaults: {
            menuDisabled: true,
            sortable:false
        }
    }
});
