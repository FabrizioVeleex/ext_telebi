/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.main.fields.SearchNaz', {
    extend: 'Ext.form.ComboBox',
    xtype: 'v1-wort-searchnaz',
    bind: {
        store: '{storeNaz}',
        hidden: '{hideNaz}',
        value:'{naz}'
    },
    fieldLabel: Locale.t('wort.grid.toolbar.nazioni'),
    width: Ext.global.Vars.infoUser.theme === 'big' ? 145 : 140,
    queryMode: 'local',
    hidden: true,
    forceSelection: true,
    labelWidth: Ext.global.Vars.infoUser.theme === 'big' ? 45 : 40,
    labelAlign: 'right',
    editable: false,
    displayField: 'label',
    valueField: 'id',
    listeners: {
        change: 'onChangeNaz'
    }
});
