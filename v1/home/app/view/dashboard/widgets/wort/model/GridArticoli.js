/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.model.GridArticoli', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'CDARR'},
        { name: 'DESC'},
        { name: 'QTORR',type:'int'},
        { name:'VLORR',type:'float'},
        { name: 'UNMSR' }
    ]
});
