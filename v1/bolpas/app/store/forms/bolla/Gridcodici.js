/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolpas.store.forms.bolla.Gridcodici', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridcodici',
    requires:[
        'bolpas.model.forms.bolla.Gridcodici'
    ],
    model:'bolpas.model.forms.bolla.Gridcodici'
});