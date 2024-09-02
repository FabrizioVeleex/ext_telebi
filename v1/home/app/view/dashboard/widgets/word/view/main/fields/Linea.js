/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.main.fields.Linea', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-word-linea',
    width:450,
    simpleValue: true,
    hideLabel :true,
    items: [
        {boxLabel:Locale.t('word.tutti'),inputValue:0,checked:true},
        {boxLabel:Locale.t('word.rolcar'),inputValue:1,checked:false},
        {boxLabel:Locale.t('word.siccom'),inputValue:2,checked:false},
        {boxLabel:Locale.t('word.triangolazione'),inputValue:3,checked:false}
    ],
    listeners:{
        change:'onChangeLinea'
    }
});
