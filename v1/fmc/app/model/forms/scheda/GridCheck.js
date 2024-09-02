/**
 * Created by luke on 09/10/2019.
 */
Ext.define('fmc.model.forms.scheda.GridCheck', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'action',defaultValue: 0},
        { name: 'isnew',defaultValue: 1},
        { name: 'id',type: 'string'},
        { name: 'titolo',type: 'string'},
        { name: 'datachk',type: 'date',dateFormat: 'c'},
        { name: 'esito',type: 'int'},
        { name: 'statochk',type: 'string'},
        { name: 'corso',type: 'string'},
        { name: 'iduser',type: 'string'},
        { name: 'firma',type: 'string'},
        { name: 'datafirma',type:'date',dateFormat: 'c'},
        { name: 'iddoc',type: 'string'},
        { name: 'mansione',type: 'string' },
        { name: 'nomecognome',type: 'string'}
    ]
});