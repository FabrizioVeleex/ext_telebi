/**
 * Created by luke on 29/09/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.residuo.Raggruppamento', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-wordraggruppamento',
    width:350,
    hideLabel :true,
    simpleValue: true,
    items: [
        {boxLabel:Locale.t('word.residuocli'),inputValue:1,checked:true},
        {boxLabel:Locale.t('word.residuofam'),inputValue:2,checked:false},
        {boxLabel:Locale.t('word.residuoart'),inputValue:3,checked:false}
    ],
    listeners:{
        change:'onChangeRaggruppamento'
    }
});