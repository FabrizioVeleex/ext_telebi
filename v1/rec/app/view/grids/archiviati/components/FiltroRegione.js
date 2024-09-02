/**
 * Created by luke on 26/08/21.
 */
Ext.define('rec.view.grids.archiviati.components.FiltroRegione', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'filtroregione',
    fieldLabel:Locale.t('rec.grids.archiviati.filtri.regione'),
    width:500,
    displayField:'regione',
    valueField:'idregione',
    minChars:3,
    queryMode:'remote',
    forceSelection:true,
    bind:{
        store: '{storeRegioni}',
        hidden:'{hideregioni}'
    },
    listeners: {
        select: 'onFiltroRegione',
        specialkey:'onSpecialkeyRegione'
    }
});