/**
 * Created by luca on 12/08/16.
 */
Ext.define('eve.store.forms.scheda.GridContatti', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridcontatti',
    requires:[
        'eve.model.forms.scheda.GridContatti'
    ],
    model:'eve.model.forms.scheda.GridContatti'
});