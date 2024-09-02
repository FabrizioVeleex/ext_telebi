/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.worf.model.GridArticoli', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'stabilimento',type:'string'},
        {name: 'cdfor',type:'string'},
        {name: 'stato',type:'string'},
        {name: 'cdpar',type:'string'},
        {name: 'depar',type:'string'},
        {name: 'cdind',type:'string'},
        {name:'qtord',type:'float'},
        {name:'qtrit',type:'float'},
        {name:'residuo',type:'float'},
        {name:'giacstab',type:'float'},
        {name:'transito',type:'float'},
        {name:'giacenza',type:'float'},
        {name:'disavanzo',type:'float'},
        {name:'delta',type:'float'},
        {name: 'nota',type:'string'},
        {name:'mese1',type:'float'},
        {name:'mese2',type:'float'},
        {name:'mese3',type:'float'},
        {name:'mese4',type:'float'},
        {name:'mese5',type:'float'},
        {name:'mese6',type:'float'},
        {name:'mese7',type:'float'},
        {name:'mese8',type:'float'},
        {name:'mese9',type:'float'},
        {name:'mese10',type:'float'},
        {name:'mese11',type:'float'},
        {name:'mese12',type:'float'},
        {name:'altro',type:'float'},
        {name:'pianificatore',type:'string'}
    ]
});
