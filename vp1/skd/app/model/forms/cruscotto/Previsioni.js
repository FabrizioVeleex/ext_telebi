/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.model.forms.cruscotto.Previsioni', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'order_no'},
        { name: 'order_supply_demand_type' },
        { name: 'qty_supply',    type: 'number' },
        { name: 'qty_demand',    type: 'number' },
        { name: 'qty_reserved',    type: 'number' },
        { name: 'date_required',type:'date', dateFormat: 'Y-m-d'},
        { name: 'status_desc', type: 'string' },
        { name: 'info', type: 'string' }
    ]
});
