/**
 * Created by luke on 01/08/22.
 */
Ext.define('stcom.model.forms.vendite.GridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cdcli', type: 'string'},
        {name: 'cdazienda', type: 'string'},
        {name: 'ragsoc',type: 'string'},
        {name: 'nazione', type: 'string'},
        {name: 'regione', type: 'string'},
        {name: 'provincia', type: 'string'},
        {name: 'tipocli', type: 'string'},
        {name: 'area', type: 'string'},
        {name: 'capoarea', type: 'string'},
        {name: 'fattincorso',type: 'float'},
        {name: 'fattprec',type: 'float'},
        {name: 'fattold',type: 'float'},
        {name: 'ordinato',type: 'float'},
        {name: 'budget',type: 'float'},
        {name: 'perc',type: 'float'},
        {name: 'percfatt',type: 'float'}
    ]
});