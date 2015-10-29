var port, server, service,
    system = require('system'),
	utils = require('./util-fns');

if (system.args.length !== 2) {
    console.log('Usage: simpleserver.js <portnumber>');
    phantom.exit(1);
} else {
    port = system.args[1];
    server = require('webserver').create();

    service = server.listen("127.0.0.1:"+port, function (request, response) {

        console.log('Request at ' + new Date());
        console.log(JSON.stringify(request, null, 4));
		
        response.statusCode = 200;
        response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
        response.write('<html>');
        response.write('<head>');
        response.write('<title>Hello, world!</title>');
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
    });

    if (service) {
        console.log('Web Proxy server running on port ' + port);
    } else {
        console.log('Error: Could not create web proxy server listening on port ' + port);
        phantom.exit();
    }
}


