/**
 * Created by luke on 15/02/21.
 */
Ext.define('portal.v1.model.forms.combo.GetCompanies', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string'},
        { name: 'codice', type: 'string'},
        { name: 'ragsoc', type: 'string'},
        { name: 'indirizzo', type: 'string'},
        { name: 'comune', type: 'string'},
        { name: 'cap', type: 'string'},
        { name: 'nazionalita', type: 'string'},
        { name: 'tiposoggetto', type: 'string'}, //flag C/F se cliente/fornitore
        { name: 'tipo', type: 'string'} //descrizione se cliente/fornitore
    ]
});