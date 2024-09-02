/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.formAddArt.gridArtForLotti.ModelArtForLotti', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string', defaultValue: '' },
        { name: 'azienda', type: 'string', defaultValue: '' },
        { name: 'lotto', type: 'number', defaultValue: '' },
        { name: 'perc_sconto', type: 'number', defaultValue: '' },
        { name: 'prezzo_scontato', type: 'number', defaultValue: '' },
    ]
});