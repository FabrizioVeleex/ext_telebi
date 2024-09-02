/**
 * Created by luca on 17/03/2017.
 */
Ext.define('recpub.view.form.resi.dettaglio.StoreArticoli', {
    extend: 'Ext.data.Store',
    alias:'store.gridarticoli',
    requires:[
        'recpub.view.form.resi.dettaglio.ModelArticoli'
    ],
    model:'recpub.view.form.resi.dettaglio.ModelArticoli'
});