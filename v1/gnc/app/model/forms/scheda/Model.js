/**
 * Created by luca on 16/07/2018.
 */
Ext.define('gnc.model.forms.scheda.Model', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'action',defaultValue:0},//0:none,1:update(new),2:delete
        {name:'isnew',defaultValue:0}, //0 = false, 1 true
        {name:'step',defaultValue:10}, //10 = valore iniziale step
        {name:'id',type: 'string',defaultValue:''},
        {name:'tipo',type: 'int',defaultValue:0},
        {name:'datadoc',type: 'date', dateFormat: 'c',defaultValue: ''},
        {name:'qta',type: 'int',defaultValue:0},
        {name:'numero',type: 'string',defaultValue:''},
        {name:'autore',type: 'string',defaultValue:''},
        {name:'rilevato',type: 'string',defaultValue:''},
        {name:'cdart',type: 'string',defaultValue:''},
        {name:'idstabilimento',type: 'string',defaultValue:''},
        {name:'idfornitore',type: 'string',defaultValue:''},
        {name:'descrizione',type: 'string',defaultValue:''},
        {name:'notedefine',type: 'string',defaultValue:''},
        {name:'imgko',type: 'string',defaultValue:''},
        {name:'imgok',type: 'string',defaultValue:''},
        {name:'imgaltro',type: 'string',defaultValue:''},
        //inizializzo tutti i campi data
        {name:'driclotto',type: 'date', dateFormat: 'c',defaultValue: ''},//containment
        {name:'dcomlotto',type: 'date', dateFormat: 'c',defaultValue: ''},//containment
        {name:'dricblocco',type: 'date', dateFormat: 'c',defaultValue: ''},//containment
        {name:'dcomblocco',type: 'date', dateFormat: 'c',defaultValue: ''},//containment
        {name:'dricstock',type: 'date', dateFormat: 'c',defaultValue: ''},//containment
        {name:'dcomstock',type: 'date', dateFormat: 'c',defaultValue: ''},//containment
        {name:'dricaltrocont',type: 'date', dateFormat: 'c',defaultValue: ''},//containment
        {name:'dcomaltrocont',type: 'date', dateFormat: 'c',defaultValue: ''},//containment
        {name:'dcausa',type: 'date', dateFormat: 'c',defaultValue: ''}, //cause analysys
        {name:'dricmatca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dcommatca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dricmanca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dcommanca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dricmacca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dcommacca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dricstrca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dcomstrca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dricmetca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dcommetca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dricproca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dcomproca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dricaltca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dcomaltca',type: 'date', dateFormat: 'c',defaultValue: ''},//corrective actions
        {name:'dricmatval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dcommatval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dricmanval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dcommanval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dricmacval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dcommacval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dricstrval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dcomstrval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dricmetval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dcommetval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dricproval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dcomproval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dricaltval',type: 'date', dateFormat: 'c',defaultValue: ''},//validation
        {name:'dcomaltval',type: 'date', dateFormat: 'c',defaultValue: ''}//validation
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/scheda/',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
})