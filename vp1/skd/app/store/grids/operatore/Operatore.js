/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.grids.operatore.Operatore', {
    extend: 'Ext.data.Store',
    alias:'store.operatore',
    requires:[
        'skd.model.grids.operatore.Operatore'
    ],
    groupField:'operatore',
    model:'skd.model.grids.operatore.Operatore'
});
