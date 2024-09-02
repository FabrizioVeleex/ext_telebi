/**
 * Created by fabrizio on 10/02/2022.
 */
Ext.define("atp.forms.progetti.components.gridSottoAttivita.Store", {
  extend: "Ext.data.Store",
  alias: "store.v1-atp-forms-progetti-components-storeSottoAttivita",
  fields: [
    { name: "id", type: 'string' },
    { name: "title", type: 'string', editable: true, defaultValue: null },
    { name: "description", type: 'string', editable: true },
    { name: "activityType", type: 'string', editable: true },
    { name: "priority", type: 'number', editable: true, defaultValue: null },
    { name: "status", type: 'number', editable: true, defaultValue: null },
    { name: "expireDate", type: 'date', dateFormat: "c", editable: true, defaultValue: null },
    { name: "progress", type: 'number', editable: true, defaultValue: null },
    { name: "completed", type: 'boolean', editable: true, defaultValue: null },
    { name: "isnew", type: 'number' },
    { name: "action", type: 'number' },
  ],
  data: [],
});