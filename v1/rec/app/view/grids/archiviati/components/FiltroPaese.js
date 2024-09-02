/**
 * Created by luke on 26/08/21.
 */
Ext.define('rec.view.grids.archiviati.components.FiltroPaese', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'filtropaese',
    fieldLabel:Locale.t('rec.grids.archiviati.filtri.paese'),
    width:500,
    displayField:'langit',
    valueField:'alpha2',
    minChars:3,
    queryMode:'remote',
    forceSelection:true,
    bind:{
        store: '{storePaesi}',
        hidden:'{hidepaesi}'
    },
    listeners: {
        select: 'onSearchPaese',
        specialkey:'onSpecialkeyPaese'
    }
});