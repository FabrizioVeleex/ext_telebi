/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.main.fields.SearchDate', {
    extend: 'Ext.form.field.Date',
    xtype: 'v1-wpre-searchdate',
    hideTrigger :false,
    editable:false,
    width:160,
    format: 'd/m/Y',
    submitFormat:'Y-m-d',
    config:{
        grid:null
    },
    bind:{
        value:'{data}',
        maxValue:'{dataNow}'
    },
    listeners:{
        change:'onSearchDate'
    }
});
