Ext.define('dip.model.forms.utente.Model', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        //identificazione
        {name: 'id', defaultValue: ''},
        {name: 'titolo', defaultValue: ''},
        {name: 'cognome', defaultValue: ''},
        {name: 'nome', defaultValue: ''},
        {name: 'datanascita', type: 'date', dateFormat: 'c', defaultValue: ''},
        {name: 'stato', defaultValue: ''},
        {name: 'matricola', defaultValue: ''},
        {name: 'dataass', type: 'date', dateFormat: 'c', defaultValue: ''},
        {name: 'tel', defaultValue: '',},
        {name: 'interno', defaultValue: ''},
        {name: 'cel', defaultValue: ''},
        {name: 'email', defaultValue: ''},
        {name: 'email2', defaultValue: ''},
        {name: 'ufficio', defaultValue: ''},
        {name: 'idqualifica', defaultValue: ''}, //combo
        {name: 'idruolo', defaultValue: ''}, //combo
        {name: 'shortname', defaultValue: ''},
        {name: 'accessoesterno', defaultValue: 'N'}, //radio
        {name: 'idzona', defaultValue: ''}, //combo
        {name: 'cdage', defaultValue: ''},
        {name: 'zimbramail', defaultValue: 1},

        //hidden
        {name: 'img_new', defaultValue: ''},
        {name: 'img_remove', defaultValue: false},
        {name: 'disabled', defaultValue: false},

        //ubicazione
        {name: 'idfiliale', defaultValue: ''},
        {name: 'img', defaultValue: ''},
        {name: 'actionimg', defaultValue: 0},
        {name: 'filename', defaultValue: ''},

        //hidden
        {name: 'img_new', defaultValue: ''},
        {name: 'img_remove', defaultValue: false},
        {name: 'disabled', defaultValue: false},
        //store
        {name: 'comboRuolo', type: 'auto'},
        {name: 'comboQualifica', type: 'auto'},
        {name: 'comboFiliale', type: 'auto'},
        {name: 'comboRuoliFunz', type: 'auto'},
        {name: 'comboZone', type: 'auto'},
        {name: 'comboUo', type: 'auto'},
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/utente/',
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