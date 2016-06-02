sap.ui.define([
		"zsfmike/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("zsfmike.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);