/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.main.fields.FiltroRegione', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'v1-wort-filtroregione',
    hideLabel:true,
    width:300,
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