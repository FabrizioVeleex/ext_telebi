/**
 * Created by luke on 27/08/21.
 */
Ext.define('recpub.view.form.resi.resi.Radiostato', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-rec-radiostato',
    simpleValue:true,
    width:300,
    hideLabel :true,
    items: [
        {boxLabel:'<span class="titleactive">'+Locale.t('recpub.forms.attive')+ '</span>',inputValue:0,checked:true},
        {boxLabel:'<span class="titleactive">'+Locale.t('recpub.forms.tutte')+ '</span>',inputValue:1,checked:false}
    ],
    listeners:{
        change:'onChangeStato'
    }
});