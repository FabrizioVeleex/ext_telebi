/**
 * Created by fabrizio on 15/08/16.
 */
Ext.define('home.model.notifiche.Azioni', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        {name: 'datadoc',defaultValue:0},
        {name: 'id',defaultValue:''},
        {name: 'idazione',defaultValue:''},
        {name: 'idrecord',defaultValue:''},
        {name: 'idworkflow',defaultValue:''},
        {name: 'result',defaultValue:''},
        {name: 'tabella',defaultValue:''},
        {name: 'tag',defaultValue:''},
        {name: 'titolo',defaultValue:''},
        {name: 'tipo',defaultValue:''} //identifica origine avviso/azione
    ]
});