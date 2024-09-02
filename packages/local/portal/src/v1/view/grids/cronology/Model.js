Ext.define('portal.v1.view.grids.cronology.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cronology-v1',
    requires: [
        'portal.v1.store.grids.cronology.Cronology'
    ],
    stores: {
        store: {
            type: 'cronology-v1',autoLoad: false
        }
    },
    data: {
        title:null,
        hideTitle:true
    }
});
