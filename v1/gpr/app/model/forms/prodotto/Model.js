/**
 * Created by luca on 02/11/2016.
 */
Ext.define('gpr.model.forms.prodotto.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name: 'action',defaultValue:0},
        {name: 'id',type: 'string' },
        {name: 'schcdr',defaultValue:''},
        {name: 'ycdrol_dx_sx',defaultValue:''},
        {name: 'ymarca',defaultValue:''},
        {name: 'yporte_dx_sx',defaultValue:''},
        {name: 'ylatom_dx_sx',defaultValue:''},
        {name: 'schfun',defaultValue:''},
        {name: 'schfu2',defaultValue:''},
        {name: 'elettrico',defaultValue:''},
        {name: 'manuale',defaultValue:''},
        {name: 'comfort',defaultValue:''},
        {name: 'meccanismo',defaultValue:''},
        {name: 'antipinch',defaultValue:''},
        {name: 'pannello',defaultValue:''},
        {name: 'immagine_oe',defaultValue:''},
        {name: 'immagine',defaultValue:''},
        {name: 'connettore',defaultValue:''},
        {name: 'manutenzione',defaultValue:''},
        {name: 'check_digit_1',defaultValue:''},
        {name: 'check_digit_2',defaultValue:''},
        {name: 'codice_barre',defaultValue:''},
        {name: 'portiera',defaultValue:''},
        {name: 'immagine1',defaultValue:''},
        {name: 'immagine2',defaultValue:''},
        {name: 'immagine3',defaultValue:''},
        {name: 'immagine4',defaultValue:''},
        {name: 'video',defaultValue:''},
        {name: 'famiglia',defaultValue:''},
        { name: 'idrecord',type: 'string'}, //parte campi x le istruzioni
        { name: 'idlingua',type: 'string'},
        { name: 'istruzioni'},
        { name: 'step1'},
        { name: 'step2'},
        { name: 'step3'},
        { name: 'step4'},
        { name: 'step5'},
        { name: 'step6'}
    ],
    proxy: {
        type: "rest",
        url: Backend.REST_API + "forms/prodotto/",
        reader: {
            type: "json",
            rootProperty: "data",
        },
        writer: {
            type: "json",
            writeAllFields: true,
        }
    }
});