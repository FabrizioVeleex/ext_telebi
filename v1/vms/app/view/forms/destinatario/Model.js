/**
 * Created by luke on 12/02/21.
 */
Ext.define('vms.view.forms.destinatario.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-destinatario',

    requires: [
        'portal.v1.store.forms.combo.GetStabilimento',
        'portal.v1.store.forms.combo.GetUsers',
        'vms.store.forms.destinatario.Gridrisorse'
    ],
    stores: {
        //comboSedi:{type:'v1-combosede'}, //store sede
        comboSedi:{type:'v1-getstabilimento'}, //store sedi
        storeRisorse:{type:'v1-gridrisorse'}, //store riservatezze
        comboUtente:{type:'v1-getusers'} //store utenti riservatezze
    }
});