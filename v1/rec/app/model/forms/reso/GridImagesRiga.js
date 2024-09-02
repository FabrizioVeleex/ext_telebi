/**
 * Created by luke on 21/10/21.
 */
Ext.define('rec.model.forms.reso.GridImagesRiga', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id',type: 'string'},
        { name: 'idrecord',type: 'string'},
        { name: 'file',type: 'string'},
        { name: 'nomefile',type: 'string'},
        { name: 'rigabolla',type: 'int'},
        { name: 'progressivo',type: 'string'},
        { name: 'dimensione',type: 'string'},
        { name: 'estensione',type: 'string'},
        { name: 'percorso',type: 'string'}
    ]
});