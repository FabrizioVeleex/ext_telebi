/**
 * Created by luca on 27/09/16.
 */
Ext.define('eve.store.forms.scheda.Brand', {
    extend: 'Ext.data.Store',
    fields: [
        {name: 'descrizione',type: 'string'}
    ],
    data : [
        {descrizione: Locale.t('eve.forms.scheda.combobrand.brand1')},
        {descrizione: Locale.t('eve.forms.scheda.combobrand.brand2')},
        {descrizione: Locale.t('eve.forms.scheda.combobrand.brand3')}
    ]
});