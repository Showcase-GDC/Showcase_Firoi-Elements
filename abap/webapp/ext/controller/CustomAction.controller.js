sap.ui.define("abap.ext.controller.CustomAction", [], function() {
    return {    
        // beforeSaveExtension: function() {
        //     var oView = this.getView();
        //     var sDateTimeFrom = oView.byId("test_id").getValue();
		// 	if (!sDateTimeFrom) {
		// 		sap.m.MessageBox.error("input date!!!!!");
		// 	}
        // },
        // onBeforeRebindTableExtension: function(oEvent) {
        //     var oView = this.getView();
        //     var oModel = oView.getModel();
        //     oModel.setRefreshAfterChange(true);
        // },
        onClose : function() { 
			var oView = this.getView();
			var oDialog = oView.byId("CloseConfirm");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "abap.ext.fragment.CustomAction", this);
				oView.addDependent(oDialog);
				oDialog.open();
			} else {
				oDialog.open();
			}            
         },
        onCancel : function(){
            this.getView().byId("CloseConfirm").close();
        },
        onSave : function(oEvent){
            let sMessageSuccess = "Change successful."
            let oData = oEvent.getSource().getBindingContext().getObject();
            var oView = this.getView();
            var oFeedBackRate = oView.byId("feedBack").getValue();
			var sFeedBackRate = oFeedBackRate.toString();
            let aData = {
                "orderNo"  : oData.orderNo,
                "statusNo" : "CLOSED",
                "feedBack" : sFeedBackRate,
                "action"  : "CLOSE"
            }
		
		this.updateCustomAction(aData,sMessageSuccess); 
        },
        updateCustomAction : function(aData,aMsgSuccess){
		
            let oModel = this.getView().getModel();
            this.getView().setBusy(true);
            oModel.update("/ENTITY001Set(orderNo='" + aData.orderNo + "')" ,aData,{
                    merge: "",
                    success: function() {
                        sap.m.MessageToast.show(aMsgSuccess,{
                            animationDuration:6000
                        });
                    },
                    error: function (error) {
                        // var oBody = error.response.body;
                        // oBody = JSON.parse(oBody);
                        // var sMessage = oBody.error.message.value;
                        // sap.m.MessageBox.error(error);
                    }
            });
            
            oModel.refresh(true,true);
            this.getView().setBusy(false);	
            this.getView().byId("CloseConfirm").close();

        }

    }
  })