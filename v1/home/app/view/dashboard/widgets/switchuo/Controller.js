/**
 * Created by fabrizio on 21/07/21.
 */
Ext.define('home.view.dashboard.widgets.switchuo.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.v11-switchuo',
  requires: [
    'Ext.data.Store',
    'Ext.form.ComboBox',
    'Ext.layout.container.HBox',
    'Ext.panel.Panel',
  ],
  onAfterRender: function () {
    let me = this,
      profilo = this.getView().profilo;

    if (Ext.global.Vars.infoUser.img !== '') {
      Ext.Ajax.request({
        url: Backend.REST_WIDGET_SWITCHUO + 'getImages/' + Ext.global.Vars.infoUser.id + Ext.global.Vars.infoUser.img,
        method: 'GET',
        binary: true,
        success: function (response, o) {
          let headers = response.getAllResponseHeaders()
          let blob = new Blob([response.responseBytes], { type: headers['content-type'] }),
            url = window.URL.createObjectURL(blob)
          me.getView().down('#imgUser').setSrc(url);
        },
        failure: function () {

        }
      })
    }

    let panelUser = Ext.create('Ext.panel.Panel', {
      bodyPadding: 5,
      flex: 1,
      bodyStyle: {
        'background-color': 'transparent'
      },
      html: Ext.global.Vars.infoUser.titolo + ' ' + Ext.global.Vars.infoUser.cognome + ' ' + Ext.global.Vars.infoUser.nome + '<br>' + Ext.global.Vars.infoUser.uo.nome
    });
    this.getView().add(panelUser);


    if (Ext.global.Vars.infoUser.listUo.length > 1) {
      let store = Ext.create('Ext.data.Store', {
        fields: ['id', 'uo'],
        data: Ext.global.Vars.infoUser.listUo
      });

      let combo = Ext.create('Ext.form.ComboBox', {
        labelAlign: 'right',
        labelWidth: Ext.global.Vars.infoUser.theme === 'big' ? 130 : 100,
        fieldLabel: Locale.t('home.impostazioni.titles.switchuo'),
        store: store,
        queryMode: 'local',
        editable: false,
        forceSelection: true,
        displayField: 'uo',
        valueField: 'id',
        value: Ext.global.Vars.infoUser.uo.id,
        listeners: {
          select: 'runSelectUo'
        }
      });

      let panelSwitch = Ext.create('Ext.panel.Panel', {
        flex: 1,
        minWidth: 400,
        layout: {
          type: 'hbox',
          pack: 'end'
        },
        bodyStyle: {
          'background-color': 'transparent',
          'padding-left': '3px'
        },
        items: [
          combo
        ]
      });
      this.getView().add(panelSwitch);
    }

    /* ------------------------------
     * GESTIONE TRADUZIONE SITO
     * ------------------------------*/

    if (LOCALE.json[LOCALE.default].translation.infoStart.language === true) {
      let storeLn = Ext.create('Ext.data.Store', {
        fields: ['label', 'id'],
        data: listLanguage
      });
      let comboLn = Ext.create('Ext.form.ComboBox', {
        store: storeLn,
        width: 160,
        queryMode: 'local',
        labelWidth: Ext.global.Vars.infoUser.theme === 'big' ? 90 : 70,
        labelAlign: 'right',
        fieldLabel: Locale.t('home.impostazioni.titles.switchlanguage'),
        forceSelection: true, editable: false,
        value: LOCALE.default,
        listConfig: {
          getInnerTpl: function (displayField) {
            return '<img alt="" src="/images/language/{id}-icon.png" class="icon"/> {' + displayField + '}';
          }
        },
        displayField: 'label',
        valueField: 'id',
        listeners: {
          select: 'runSelectLn'
        }
      });

      let panelSwitchLn = Ext.create('Ext.panel.Panel', {
        // flex: 1,
        width: 160,
        minWidth: 160,
        layout: {
          type: 'hbox',
          pack: 'end'
        },
        bodyStyle: {
          'background-color': 'transparent',
          'padding-left': '3px'
        },
        items: [
          { xtype: 'component', html: 'Lingua' },
          comboLn
        ]
      });
      this.getView().add(panelSwitchLn);
    }


    /* ------------------------------
     * GESTIONE THEME
     * ------------------------------*/
    if (LOCALE.json[LOCALE.default].translation.infoStart.changeSize === true) {
      let storeTheme = Ext.create('Ext.data.Store', {
        fields: ['label', 'id', 'cls'],
        data: [
          { id: 'default', label: 'Default', cls: 'app-default' },
          { id: 'medium', label: 'Medium', cls: 'app-medium' },
          { id: 'big', label: 'Big', cls: 'app-big' }
        ]
      });

      let comboTheme = Ext.create('Ext.form.ComboBox', {
        store: storeTheme,
        width: Ext.global.Vars.infoUser.theme === 'big' ? 240 : 200,
        queryMode: 'local',
        forceSelection: true,
        labelWidth: 80,
        labelAlign: 'right',
        fieldLabel: Locale.t('home.impostazioni.titles.switchtheme'),
        editable: false,
        value: Ext.global.Vars.infoUser.theme,
        displayField: 'label',
        valueField: 'id',
        listConfig: {
          getInnerTpl: function (displayField) {
            return ' <div class="{cls}">{' + displayField + '}</div>';
          }
        },
        listeners: {
          select: 'runSelectTheme'
        }
      });
      let panelSwitchTheme = Ext.create('Ext.panel.Panel', {
        // flex: 1,
        width: 200,
        minWidth: 200,
        layout: {
          type: 'hbox',
          pack: 'end'
        },
        bodyStyle: {
          'background-color': 'transparent',
          'padding-left': '3px'
        },
        items: [
          comboTheme
        ]
      });
      this.getView().add(panelSwitchTheme);
    }

  },
  runSelectTheme: function (combo, record) {
    Ext.Ajax.request({
      url: Backend.REST_WIDGET_SWITCHUO + 'settheme/' + record.data.id,
      method: 'GET',
      success: function (response, o) {
        window.localStorage.setItem('theme', record.data.id);
        window.location = window.location.origin + '/app/v1/index.html?theme=' + record.data.id + '&t=' + Ext.global.Vars.infoUser.token
      },
      failure: function () {
        window.localStorage.setItem('theme', record.data.id);
        window.location = window.location.origin + '/app/v1/index.html?theme=' + record.data.id + '&t=' + Ext.global.Vars.infoUser.token
      }
    })
  },

  runSelectLn: function (combo, record) {
    let dateCookie = new Date();
    dateCookie.setTime(dateCookie.getTime() + (3600 * 40000));

    document.cookie = '_ln=;path=/; domain=.' + window.location.hostname + '; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    document.cookie = 'i18next=;path=/; domain=.' + window.location.hostname + '; expires=Thu, 01-Jan-70 00:00:01 GMT;';

    document.cookie = '_ln=' + record.data.id + '; path=/; domain=.' + window.location.hostname + ';expires=' + dateCookie + ';';
    document.cookie = 'i18next=' + record.data.id + '; path=/; domain=.' + window.location.hostname + ';expires=' + dateCookie + ';';

    Ext.Ajax.request({
      url: Backend.REST_WIDGET_SWITCHUO + 'setlanguage/' + record.data.id,
      method: 'GET',
      success: function (response, o) {
        window.location = window.location.origin + '/app/v1/index.html'
      },
      failure: function () {
        window.location = window.location.origin + '/app/v1/index.html'
      }
    })
  },

  runSelectUo: function (combo, record) {
    Ext.Msg.show({
      minWidth: 380,
      iconCls: 'icon-switch',
      title: Locale.t('widgerswitchuo.title'),
      icon: Ext.MessageBox.WARNING,
      buttons: Ext.Msg.YESNO,
      modal: true,
      msg: Locale.t('widgerswitchuo.switch.msgconfirm') + record.data.uo,
      fn: function (z) {
        if (z === 'yes') {
          Ext.Ajax.request({
            method: 'GET',
            url: Backend.REST_WIDGET_SWITCHUO + 'switchuo/' + record.data.padre,
            success: function (response) {
              let rest = Ext.decode(response.responseText);
              location.reload();
            },
            failure: function () {
              Ext.Msg.show({
                title: Locale.t('global.errore'),
                msg: 'Error!',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
              });

            }
          })
        } else {
          combo.setValue('');
        }
      }
    });
  }
});
