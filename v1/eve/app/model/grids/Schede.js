/**
 * Created by luca on 27/07/16.
 */
Ext.define('eve.model.grids.Schede', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string', value: ''},
        {name: 'numero', type: 'int'},
        {name: 'soggetto', type: 'string'},
        {name: 'idsoggetto', type: 'string'},
        {name: 'ragsoc', type: 'string'},
        {name: 'gruppo', type: 'string'},
        {name: 'zona', type: 'string'},
        {name: 'nazione', type: 'string'},
        {name: 'dcreazione',type: 'date',dateFormat: 'c'},
        {name: 'autore',type: 'string'}
    ]
});