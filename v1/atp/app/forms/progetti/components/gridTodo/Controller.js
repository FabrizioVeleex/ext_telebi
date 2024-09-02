Ext.define('atp.app.forms.progetti.components.gridTodo.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.treepaneltodo',

  onAfterRender: function (panel) {
    debugger
    // let me = this, vm = me.getViewModel(), store = vm.getStore('storeTodo')
    // panel.setRootNode({
    //   children: store.data.items
    // })
    // panel.getRootNode()
    let node = this.getView().getRootNode()

    for (const children of node.data.children) {
      if (children.title !== " ") {
        let newChildren = {
          xtype: "actioncolumn",
          iconCls: "x-fas fa-plus bd-color-blue",
          dataIndex: "newTodo",
          handler: "onNewTodo",
          width: 30,
          align: "center",
          emptyText: ""
        }
        node.appendChild(newChildren)
        this.getView().setRootNode(node)
        this.getView().getRootNode()
      }
    }
  },

  onNewTodo: function (tree) {
    debugger
  }

  // onEditTreeGrid: function (editor, context) {
  // Aggiorna la vista dopo l'editing
  // context.grid.getView().refresh();
  // let rootNode = context.grid.getRootNode(),
  //   children = context.record.data
  // if (children.children.length === 0) {
  //   if (children.title !== " ") {
  // let newChildren = {
  //   title: " ",
  //   progress: 0,
  //   completed: false,
  //   expireDate: new Date(),
  //   priority: 6
  // }
  //   }

  // rootNode.appendChild(newChildren)
  // context.grid.setRootNode(rootNode)
  //   }
  // },
  // onBeforeActivate: function (cmp) {
  //   debugger
  // }

});