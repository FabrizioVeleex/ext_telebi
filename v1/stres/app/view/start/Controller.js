Ext.define('stres.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'stres.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('stres.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
