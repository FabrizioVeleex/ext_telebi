Ext.define('bolpas.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'bolpas.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('bolpas.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
})
