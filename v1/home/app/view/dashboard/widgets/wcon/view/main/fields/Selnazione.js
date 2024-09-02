/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.main.fields.Selnazione', {
    extend: 'Ext.form.field.ComboBox',
    hideLabel: true,
    xtype: 'v1-wconnazione',
    emptyText:Locale.t('wcon.nazionesearch'),
    width:200,
    displayField:'langit',
    valueField:'alpha2',
    minChars:3,
    queryMode:'remote',
    forceSelection:true,
    bind:{
        store: '{storeNazioni}'
    },
    listeners: {
        select: 'onSearchNazione',
        specialkey:'onSpecialkeyNazione'
    }
});