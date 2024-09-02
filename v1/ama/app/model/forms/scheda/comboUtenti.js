/**
 * Created by luke on 15/02/21.
 * Combo per recuperare utenti
 */
Ext.define('ama.model.forms.scheda.comboUtenti', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string'},
        { name: 'nomecognome', type: 'string'}
    ]
});