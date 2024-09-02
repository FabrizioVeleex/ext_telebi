/**
 * Created by fabrizio on 05/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridArticoli.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "cd_sogg_fat", type: "string" },
    { name: "rag_soc", type: "string" },
  ],
  data: [],
});
