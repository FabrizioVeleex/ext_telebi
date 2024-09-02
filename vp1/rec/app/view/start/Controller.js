Ext.define("recpub.view.start.Controller", {
  extend: "portal.v1.public.start.Controller",
  alias: "controller.start",
  requires: ["recpub.view.main.Main", "Ext.direct.Manager", "Ext.direct.PollingProvider"],

  findGetParameter: function (parameterName) {
    let result = null;
    let items = location.search.substring(1).split("&");

    if (items.length === 1) {
      let tmp = items[0].split("=");
      if (tmp[0] === parameterName) {
        result = decodeURIComponent(tmp[1]);
      }
    }
    return result;
  },

  pingLogin: function () {
    let me = this;
    me.polling = {
      data: "",
      checkfirstpolling: 0,
      post: function (a) {
        if (a.data.response === false) {
          me.pollingFn.disconnect();
        }
      },
      exception: function (a, b) {
        me.pollingFn.disconnect();
      },
    };

    this.pollingFn = new Ext.direct.PollingProvider({
      id: "polling",
      type: "polling",
      url: Backend.REST_API + "polling/",
      timeout: 3500,
      interval: 35000,
    });

    Ext.Direct.addProvider(this.pollingFn);
    Ext.Direct.on("event", this.polling.post, this);
    Ext.Direct.on("exception", this.polling.exception, this);
  },
  startApplication: function () {
    let token = this.findGetParameter("token");
    if (token && token.length === 32) {
      Ext.Ajax.setDefaultHeaders({
        token: token,
        ln: LOCALE.default,
        v: "v1",
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    }

    this.mainPanel = Ext.create("recpub.view.main.Main");
    this.getView().add(this.mainPanel);
    this.getView().setActiveItem(this.mainPanel);

    this.pingLogin();

    //recupero info nazione e regione
    Ext.Ajax.request({
      url: Backend.REST_API + "forms/dettaglio/getregion/",
      method: "GET",
      success: function (record) {
        let rec = Ext.decode(record.responseText);
        Ext.global.Vars.region = rec.region;
        Ext.global.Vars.naz = "IT"; //TODO solo ITA
      },
      failure: function () {},
    });
  },
});
