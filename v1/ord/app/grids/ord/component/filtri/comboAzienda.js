/**
 * Created by luke on 30/06/23.
 */
Ext.define('ord.grids.ord.component.filtri.comboAzienda', {
    extend: 'Ext.form.field.ComboBox',
    fieldLabel: Locale.t('ord.grids.documenti.filtri.azienda'),
    xtype: 'v1-ord-comboazienda',
    width:500,
    displayField:'azienda',
    valueField:'codice',
    minChars:2,
    queryMode:'remote',
    forceSelection:true,
    bind:{
        store: '{storeAzienda}'
    },
    listeners: {
        select: 'onFiltraAzienda',
        specialkey:'onSpecialkeyFiltroAzienda'
    }
});