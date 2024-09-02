/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.mansione.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-mansione',

    requires: [
        'fmc.store.forms.mansione.GridModelli',
      //  'fmc.store.forms.mansione.ModelliCombo'
    ],

    stores: {
        storeModelli:{type:'v1-gridmodelli'},
      //  comboModelli:{type:'v1-modellicombo'}
    }
})