/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.view.filtri.Stato', {
    extend: 'Ext.form.RadioGroup',
    simpleValue: true,
    hideLabel :true,
    items: [
        {boxLabel:Locale.t('wcld.filtri.tutte'),minWidth:90,inputValue:0},
        {boxLabel:Locale.t('wcld.filtri.incorso'),minWidth:90,inputValue:1,checked:true},
        {boxLabel:Locale.t('wcld.filtri.chiuse'),inputValue:9},
    ],
    listeners:{
        change:'onChangeStato'
    }
});
