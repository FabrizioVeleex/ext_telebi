/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.model.ComboEsclusi', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id',     type: 'string' },
        { name: 'codice',  type: 'string' ,defaultValue:''},
        { name: 'ragsoc',  type: 'string' ,defaultValue:''},
        { name: 'isnew',  type: 'boolean', defaultValue:0}
    ]
});
