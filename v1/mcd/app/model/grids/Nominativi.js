/**
 * Created by luke on 2019-06-03.
 */
Ext.define('mcd.model.grids.Nominativi', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id', type: 'string'},{name: 'dip_id', type: 'int'},{name: 'dip_nome', type: 'string'}]
});