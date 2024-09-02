/**
 * Created by luke on 02/05/22.
 */
Ext.define('sdcpub.store.Documenti', {
    extend: 'Ext.data.Store',
    alias: "store.documenti",
    requires: ["sdcpub.model.Documenti"],
    model: "sdcpub.model.Documenti"
});