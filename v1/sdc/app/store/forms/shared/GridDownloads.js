/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('sdc.store.forms.shared.GridDownloads', {
    extend: 'Ext.data.Store',
    alias:'store.v1-griddownloads',
    requires:[
        'sdc.model.forms.shared.GridDownloads'
    ],
    model:'sdc.model.forms.shared.GridDownloads'
});