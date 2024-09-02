/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolpas.model.forms.bolla.Gridarticoli', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string'},
        { name: 'idrecord', type: 'string'},
        { name: 'cdpar', type: 'string'},
        { name: 'depar', type: 'string'},
        { name: 'cdpfo', type: 'string'},
        { name: 'qtmov', type: 'int'},
        { name: 'stato', type: 'boolean',defaultValue: 0},
        { name: 'statoq', type: 'boolean',defaultValue: 0},
        { name: 'tipo', type: 'int'},
        { name: 'note', type: 'string'},
        { name: 'bloccata', type: 'int'},
        { name: 'idscheda', type: 'string'},
        { name: 'conforme', type: 'int'},
        { name: 'notesblocco', type: 'string'},
        { name: 'tipocontrollo', type: 'string'},
        { name: 'scheda', type: 'string'},
        { name: 'tiposcheda', type: 'string'},
        { name: 'statoscheda', type: 'string'},
        { name: 'risultato', type: 'string'}
    ]
});