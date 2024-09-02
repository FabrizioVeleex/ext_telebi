/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wver.view.main.fields.SearchDateTo', {
    extend: 'Ext.form.field.Date',
    xtype: 'v1-wver-dateto',
    hideTrigger :false,
    editable:false,
    fieldLabel: Locale.t('wver.grid.toolbar.al'),
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
        minValue:'{data}'
    },
    listeners:{
        change:'onChangeData'
    }
});
