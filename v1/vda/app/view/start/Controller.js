Ext.define('vda.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'vda.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('vda.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
