/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.main.fields.Selregione', {
    extend: 'Ext.form.field.ComboBox',
    hideLabel: true,
    xtype: 'v1-wconregione',
    emptyText:Locale.t('wcon.regionesearch'),
    width:200,
    hidden:true,
    displayField:'regione',
    valueField:'idregione',
    minChars:3,
    queryMode:'remote',
    forceSelection:true,
    bind:{
        store: '{storeRegioni}'
    },
    listeners: {
        select: 'onSearchRegione',
        specialkey:'onSpecialkeyRegione'
    }
});