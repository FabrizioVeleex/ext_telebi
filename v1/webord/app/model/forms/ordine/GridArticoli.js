/**
 * Created by luke on 13/05/2020.
 */
Ext.define('webord.model.forms.ordine.GridArticoli', {
    extend: 'Ext.data.Model',
    fields:[
        'id',
        'progressivo_riga',
        'codice_articolo',
        'descrizione',
        'qta',
        'note'
    ]
});