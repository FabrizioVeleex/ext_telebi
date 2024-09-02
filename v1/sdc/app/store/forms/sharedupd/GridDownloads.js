/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('sdc.store.forms.sharedupd.GridDownloads', {
    extend: 'Ext.data.Store',
    alias:'store.v1-griddownloadsupd',
    requires:[
        'sdc.model.forms.sharedupd.GridDownloads'
    ],
    model:'sdc.model.forms.sharedupd.GridDownloads'
});