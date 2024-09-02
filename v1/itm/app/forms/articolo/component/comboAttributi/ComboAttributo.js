/**
 * Created by Fabrizio on 09/12/2016.
 */
Ext.define('itm.forms.articolo.component.comboAttributi.ComboAttributo', {
    extend: 'Ext.data.Store',
    alias: 'store.combocollaudo',
    requires: [
        'Ext.data.proxy.Rest',
        'itm.forms.articolo.component.comboAttributi.ModelAttributo'
    ],
    model: 'itm.forms.articolo.component.comboAttributi.ModelAttributo',
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/articolo/comboattributo/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});