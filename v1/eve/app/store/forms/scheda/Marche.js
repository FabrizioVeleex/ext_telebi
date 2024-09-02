/**
 * Created by luca on 27/09/16.
 */
Ext.define('eve.store.forms.scheda.Marche', {
    extend: 'Ext.data.Store',
    fields: [
        {name: 'descrizione',type: 'string'}
    ],
    data : [
        {descrizione: Locale.t('eve.forms.scheda.combomarche.marca1')},
        {descrizione: Locale.t('eve.forms.scheda.combomarche.marca2')},
        {descrizione: Locale.t('eve.forms.scheda.combomarche.marca3')},
        {descrizione: Locale.t('eve.forms.scheda.combomarche.marca4')},
        {descrizione: Locale.t('eve.forms.scheda.combomarche.marca5')}
    ]
});