Ext.define('itm.forms.articolo.component.comboAttributi.ModelAttributo', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string', defaultValue: '' },
        { name: 'dspSorting', type: 'string', defaultValue: '' },
        { name: 'sortign', type: 'number', defaultValue: null },
        { name: 'attributo', type: 'string', defaultValue: '' },
        { name: 'codice', type: 'string', defaultValue: '' }
    ]
});