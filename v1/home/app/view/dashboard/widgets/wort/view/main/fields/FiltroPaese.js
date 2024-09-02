/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.main.fields.FiltroPaese', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'v1-wort-filtropaese',
    hideLabel:true,
    width:300,
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