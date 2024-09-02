Ext.define('sdc.model.forms.shared.GridMailto', {
    extend: 'Ext.data.Model',
    alias: 'model.gridmailto',
    type:'gridmailto',
    fields: [
        {name: 'contact', type: 'string',defaultValue:''},
        {name: 'row', type: 'string',defaultValue:''},
        {name: 'mailto', type: 'string',defaultValue:''},
        {name: 'ragsoc', type: 'string',defaultValue:''},
        {name: 'modifica', type: 'int', defaultValue:0},
        {name: 'isread', type: 'boolean', defaultValue:true}
    ]
});