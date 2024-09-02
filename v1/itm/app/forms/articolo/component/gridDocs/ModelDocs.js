/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.gridDocs.ModelDocs', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string', defaultValue: '' },
        { name: 'upload', type: 'boolean', defaultValue: true },
        { name: 'hidden', type: 'boolean', defaultValue: false },
        { name: 'columnLink', type: 'boolean', defaultValue: false },
        { name: 'oggetto', type: 'string', defaultValue: '' },
        { name: 'documento', type: 'string', defaultValue: '' },
        { name: 'dimensione', type: 'number', defaultValue: 0 },
        { name: 'estensione', type: 'string', defaultValue: '' },
        { name: 'idtipologia', type: 'string', defaultValue: '' },
        { name: 'predefinito', type: 'number', defaultValue: 0 },
        { name: 'pubblica', type: 'number', defaultValue: 0 }
    ]
});