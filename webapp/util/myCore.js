jQuery.sap.declare("util.myCore");
jQuery.sap.require("sap.ui.layout.VerticalLayout");

var    myCore = {
    	
    		initialize : function (that){
				this.oBundle = that.getResourceBundle();
				this.initializeTokenizer(that.getView());

				if (this.showTiles == null){
					this.showTiles = false;
				}
			},

			setServiceUrl : function (url){
				this.sServiceUrl = url;
			},

			getModel : function(){
				 if (!this.oModel)
				  {   this.oModel = new sap.ui.model.odata.ODataModel(this.sServiceUrl, true); }
				
				return this.oModel;
			},

			setCurrentMaster : function (oView){
				this.iCurrentMasterView = oView.getId();	
			},
			
			getCurrentMaster : function (){
				return sap.ui.getCore().byId(this.iCurrentMasterView);
			},

			setCurrentView : function (oView){
				this.iCurrentDetailView = oView.getId();	
			},
			
			getCurrentView : function (){
				return sap.ui.getCore().byId(this.iCurrentDetailView);
			},
	
			getText : function(id){
				return this.oBundle.getText(id);
			},
			
		
		getMyComponent: function(oView) {
    		"use strict";
    		var sComponentId = sap.ui.core.Component.getOwnerIdFor(oView);
    		return sap.ui.component(sComponentId);
    	 },
    	 
 		filterItems: function(items, field, operation, value){

				var filtersItems = items.filter( function (fil) { 
													switch(operation){
												       case "EQ":
												    	   return  fil[field] == value;
												    	   break;
												       case "NE":
												    	   return  fil[field] != value;
												    	   break;
													}									
									 			}); 
				return filtersItems;
			},
			
		readTable: function(oTable, keyField, keyValue){
			var oMapped = {};
						
			var i = null;
			for (i = 0; oTable.length > i; i += 1) {
					oMapped[oTable[i][keyField]] = oTable[i];

			    if (oMapped[keyValue]){
			    	return oMapped[keyValue];}
			}
			
			return false;
		},
		
		getMappedTable: function(oTable, mapField){
			var oMapped = {};
			//  Create Table Map of Keys		
			var i = null;
			for (i = 0; oTable.length > i; i += 1) {
				oMapped[oTable[i][mapField]] = oTable[i];
			}
			
			return oMapped;
		},

	
	bindingReason	        : "initial",
	oBundle			        : null,
	iCurrentDetailView      : null,
	iCurrentView	        : null,
	oModel			        : null,
	sServiceUrl		        : null
};