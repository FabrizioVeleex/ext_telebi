/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wver.model.Model', {
    extend: 'Ext.data.Model',
    fields: [
        {type:'date',name:'TRNDT',dateformat:'c'},
        'ITNBR',
        'ITDSC',
        {type:'int',name:'TRQTY'},
    ]
});
