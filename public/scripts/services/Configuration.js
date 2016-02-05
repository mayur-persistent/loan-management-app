var Configuration = function () {
    var location = window.location;
    this.ENV = 'FORBIDDEN';
    this.siteUrl = 'https://loan-management-app-bluemix-demo.mybluemix.net';
    
    this.modelConfig = {
    	'model1' : {
    		'no_of_layers' : 3
    	},
    	'model2' : {
    		'no_of_layers' : 3
    	},
    	'model3' : {
    		'no_of_layers' : 4
    	}
    	};
    this.analysisModel = 'model3';
    
    this.colorByCat =new Array();
    this.colorByCat["default"] = '#43cdef';
    this.colorByCat["Demographic"] = '#41a34c';
    this.colorByCat["Interaction"] = '#3d3838';
    this.colorByCat["Purchase"] = '#914e72';


	
    if (location.hostname.match('localhost(:[0-9]{1,5})?.*') || location.protocol === 'file:') {
        // Localhost JS mocks are used. Run 'index.html' on local web-server. No REST service calls at all.
        // (Logi: "User: dummy@account.net", "Password: Test123!")
        this.ENV = 'DEV';
    }else if (location.hostname.match('dev.isbanking.eu$')) {
        // integration System.
        this.ENV = 'TEST'; 
		this.siteUrl = '';		
    }
 };
