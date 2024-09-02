/**
 * Created by luke on 19/11/2019.
 */
Ext.define('fmc.store.forms.mansione.GridModelli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridmodelli',
    requires: [
        'fmc.model.forms.mansione.GridModelli'
    ],
    model:'fmc.model.forms.mansione.GridModelli'
});