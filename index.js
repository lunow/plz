#!/usr/bin/env node

/* global require, console */
var app = require('commander');
var geocoder = require('node-geocoder')('google', 'http', {});
var colors = require('colors');


console.log('');
app
	.version('1.0.0')
	.action(function() {
		var input = [];
		app.args.forEach(function(arg) {
			if(typeof arg == 'string') {
				input.push(arg);
			}
		});
		console.log('searching', input.join(' ').blue, '...');
		geocoder.geocode(input.join(' '), function(err, res) {
			console.log('');
			if(err) {
				console.log('FAILED. Sorry.'.bold.red, err);
			}
			else if(res.length > 0) {
				console.log(String(res.length+' Result'+(res.length > 1 ? 's' : '')).underline);
				var output = [];
				res.forEach(function(adr) {
					output.push(String(String(adr.zipcode).bold+' '+adr.city+' '+String(adr.formattedAddress).gray));
				});
				output.sort();
				output.forEach(function(l) {
					console.log(l);
				});
			}
			else {
				console.log('nothing found'.underline.red);
			}

			console.log('');
			console.log('');
		});

	})
	.parse(process.argv);