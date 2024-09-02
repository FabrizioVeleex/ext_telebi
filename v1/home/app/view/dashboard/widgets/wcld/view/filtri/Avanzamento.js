/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.view.filtri.Avanzamento', {
    extend: 'Ext.form.field.ComboBox',
    hideLabel: true,
    emptyText:Locale.t('wcld.filtri.avanzamento'),
    width:350,
    displayField:'descit',
    valueField:'valore',
    minChars:3,
    queryMode:'remote',
    editable:false,
    forceSelection:true,
    bind:{
        store: '{storeAvanzamento}'
    },
    listeners: {
        select: 'onChangeAvanzamento',
        specialkey:'onSpecialKeyAvanzamento'
    }
});