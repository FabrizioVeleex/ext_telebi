/**
 * Created by luke on 01/08/22.
 */
Ext.define('sting.model.forms.ingresso.GridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cdfor', type: 'string'},
        {name: 'cdart', type: 'string'},
        {name: 'descart', type: 'string'},
        {name: 'ragsoc',type: 'string'},
        {name: 'qtamov',type: 'int'},
        {name: 'qtako',type: 'int'},
        {name: 'totmov',type: 'int'},
        {name: 'totko',type: 'int'},
        {name: 'anno',type: 'int'},
        {name: 'mese',type: 'int'},
        {name: 'perc',type: 'float'},
        {name: 'totperc',type: 'float'}
    ]
});