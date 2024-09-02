/**
 * Created by luke on 29/09/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.main.fields.Tipo', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-word-tipo',
    width:300,
    hideLabel :true,
    items: [
        {boxLabel:Locale.t('word.lordo'),inputValue:'L',checked:false,boxLabelAttrTpl: 'data-qtip="'+Locale.t('word.lordotooltip')+'"'},
        {boxLabel:Locale.t('word.netto'),inputValue:'N',checked:false,boxLabelAttrTpl: 'data-qtip="'+Locale.t('word.nettotooltip')+'"'},
        {boxLabel:Locale.t('word.consolidato'),inputValue:'C',checked:true,boxLabelAttrTpl: 'data-qtip="'+Locale.t('word.consolidatotooltip')+'"'}
    ],
    listeners:{
        change:'onChangeTipo'
    }
});