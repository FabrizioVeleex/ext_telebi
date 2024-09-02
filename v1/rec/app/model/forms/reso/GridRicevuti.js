/**
 * Created by luke on 05/05/21.
 */
Ext.define('rec.model.forms.reso.GridRicevuti', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'idtestata', type: 'string'},
        {name: 'progtestata', type: 'string'},
        {name: 'pscaus', type: 'string'},
        {name: 'psdesc', type: 'string'},
        {name: 'numbolla', type: 'string'},
        {name: 'rigabolla', type: 'int'},
        {name: 'databolla',type: 'string'},
        {name: 'dataprod',type: 'date',dateFormat: 'c'},
        {name: 'idfornitore',type: 'string'},
        {name: 'seriale',type: 'string'},
        {name: 'codice', type: 'string'},
        {name: 'dspcodice', type: 'string'},
        {name: 'note', type: 'string'},
        {name: 'qtaric', type: 'int'},
        {name: 'pcdos', type: 'string'},
        {name: 'idazione', type: 'string'},
        {name: 'azione', type: 'string'},
        {name: 'garanzia', type: 'int'},
        {name: 'immagini', type: 'int'},
        {name: 'valido', type: 'int',defaultValue: -1}
    ]
})