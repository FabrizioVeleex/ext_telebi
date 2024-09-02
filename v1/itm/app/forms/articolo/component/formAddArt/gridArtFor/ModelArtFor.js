/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.formAddArt.gridArtFor.ModelArtFor', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string', defaultValue: '' },
        { name: 'azienda', type: 'string', defaultValue: '' },
        { name: 'cd_art', type: 'string', defaultValue: '' },
        { name: 'descr_art', type: 'string', defaultValue: '' },
        { name: 'data_start', type: 'date', defaultValue: '' },
        { name: 'data_end', type: 'date', defaultValue: '' },
        { name: 'prezzo', type: 'string', defaultValue: '' },
    ]
});