Ext.define('fat.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'fat.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('fat.main.Main')

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
})
