/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.categorie.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.categorie',
    requires:[
        'ana.store.grids.categorie.Store'
    ],
    stores: {
        store:{type:'v1-categorie',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.categorie.title'),
        urlProxy :'grids/categorie/getstore/'
    },
    // listeners:{
    //     beforeLoad:function(store){
    //         debugger;
    //     }
    // }
});