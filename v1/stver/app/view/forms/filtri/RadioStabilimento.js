/**
 * Created by luke on 27/08/21.
 */
Ext.define('stver.view.forms.filtri.RadioStabilimento', {
    extend: 'Ext.form.RadioGroup',
    simpleValue:true,
    width:300,
    hideLabel :true,
    items: [
        {boxLabel:Locale.t('stver.forms.andamento.toolbar.stabilimento.cicagna'),inputValue:'C01',checked:true},
        {boxLabel:Locale.t('stver.forms.andamento.toolbar.stabilimento.tunisia'),inputValue:'T01'}
    ],
    bind:{hidden:'{hidefiltrostab}'},
    listeners:{
        change:'onChangeStabilimento'
    }
});