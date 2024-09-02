/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.model.forms.cruscotto.GiacenzaComponenti', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'line_item_no',    type: 'string' },
        // { name: 'location_no', type: 'string' },
        { name: 'part_no',   type: 'string' },
        { name: 'issue_to_loc', type: 'string' },
        { name: 'structure_line_no', type: 'string' },
        { name: 'giacenza', type: 'number' },
        { name: 'qty_remaining', type: 'number' },
        { name: 'qty_required', type: 'number' },
        { name: 'qty_request', type: 'number' },
        { name: 'qty_onhand', type: 'number' },
        { name: 'qty_reserved', type: 'number' },
        { name: 'qty_dispon', type: 'number' }
    ]
});