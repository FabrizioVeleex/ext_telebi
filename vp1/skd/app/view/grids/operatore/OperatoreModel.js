/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.operatore.OperatoreModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.operatore',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Operatore',
            autoLoad: true
        }
        */
    },

    data: {
        id:'gridOperatore',
        selectCell:null,
        statusApp:false
    }
});