/**
 * Created by luke on 27/08/21.
 */
Ext.define('stver.view.forms.filtri.RadioTipo', {
    extend: 'Ext.form.RadioGroup',
    simpleValue:true,
    width:300,
    hideLabel :true,
    items: [
        {boxLabel:Locale.t('stver.forms.andamento.toolbar.tipo.finiti'),inputValue:1,checked:true},
        {boxLabel:Locale.t('stver.forms.andamento.toolbar.tipo.semi'),inputValue:2}
    ],
    listeners:{
        change:'onChangeTipo'
    }
});