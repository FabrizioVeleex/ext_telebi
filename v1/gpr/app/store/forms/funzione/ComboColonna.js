/**
 * Created by luca on 07/11/2016.
 */
Ext.define('gpr.store.forms.funzione.ComboColonna', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combocolonna',
    fields: [
        {name: 'descrizione',type: 'string'}
    ],
    data : [
        {descrizione: Locale.t('gpr.forms.funzione.fields.colonna4')},
        {descrizione: Locale.t('gpr.forms.funzione.fields.colonna1')},
        {descrizione: Locale.t('gpr.forms.funzione.fields.colonna2')},
        {descrizione: Locale.t('gpr.forms.funzione.fields.colonna3')}
    ]
});