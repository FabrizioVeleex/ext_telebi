Ext.define('ord.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'ord.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('ord.main.Main')

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
})
