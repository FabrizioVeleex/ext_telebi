/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.modulo.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-modulo',

    requires: [
        'portal.v1.store.forms.combo.GetUsers',
        'stt.view.forms.modulo.components.gridRisorse.Store'
    ],
    stores: {
        storeRisorse: { type: 'stt-v1-form-modulo-gridrisorse' }, //store autorizzazioni
        comboUtente: { type: 'v1-getusers' } //store utenti riservatezze
    }
})