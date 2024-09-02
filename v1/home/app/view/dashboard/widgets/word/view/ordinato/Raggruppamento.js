/**
 * Created by luke on 29/09/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.ordinato.Raggruppamento', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-wordraggruppamentoord',
    width:350,
    hideLabel :true,
    simpleValue: true,
    items: [
        {boxLabel:Locale.t('word.ordinatocli'),inputValue:1,checked:true},
        {boxLabel:Locale.t('word.ordinatoart'),inputValue:2,checked:false}
    ],
    listeners:{
        change:'onChangeRaggruppamentoOrdinato'
    }
});