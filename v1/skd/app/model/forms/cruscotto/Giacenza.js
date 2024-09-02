/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.model.forms.cruscotto.Giacenza', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'locatio_no',    type: 'string' },
        { name: 'qty_demand',    type: 'number' },
        { name: 'qty_reserved',    type: 'number' },
        { name: 'status',    type: 'number' }
    ]
});