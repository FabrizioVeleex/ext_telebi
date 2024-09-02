/**
 * Created by luke on 29/09/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.articoli.Raggruppamento', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-wort-raggruppamento',
    width:300,
    hideLabel :true,
    simpleValue: true,
    items: [
        {boxLabel:Locale.t('wort.articoli.tutti'),inputValue:0,checked:true},
        {boxLabel:Locale.t('wort.articoli.rolcar'),inputValue:1,checked:false},
        {boxLabel:Locale.t('wort.articoli.siccom'),inputValue:2,checked:false}
    ],
    listeners:{
        change:'onChangeBrand'
    }
});