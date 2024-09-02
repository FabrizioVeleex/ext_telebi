/**
 * Created by luke on 11/07/24.
 */
Ext.define('stcom.model.forms.articoli.ModelClienti', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'cdcli',default:''},
        {name: 'ragsoc',default:''},
        {name: 'vendcorso',type: 'float'},
        {name: 'vendprec',type: 'float'},
        {name: 'vendold',type: 'float'},
        {name: 'perc',type: 'float'}
    ]
});