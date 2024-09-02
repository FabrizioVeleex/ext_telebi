/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.wver.view.main.fields.RadioStabilimento', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-wverradiostab',
    simpleValue:true,
    width:300,
    hideLabel :true,
    items: [
        {boxLabel:Locale.t('wver.grid.toolbar.stabilimento.cicagna'),inputValue:'1',checked:true},
        {boxLabel:Locale.t('wver.grid.toolbar.stabilimento.tunisia'),inputValue:'2',checked:false}
    ],
    bind:{
        value:'{stabilimento}'
    },
    listeners:{
        change:'onChangeStabilimento'
    }
});