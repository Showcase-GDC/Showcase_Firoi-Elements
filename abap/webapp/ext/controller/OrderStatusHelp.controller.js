sap.ui.define("abap.ext.controller.OrderStatusHelp", [], function() {
    return {
        onBeforeRebindTableExtension: function(oEvent) {
            var oBindingParams = oEvent.getParameter("bindingParams");
            oBindingParams.parameters = oBindingParams.parameters || {};
                            
            var oSmartTable = oEvent.getSource();
            var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            var vCategory;
            if (oSmartFilterBar instanceof sap.ui.comp.smartfilterbar.SmartFilterBar) {
                //Custom filter
                var oCustomControl = oSmartFilterBar.getControlByKey("StatusHelp");
                if (oCustomControl instanceof sap.m.MultiComboBox) {
                    vCategory = oCustomControl.getSelectedKeys();
                    for(var i=0;i<vCategory.length;i++){
                        switch (vCategory[i]) {
                            // case "0":
                            //     break;
                            case "1":
                                oBindingParams.filters.push(new sap.ui.model.Filter("statusNo", "EQ", "NEW"));
                                break;
                            case "2":
                                oBindingParams.filters.push(new sap.ui.model.Filter("statusNo", "EQ", "REPAIRED"));
                                break;
                            case "3":
                                oBindingParams.filters.push(new sap.ui.model.Filter("statusNo", "EQ", "CLOSED"));
                                break;
                            case "4":
                                oBindingParams.filters.push(new sap.ui.model.Filter("statusNo", "EQ", "DELETED"));
                                break;
                            default:
                                break;
                        }

                    }

                }
            }
        }

        
    }
  })