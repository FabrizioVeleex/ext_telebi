/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.main.fields.Radionazione', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-wconradionaz',
    simpleValue:true,
    width:300,
    hideLabel :true,
    items: [
        {boxLabel:Locale.t('wcon.tutti'),inputValue:0,checked:true},
        {boxLabel:Locale.t('wcon.italia'),inputValue:1,checked:false},
        {boxLabel:Locale.t('wcon.estero'),inputValue:2,checked:false}
    ],
    listeners:{
        change:'onChangeTiponazione'
    }
});