/**
 * Created by luke on 01/08/22.
 */
Ext.define('stt.view.forms.vendite.components.GridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nazione', type: 'string'},
        {name: 'catve', type: 'string'},
        {name: 'cdcli', type: 'string'},
        {name: 'ragsoc',type: 'string'},
        {name: 'ultanno',type: 'float'},
        {name: 'precanno',type: 'float'},
        {name: 'oldanno',type: 'float'},
        {name: 'diff',type: 'float'},
        {name: 'perc',type: 'string'}
    ]
});