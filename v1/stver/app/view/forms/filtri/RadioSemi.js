/**
 * Created by luke on 27/08/21.
 */
Ext.define('stver.view.forms.filtri.RadioSemi', {
    extend: 'Ext.form.RadioGroup',
    simpleValue:true,
    width:300,
    hideLabel :true,
    hidden:true,
    items: [
        {boxLabel:Locale.t('stver.forms.andamento.toolbar.semi.articoli'),inputValue:1,checked:true},
        {boxLabel:Locale.t('stver.forms.andamento.toolbar.semi.famiglia'),inputValue:2}
    ],
    bind:{hidden:'{hidesemi}'},
    listeners:{
        change:'onChangeSemi'
    }
});