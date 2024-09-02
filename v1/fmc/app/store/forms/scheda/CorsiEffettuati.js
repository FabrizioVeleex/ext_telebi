/**
 * Created by luke on 09/10/2019.
 * Corsi previsti
 */
Ext.define('fmc.store.forms.scheda.CorsiEffettuati', {
    extend: 'Ext.data.Store',
    alias:'store.v1-corsieffettuati',
    requires: [
        'fmc.model.forms.scheda.GridCorsi'
    ],
    model:'fmc.model.forms.scheda.GridCorsi'
});