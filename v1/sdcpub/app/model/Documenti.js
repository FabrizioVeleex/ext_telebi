/**
 * Created by luke on 02/05/22.
 */
Ext.define('sdcpub.model.Documenti', {
    extend: 'Ext.data.Model',

    fields: [
        { name: "id", type: "string" },
        { name: "idrecord", type: "string" },
        { name: "nomefile", type: "string" },
        { name: "estensione", type: "string" },
        { name: "dimensione", type: "number" },
        { name: "creationdate", type: "date", dateFormat: "c" }
    ]
});