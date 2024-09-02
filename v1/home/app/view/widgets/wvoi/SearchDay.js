/**
 * Created by luca on 12/10/16.
 */
Ext.define('home.view.widgets.wvoi.SearchDay', {
    extend: 'Ext.form.field.Date',
    xtype: 'wvoi-searchday',
    reference:'searchday',
    hideTrigger :false,
    editable:false,
    width:130,
    format: 'd/m/Y',
    submitFormat:'Ymd',
    config:{
        grid:null
    },
    listeners:{
        change:'onSearchDay'
    }
});