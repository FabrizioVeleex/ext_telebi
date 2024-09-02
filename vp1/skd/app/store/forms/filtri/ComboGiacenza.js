/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.ComboGiacenza', {
    extend: 'Ext.data.Store',
    alias:'store.comboGiacenza',
    fields: [
        {name: 'id', type: 'number'},
        {name: 'giacenza', type: 'string'}
    ],
    proxy: {
        type: 'memory',
        data: [
            {id: 0, giacenza: 'Giacenza'},
            {id: 4, giacenza: 'Giacenza presunta'},
            // {id: 1, giacenza: 'Giacenza presunta no RDA'},
            // {id: 2, giacenza: 'Giacenza presunta no POP'},
            {id: 3, giacenza: 'Giacenza presunta no RDA/POP'}
        ]
    }

});