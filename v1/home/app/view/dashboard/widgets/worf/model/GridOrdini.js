/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.worf.model.GridOrdini', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ritardo',type:'string'},
        {name: 'cdpar',type:'string'},
        {name: 'cdind',type:'string'},
        {name: 'depar',type:'string'},
        {name: 'unmis',type:'string'},
        {name:'qtord',type:'float'},
        {name:'qtric',type:'float'},
        {name:'cdord',type:'string'},
        {name:'datac',type:'date',dateformat:'c'},
        {name:'stato',type:'string'},
        {name:'descstato',type:'string'}
    ]
});
