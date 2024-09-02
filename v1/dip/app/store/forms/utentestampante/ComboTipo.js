Ext.define('dip.store.forms.utentestampante.ComboTipo', {
    extend: 'Ext.data.Store',
    alias:'store.combotipo',
    fields: [
        {name: 'id',type: 'string'},
        {name: 'descrizione',type: 'string'}
    ],
    data : [
        {id:'U',descrizione: Locale.t('dip.forms.utentestampante.fields.tipoU')},
        {id:'I',descrizione: Locale.t('dip.forms.utentestampante.fields.tipoI')}
    ]
});