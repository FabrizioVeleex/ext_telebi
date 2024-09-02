/**
 * Created by fabrizio on 21/07/21.
 */
Ext.define('home.view.dashboard.notifiche.model.Avvisi', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        {name: 'descrizione',defaultValue:0},
        {name: 'id',defaultValue:''},
        {name: 'extjs6',defaultValue:''},
        {name: 'icona',defaultValue:''},
        {name: 'idazione',defaultValue:''},
        {name: 'idrecord',defaultValue:''},
        {name: 'idutente',defaultValue:''},
        {name: 'idworkflow',defaultValue:''},
        {name: 'maxdata',defaultValue:''},
        {name: 'mittente',defaultValue:''},
        {name: 'motivazione',defaultValue:''},
        {name: 'result',defaultValue:''},
        {name: 'tabella',defaultValue:''},
        {name: 'tag',defaultValue:''},
        {name: 'titolo',defaultValue:''},
        {name: 'tipo',defaultValue:''} //identifica origine avviso/azione
    ]
});
