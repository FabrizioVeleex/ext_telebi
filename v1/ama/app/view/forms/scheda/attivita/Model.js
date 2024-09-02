/**
 * Created by luke on 26/08/21.
 */
Ext.define('ama.view.forms.scheda.attivita.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-attivita',

    requires: [
        'ama.store.forms.scheda.ComboUtenti'
    ],
    data: {
        record:{}
    },
    stores: {
        comboUtente:{type:'v1-comboutenti'}
    }
})