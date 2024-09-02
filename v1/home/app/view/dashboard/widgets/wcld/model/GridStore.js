/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.model.GridStore', {
    extend: 'Ext.data.Model',
    fields: [

        {name:'id',type:'string'},
        {name:'app',type:'string'},
        {name:'accesso',type:'int'},
        {name:'numero',type:'string'},
        {name:'datadoc',type:'date',dateformat:'c'},
        {name:'marca',type:'string'},
        {name:'modello',type:'string'},
        {name:'codacr',type:'string'},
        {name:'fornitore',type:'string'},
        {name:'stato',type:'string'},
        {name:'completamento',type:'date'},
        {name:'studio',type:'int'},
        {name:'prodotti',type:'int'},
        {name:'dispprodotti',type:'int'},
        {name:'definizione',type:'int'},
        {name:'codifica',type:'int'},
        {name:'caratterizzazione',type:'int'},
        {name:'stabilimento',type:'int'},
        {name:'prototipo',type:'int'},
        {name:'ciclatura',type:'int'},
        {name:'ordine',type:'int'},
        {name:'pezzo',type:'int'},
        {name:'istupdate',type:'int'},
        {name:'comcli',type:'int'},
        {name:'lotto',type:'int'},
        {name:'istruzioni',type:'int'},
        {name:'chiusa',type:'int'}
    ]
});
