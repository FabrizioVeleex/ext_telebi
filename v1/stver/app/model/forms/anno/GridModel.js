/**
 * Created by luke on 01/08/22.
 */
Ext.define('stver.model.forms.anno.GridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'anno', type: 'string'},
        {name: 'codart', type: 'string'},
        {name: 'descrizione',type: 'string'},
        {name: 'pianificatore',type: 'string'},
        {name: 'qta1',type: 'float'},
        {name: 'qta2',type: 'float'},
        {name: 'qta3',type: 'float'},
        {name: 'qta4',type: 'float'},
        {name: 'qta5',type: 'float'},
        {name: 'qta6',type: 'float'},
        {name: 'qta7',type: 'float'},
        {name: 'qta8',type: 'float'},
        {name: 'qta9',type: 'float'},
        {name: 'qta10',type: 'float'},
        {name: 'qta11',type: 'float'},
        {name: 'qta12',type: 'float'},
        {name: 'qtot',type: 'float'}
    ]
});