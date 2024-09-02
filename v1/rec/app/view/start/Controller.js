Ext.define('rec.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'rec.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('rec.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
