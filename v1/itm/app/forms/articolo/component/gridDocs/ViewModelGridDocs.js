/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.gridDocs.ViewModelGridDocs', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-itm-form-articolo-griddocs',
    requires: [
        'itm.forms.articolo.component.gridDocs.StoreDocs',
    ],
    stores: {
        storeDocs: { type: 'v1-itm-grid-articoli-docs' }, //store docs
    },
    data: {

    }

});