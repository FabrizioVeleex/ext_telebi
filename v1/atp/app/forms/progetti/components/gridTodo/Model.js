Ext.define('atp.app.forms.progetti.components.gridTodo.Model', {
  // extend: 'Ext.model.tree.Base',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'activityType', type: 'string' },
    { name: 'expireDate', type: 'date', dateFormat: "c", },
    { name: 'priority', type: 'number' },
    { name: 'progress', type: 'number' },
    { name: 'completed', type: 'boolean' }
  ],

  // getColumns: function () {
  //   debugger
  //   var columns = this.callParent();
  //   columns.push({
  //     text: ' ',
  //     dataIndex: 'activityType'
  //   });

  //   return columns;
  // }
});