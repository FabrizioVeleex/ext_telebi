/**
 * Created by luca on 20/02/2017.
 */
Ext.define('recpub.view.form.resi.resi.StoreOpen', {
    extend: 'Ext.data.Store',
    alias:'store.incorso',
    requires:['recpub.view.form.resi.resi.ModelOpen'],
    model: 'recpub.view.form.resi.resi.ModelOpen',
    remoteSort: true,
    remoteFilter: true,
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    }
});