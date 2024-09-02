/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.cdl.CdlModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cdl',
    requires: [
        'skd.store.forms.pick.GridOperatore'
    ],

    stores: {
        storeGridPreparatorePick: { type: 'gridOperatore-pickfiltri' },
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Cdl',
            autoLoad: true
        }
        */
    },

    data: {
        widthNote: 200
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});