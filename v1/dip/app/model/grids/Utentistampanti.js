/**
 * Created by luca on 16/12/2016.
 */
Ext.define('dip.model.grids.Utentistampanti', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'iduser', type: 'string'},
        {name: 'idprinter', type: 'string'},
        {name: 'indirizzoip', type: 'string'},
        {name: 'tipo', type: 'string'},
        {name: 'utente', type: 'string'},
        {name: 'risorsa', type: 'string'},
        {name: 'stampante', type: 'string'},
        {name: 'descrizione', type: 'string'}
    ]
});