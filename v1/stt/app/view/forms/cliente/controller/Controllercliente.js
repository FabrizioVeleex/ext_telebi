Ext.define('stt.view.forms.budget.controller.ControllerCliente', {
  initCliente: function () {
    let me = this, vm = me.getViewModel(),
      record = vm.get('record'),
      storeAssociazione = vm.getStore('storeAssociazione'),
      readOnly = vm.get('readOnly');

    // --------------------------------------------------------------
    // Gestione cards
    this.cardCliente = Ext.create('stt.view.forms.cliente.cards.Cliente');

    if (record.data.isnew === 1) {
      // Setto in edit combo cdcli se è un nuovo record
      vm.set('cdcliReadOnly', false)
    } else {

      // abilito tasto recupera associazione
      this.toolBar.add({
        ui: 'blue',
        iconCls: 'fas fa-list-ul',
        text: Locale.t('stt.forms.cliente.btn.recupera.text'),
        handler: 'onGetListAssociazione'
      })
    }

    // --------------------------------------------------------------
    // Popolo grid associazione
    storeAssociazione.loadData(record.data['associazione'])

    // --------------------------------------------------------------
    // Se sono in modifica inserisco nuovo record vuoto
    if (!readOnly) {
      storeAssociazione.add(Ext.create('stt.view.forms.cliente.components.gridassociazione.Model', {
        cdcli: '', action: 1, isnew: 1, id: me.randomString(32),
      }));
    }

    // --------------------------------------------------------------
    // Creo la grid autorizzazioni
    this.gridAssociazione = Ext.create('stt.view.forms.cliente.components.gridassociazione.Grid')
    this.associazione = Ext.create('Ext.form.FieldSet', {
      collapsible: false, collapsed: false, border: false,
      title: '<span style="color: black;font-weight: bold">' + Locale.t('stt.forms.cliente.associazione.title') + '</span>',
      items: [this.gridAssociazione]
    })
    this.cardCliente.add(this.associazione);

    this.form.add(this.cardCliente);
  },


  onAfterRenderClienti: function () {
    this.logDev('avvio il caricamento clienti....')
  },

  // ----------------------------------------------------------
  // Gestione combo from
  onSelectComboSogg: function (combo, rec) {
    let me = this,
      vm = this.getViewModel(),
      store = vm.getStore('storeAssociazione');

    vm.set('record.ragsoc', rec.data.ragsoc);
    if (rec.data.oldcdcli !== '') {
      // propongo messaggio inserimento lista cdcli old

      Ext.Msg.show({
        iconCls: 'x-fas fa-plus-circle bd-color-green',
        title: Locale.t('stt.global.popola.title') + '?',
        msg: Locale.t('stt.global.popola.msg') + '</b><hr/> ' + rec.data.oldcdcli,
        buttons: Ext.Msg.YESNO,
        buttonText: {
          yes: Locale.t('stt.global.popola.yes'),
          no: Locale.t('stt.global.popola.no')
        },
        fn: function (btn) {
          if (btn === 'yes') {
            // popolo grid associazione
            let list = rec.data.oldcdcli.split(' ');
            // verifico presenza codice
            let check = store.data.items.filter(function (el) {
              return el.data.cdcli === list[x]
            })

            if (check.length === 0) {
              for (let x = 0; x < list.length; x++) {
                store.insert(0, Ext.create("stt.view.forms.cliente.components.gridassociazione.Model", {
                  action: 1,
                  isnew: 1,
                  delrow: true,
                  cdcli: list[x],
                  id: me.randomString(32),
                }))
              }
            }

          }
        }
      });
    }

  },
  onChangeComboSogg: function (combo, newValue, oldValue) {
    if (newValue) {
      this.getViewModel().set('title', newValue)
    } else {
      this.getViewModel().set('title', Locale.t('stt.global.new'))
    }

    // Svuoto ragsoc se rimosso valore
    if (newValue === null) {
      this.getViewModel().set('record.ragsoc', '');
    }
  },


  // ----------------------------------------------------------
  // Gestione popolamento 
  onBeforeLoadComboSogg: function (store) {
    this.logDev('avvio il caricamento clienti....')
    if (store.isLoading()) return false;
  },
  onSelectComboGridAssociazione: function (combo, newValue) {
    let me = this,
      lastrecord = this.gridAssociazione.getStore().last(),
      row = this.gridAssociazione.getSelectionModel().getSelection()[0];
    this.gridAssociazione.getView().refreshNode(row);
    if (lastrecord === row) {
      this.gridAssociazione.getStore().add(
        Ext.create("stt.view.forms.cliente.components.gridassociazione.Model", {
          action: 1,
          isnew: 1,
          delrow: true,
          id: me.randomString(32),
        })
      );
    }
  },

  onBlurComboGridAssociazione: function (combo) {
    if (combo.value && combo.value.length === 6) {
      let me = this,
        lastrecord = this.gridAssociazione.getStore().last(),
        row = this.gridAssociazione.getSelectionModel().getSelection()[0];
      this.gridAssociazione.getView().refreshNode(row);
      if (lastrecord === row) {
        this.gridAssociazione.getStore().add(
          Ext.create("stt.view.forms.cliente.components.gridassociazione.Model", {
            action: 1,
            isnew: 1,
            delrow: true,
            id: me.randomString(32),
          })
        );
      }
    }
  },

  // recupero lista codici associati
  onGetListAssociazione: function () {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore('storeAssociazione'),
      cdcli = vm.get('record.cdcli');

    Ext.Ajax.request({
      method: "GET",
      url: Backend.REST_API + "forms/cliente/getBtnAssociazione/?cdcli=" + cdcli,
      success: function (response) {
        // popolo grid associazione
        let resp = Ext.decode(response.responseText),
          list = resp.data.oldcdcli.split(' '),
          tot = 0;
        if (list.length === 0) {
          Ext.Msg.show({
            title: Locale.t('stt.forms.cliente.title'),
            msg: Locale.t('stt.forms.cliente.btn.recupera.empty'),
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
          });
          return
        }
        for (let x = 0; x < list.length; x++) {
          // verifico presenza codice
          let check = store.data.items.filter(function (el) {
            return el.data.cdcli === list[x]
          })

          if (check.length === 0) {
            tot++;
            store.insert(store.data.items.length - 1, Ext.create("stt.view.forms.cliente.components.gridassociazione.Model", {
              action: 1,
              isnew: 1,
              delrow: true,
              cdcli: list[x],
              id: me.randomString(32),
            }))
          }
          if (tot === 0) {
            Ext.Msg.show({
              title: Locale.t('stt.forms.cliente.title'),
              msg: Locale.t('stt.forms.cliente.btn.recupera.presenti'),
              buttons: Ext.Msg.OK,
              icon: Ext.MessageBox.INFO
            });
          }
        }
      },
      failure: function () {
        me.getView().el.unmask();
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          message: Locale.t('stt.forms.cliente.btn.recupera.error'),
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR,
        });
      },
    });
  }
})