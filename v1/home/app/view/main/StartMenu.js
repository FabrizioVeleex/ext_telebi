/**
 * Created by fabrizio on 09/08/16.
 */
Ext.define('home.view.main.StartMenu', {
    extend: 'Ext.menu.Menu',
    baseCls: "x-panel",
    cls: "x-menu ux-start-menu",
    bodyCls: "ux-start-menu-body",
    defaultAlign: "bl-tl",
    iconCls: "user",
    bodyBorder: true,
    width: 300,
    initComponent: function () {
        let a = this;
        a.layout.align = "stretch";
        a.items = a.menu;
        a.toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            dock: "right",
            cls: "ux-start-menu-toolbar",
            vertical: true,
            width: 100,
            layout: {align: "stretch"}
        }, a.toolConfig));
        //a.addDocked(a.toolbar);
        //delete a.toolItems
        this.callParent(arguments);
    },
    addMenuItem: function () {
        let a = this.menu;
        a.add.apply(a, arguments)
    },
    addToolItem: function () {
        let a = this.toolbar;
        a.add.apply(a, arguments)
    }

});