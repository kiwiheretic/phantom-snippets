var port, server, service,
    system = require('system'),
	fs = require('fs'),
	page = require('webpage').create(),
	utils = require('./util-fns');

if (system.args.length !== 2) {
    console.log('Usage: rewriteless-proxyserver.js <[ipaddress:]portnumber>');
    phantom.exit(1);
} else {
    port = system.args[1];
    server = require('webserver').create();
	page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36';
    service = server.listen(port, function (request, response) {

        console.log('Request at ' + new Date());
        console.log(JSON.stringify(request, null, 4));
		
        response.statusCode = 200;
        response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		
		var subURI = utils.getSubURI(request.url);
		// check if fn_[subURI] exists as a function then call italics
		if(typeof this["fn_"+subURI] == "function") {
			console.log('calling fn_'+subURI);
		  this["fn_"+subURI](request, response); //it exists, call it
		} else {
			standard_response(request, response);
		}
    });

    if (service) {
        console.log('Web Proxy server running on port ' + port);
    } else {
        console.log('Error: Could not create web proxy server listening on port ' + port);
        phantom.exit();
    }
}


function standard_response(request, response) {
	response.write('<html>');
	response.write('<head>');
	response.write('<title>My Proxy!</title>');
	response.write('</head>');
	response.write('<body>');
	response.write('<p>This is from PhantomJS web server.</p>');
	response.write('<p>url param = ' + utils.getURLParameter(request.url, 'url') + '</p>');
	response.write('<p>subURI param = ' + utils.getSubURI(request.url) + '</p>');
	response.write('<p>Request data:</p>');
	response.write('<pre>');
	response.write(JSON.stringify(request, null, 4));
	response.write('</pre>');
	response.write('</body>');
	response.write('</html>');
	response.close();
	
	
}

function fn_png(request, response) {
	console.log('fn_png ' + request.url);
	var url = utils.getURLParameter(request.url, 'url');
	console.log('fn_png, url = '+url);
	page.open(url, function(status) {
	  console.log("Status: " + status);
	  if(status === "success") {
		var image_filename = 'rendered_page.png';
		page.render(image_filename);
		response.headers = {"Content-Type":"application/json"}
		response.statusCode = 200;
		var image_meta = {filename: image_filename};
		
		response.write(JSON.stringify(image_meta, null, 4));
		response.close();			
	  }
	});	
	
}

function fn_html(request, response) {
	var url = utils.getURLParameter(request.url, 'url');
	page.open(url, function(status) {
	  console.log("Status: " + status);
	  if(status === "success") {
		response.headers = {"Content-Type":"text/html",
					"Content-Length":page.content.length};
		response.statusCode = 200;
		response.write(page.content);
		response.close();			
	  }
	});	
	
}

function fn_random(request, response) {
	var json_data = {'random':utils.randomString(10)};
	response.headers = {"Content-Type":"application/json"};
	response.statusCode = 200;
	response.write(JSON.stringify(json_data, null, 4));
	response.close();
	
}