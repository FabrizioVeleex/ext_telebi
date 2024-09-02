/**
 * Created by luke on 09/10/2019.
 * Corsi previsti
 */
Ext.define('fmc.store.forms.scheda.GridCheck', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridcheck',
    requires: [
        'fmc.model.forms.scheda.GridCheck'
    ],
    model:'fmc.model.forms.scheda.GridCheck'
});