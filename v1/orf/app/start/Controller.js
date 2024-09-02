Ext.define('orf.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'orf.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('orf.main.Main')

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
})
