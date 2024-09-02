/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.model.GridStore', {
    extend: 'Ext.data.Model',
    fields: [
        'esecuzione',
        {type:'int',name:'PROG'},
        'CDAGE',
        'NRREO',
        'DTREO',
        'CDCSO',
        {type:'float',name:'VLORO'},
        {type:'float',name:'TOTQTA'},
        {type:'float',name:'TOTALTRO'},
        {type:'float',name:'TOTMET'}
    ]
});
