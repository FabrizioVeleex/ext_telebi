/**
 * Created by luca on 17/06/2017.
 */
Ext.define('fmc.store.forms.scheda.GridCompetenze', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridcompetenze',
    requires:[
        'fmc.model.forms.scheda.GridCompetenze'
    ],
    model:'fmc.model.forms.scheda.GridCompetenze'
});