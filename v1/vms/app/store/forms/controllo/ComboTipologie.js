/**
 * Created by luke on 27/11/2019.
 */
Ext.define('vms.store.forms.controllo.ComboTipologie', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combotipologie',
    fields:[
        'id','descrizione','durata'
    ],
    data:[]
});