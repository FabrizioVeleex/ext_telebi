/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.wver.view.main.fields.RadioProdotto', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-wverradioprodotto',
    simpleValue:true,
    width:600,
    hideLabel :true,
    items: [
        {boxLabel:Locale.t('wver.grid.toolbar.prodotto.finito'),inputValue:'1',checked:true},
        {boxLabel:Locale.t('wver.grid.toolbar.prodotto.semi'),inputValue:'2',checked:false},
        {boxLabel:Locale.t('wver.grid.toolbar.prodotto.semidettaglio'),inputValue:'3',checked:false}
    ],
    bind:{
        value:'{prodotto}'
    },
    listeners:{
        change:'onChangeProdotto'
    }
});