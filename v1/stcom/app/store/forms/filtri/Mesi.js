/**
 * Created by luca on 07/11/2016.
 */
Ext.define('stcom.store.forms.filtri.Mesi', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stcom-mesi',
    fields: [
        {name: 'codice',type: 'int'},
        {name: 'mese',type: 'string'}
    ],
    data : [
        {codice:1,mese: Locale.t('stcom.forms.filtri.mesi.gen')},
        {codice:2,mese: Locale.t('stcom.forms.filtri.mesi.feb')},
        {codice:3,mese: Locale.t('stcom.forms.filtri.mesi.mar')},
        {codice:4,mese: Locale.t('stcom.forms.filtri.mesi.apr')},
        {codice:5,mese: Locale.t('stcom.forms.filtri.mesi.mag')},
        {codice:6,mese: Locale.t('stcom.forms.filtri.mesi.giu')},
        {codice:7,mese: Locale.t('stcom.forms.filtri.mesi.lug')},
        {codice:8,mese: Locale.t('stcom.forms.filtri.mesi.ago')},
        {codice:9,mese: Locale.t('stcom.forms.filtri.mesi.set')},
        {codice:10,mese: Locale.t('stcom.forms.filtri.mesi.ott')},
        {codice:11,mese: Locale.t('stcom.forms.filtri.mesi.nov')},
        {codice:12,mese: Locale.t('stcom.forms.filtri.mesi.dic')},
    ]
});