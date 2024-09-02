Ext.define('dip.view.grids.qualifiche.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.qualifiche',
    requires:[
        'dip.store.grids.qualifiche.Qualifiche'
    ],
    stores: {
        store:{
            type:'qualifiche',autoLoad:false
        }
    },
    data: {
        titolo:Locale.t('dip.grids.qualifiche.title')

    }
});