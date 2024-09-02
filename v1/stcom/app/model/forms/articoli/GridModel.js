/**
 * Created by luke on 01/08/22.
 */
Ext.define('stcom.model.forms.articoli.GridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cdart', type: 'string'},
        {name: 'cdcom1', type: 'string'},
        {name: 'descart', type: 'string'},
        {name: 'clm', type: 'string'},
        {name: 'cdcli', type: 'string'},
        {name: 'cdazienda', type: 'string'},
        {name: 'ragsoc',type: 'string'},
        {name: 'nazione', type: 'string'},
        {name: 'regione', type: 'string'},
        {name: 'provincia', type: 'string'},
        {name: 'tipocli', type: 'string'},
        {name: 'area', type: 'string'},
        {name: 'capoarea', type: 'string'},
        {name: 'vendcorso',type: 'float'},
        {name: 'vendprec',type: 'float'},
        {name: 'vendold',type: 'float'},
        {name: 'perc',type: 'float'}
    ]
});