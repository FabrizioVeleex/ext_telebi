/**
 * Created by luke on 20/10/21.
 */
Ext.define('portal.v1.view.main.global.upload.GridImageModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id',type: 'string'},
        { name: 'idrecord',type: 'string'},
        { name: 'file',type: 'string'},
        { name: 'nomefile',type: 'string'},
        { name: 'dimensione',type: 'string'},
        { name: 'estensione',type: 'string'},
        { name: 'percorso',type: 'string'}
    ]
});