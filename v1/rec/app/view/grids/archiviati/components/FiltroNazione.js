/**
 * Created by luca on 18/05/2018.
 */
Ext.define('rec.view.grids.archiviati.components.FiltroNazione', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'filtronazione',
    width:350,
    simpleValue: true,columns: 3,labelWidth:120,
    hideLabel:true,
    items: [
        {boxLabel:Locale.t('rec.grids.archiviati.filtri.tutti'),inputValue:9,checked:true},
        {boxLabel:Locale.t('rec.grids.archiviati.filtri.italia'),inputValue:0,checked:false},
        {boxLabel:Locale.t('rec.grids.archiviati.filtri.estero'),inputValue:1,checked:false}
    ],
    listeners:{
        change:'onFilterNazione'
    }
});