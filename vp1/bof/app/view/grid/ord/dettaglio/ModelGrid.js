/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('bofpub.view.grid.ord.dettaglio.ModelGrid', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'cdpar',default:''},
        { name: 'descrizione',default:''},
        { name: 'qta_ord',default:0}
    ]
});
