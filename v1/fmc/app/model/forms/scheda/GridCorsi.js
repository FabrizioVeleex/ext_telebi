/**
 * Created by luke on 09/10/2019.
 */
Ext.define('fmc.model.forms.scheda.GridCorsi', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'action',defaultValue: 0},
        { name: 'isnew',defaultValue: 1},
        { name: 'id',type: 'string'},
        { name: 'numero',type: 'string'},
        { name: 'titolo',type: 'string'},
        { name: 'tipo',type: 'int'},
        { name: 'idcorso',type: 'string'},
        { name: 'datac',type: 'date',dateFormat: 'c'},
        { name: 'datasca',type: 'date',dateFormat: 'c'},
        { name: 'tipologia',type: 'string'},
        { name: 'idcheck',type: 'string'},
        { name: 'stato',type: 'int'},
        { name: 'esito',type: 'int'},
        { name: 'iduser',type: 'string'},
        { name: 'firma',type: 'string'},
        { name: 'datafirma',type:'date',dateFormat: 'c'},
        { name: 'iddoc',type: 'string'},
        { name: 'mansione',type: 'string' },
        { name: 'nomecognome',type: 'string'}
    ]
});