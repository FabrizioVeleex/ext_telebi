Ext.define('dip.store.forms.utente.ComboStato', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combostato',
    fields:[
        'id','stato'
    ],
    data:[
        {id:'D',stato:Locale.t('dip.forms.utente.stato.d')},
        {id:'C',stato:Locale.t('dip.forms.utente.stato.c')},
        {id:'S',stato:Locale.t('dip.forms.utente.stato.s')},
        {id:'E',stato:Locale.t('dip.forms.utente.stato.e')}
    ]
});