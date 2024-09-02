/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.reparto.RepartoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reparto',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Reparto',
            autoLoad: true
        }
        */
    },

    data: {
        id:'gridReparto',
        selectCell:null,
        statusApp:false
    }
});