/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.forms.documento.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-documento',
    requires: [
        'rec.store.forms.documento.Gridmail'
    ],
    stores:{
        storemail:{type:'v1-gridmail'}
    },
    data: {
        cardactive:'info'
    }
});