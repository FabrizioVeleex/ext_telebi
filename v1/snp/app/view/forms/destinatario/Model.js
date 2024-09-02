/**
 * Created by luke on 12/02/21.
 */
Ext.define('snp.view.forms.destinatario.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-destinatario',

    requires: [
       'portal.v1.store.forms.combo.GetUsers',

    ],
    stores: {
        comboUtente:{type:'v1-getusers'} //store utente
    }
});