Ext.define('eve.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'eve.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('eve.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
