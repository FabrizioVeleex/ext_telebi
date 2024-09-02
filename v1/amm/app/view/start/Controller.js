Ext.define('amm.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'amm.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('amm.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
})
