/**
 * Created by luke on 06/12/2019.
 */
Ext.define('vms.model.forms.prodotto.GridControlli', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'action',defaultValue: 0},
        { name: 'isnew',defaultValue: 1},
        { name: 'id',type: 'string'},
        { name: 'numero',type: 'string'},
        { name: 'prodotto',type: 'string'},
        { name: 'matricola',type: 'string'},
        { name: 'datac',type: 'date',dateFormat: 'c'},
        { name: 'datasca',type: 'date',dateFormat: 'c'},
        { name: 'tipologia',type: 'string'},
        { name: 'stato',type: 'int'},
        { name: 'statodesc',type: 'string'},
        { name: 'valido',type: 'int'}
    ]
});