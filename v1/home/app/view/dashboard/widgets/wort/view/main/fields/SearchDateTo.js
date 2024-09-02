/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.main.fields.SearchDateTo', {
    extend: 'Ext.form.field.Date',
    xtype: 'v1-wort-searchdateto',
    hideTrigger :false,
    editable:false,
    fieldLabel: Locale.t('wort.grid.toolbar.data'),
    width: Ext.global.Vars.infoUser.theme === 'big' ? 195 : 180,
    labelWidth: Ext.global.Vars.infoUser.theme === 'big' ? 45 : 40,
    labelAlign: 'right',
    format: 'd/m/Y',
    startDay:1,
    submitFormat:'Y-m-d',
    config:{
        grid:null
    },
    bind:{
        value:'{datato}',
        maxValue:'{dataNow}',
        minValue:'{data}',
        hidden:  '{hidefiltri}'
    },
    listeners:{
        change:'onChangeData'
    }
});
