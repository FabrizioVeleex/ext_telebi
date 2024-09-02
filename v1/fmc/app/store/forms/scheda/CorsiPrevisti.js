/**
 * Created by luke on 09/10/2019.
 * Corsi previsti
 */
Ext.define('fmc.store.forms.scheda.CorsiPrevisti', {
    extend: 'Ext.data.Store',
    alias:'store.v1-corsiprevisti',
    requires: [
        'fmc.model.forms.scheda.GridCorsi'
    ],
    model:'fmc.model.forms.scheda.GridCorsi'
});