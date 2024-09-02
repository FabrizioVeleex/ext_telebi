/**
 * Created by luke on 21/05/21.
 */
Ext.define('portal.v1.public.main.global.upload.GridAttachModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'action',defaultValue: 0},
        { name: 'isnew',defaultValue: 1},
        { name: 'id',type: 'string' },
        { name: 'readOnlyAttach', type: 'string' },
        { name: 'hideDownload',type: 'string',defaultValue:'true'},
        { name: 'file',type: 'string' },
        { name: 'descrizione',type: 'string' },
        { name: 'dimensione',type: 'string' },
        { name: 'estensione',type: 'string' },
        { name: 'creationdate',type: 'date', dateFormat: 'c',defaultValue: ''},
        { name: 'percorso',type: 'string'},
        { name: 'autore',type: 'string' },
        { name: 'idautore',type: 'string'},
        { name: 'step',type: 'int'}
    ]
})