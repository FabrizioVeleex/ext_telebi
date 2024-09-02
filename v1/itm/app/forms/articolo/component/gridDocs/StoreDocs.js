/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.gridDocs.StoreDocs', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-itm-grid-articoli-docs',
    requires: [
        'itm.forms.articolo.component.gridDocs.ModelDocs'
    ],
    model: 'itm.forms.articolo.component.gridDocs.ModelDocs'
});