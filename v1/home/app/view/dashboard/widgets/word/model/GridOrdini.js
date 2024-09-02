/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.model.GridOrdini', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'codcli',default:''},
        { name: 'ragsoc',default:''},
        { name: 'importo',default:0}
    ]
});
