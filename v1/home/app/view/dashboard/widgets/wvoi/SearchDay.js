/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.SearchDay', {
    extend: 'Ext.form.field.Date',
    xtype: 'v1-wvoi-searchday',
    reference:'searchday',
    hideTrigger :false,
    editable:false,
    width:130,
    startDay:1,
    format: 'd/m/Y',
    submitFormat:'Ymd',
    config:{
        grid:null
    },
    listeners:{
        change:'onSearchDay'
    }
});
