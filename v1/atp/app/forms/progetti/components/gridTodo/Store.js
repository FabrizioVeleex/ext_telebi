/**
 * Created by fabrizio on 10/02/2022.
 */
Ext.define("atp.forms.progetti.components.gridTodo.Store", {
  extend: "Ext.data.TreeStore",
  alias: "store.v1-atp-forms-progetti-components-storeTodo",
  fields: [
    { name: "id", type: 'string' },
    { name: "title", type: 'string', editable: true, defaultValue: "" },
    { name: "description", type: 'string', editable: true, defaultValue: "" },
    { name: "activityType", type: 'string', editable: true, defaultValue: "" },
    { name: "priority", type: 'number', editable: true, defaultValue: 0 },
    { name: "status", type: 'number', editable: true, defaultValue: 0 },
    { name: "expireDate", type: 'date', dateFormat: "c", editable: true, defaultValue: new Date() },
    { name: "progress", type: 'number', editable: true, defaultValue: 0 },
    { name: "completed", type: 'boolean', editable: true },
    { name: "isnew", type: 'number' },
    { name: "action", type: 'number' },
  ],

  data: [],
  // root: {
  //   text: "prova",
  //   children: [
  //     {
  //       descrizione: "aaa",
  //       activityType: "prova"
  //     }
  //   ]
  // }
});