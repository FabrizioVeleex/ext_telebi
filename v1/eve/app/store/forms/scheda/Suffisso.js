/**
 * Created by luca on 28/09/16.
 */
Ext.define('eve.store.forms.scheda.Suffisso', {
    extend: 'Ext.data.Store',
    fields: [
        {name: 'descrizione',type: 'string'}
    ],
    data : [
        {descrizione: Locale.t('eve.forms.scheda.combosuffisso.suff1')},
        {descrizione: Locale.t('eve.forms.scheda.combosuffisso.suff2')}
    ]
});