// $(document).ready(function(){
// 	initMap();
// })

// console.log("sanity check");
console.log(cities);
// initMap is essentially our docuemnt.ready
function initMap(){
	console.log('map loaded');
	// geographic center of the US
	myLatlng = {
		lat: 40.0000,
		lng: -98.0000
	};
	// Init the map to load at geoCenter, zoom 4
	var map = new google.maps.Map(document.getElementById('map'),
		{
			zoom: 4,
			center: myLatlng
		}
	);
	// markers array
	var markers = [];
	// global infoWindow for everyone to share
	var infoWindow = new google.maps.InfoWindow({});
	// loop through the cities array which is in cities.js
	var listHTML = '';
	cities.map((city)=>{
		createMarker(city);
		listHTML += addCityToList(city);
	});
	$('#cities-table tbody').html(listHTML);

	// Add submit listener to the form
	$('#filter-form').submit(function(event){
		// wipe out all the markers
		markers.map((marker)=>{
			marker.setMap(null);
		});


		event.preventDefault();
		// user submitted the input box
		// console.log("User submission!");
		var userSearch = $('#filter-input').val().toLowerCase();
		listHTML = '';
		cities.map((city)=>{
			var cityName = city.city.toLowerCase();
			if(cityName.indexOf(userSearch) > -1){
				// The city we are on, contains the search text the user entered
				createMarker(city);
				listHTML += addCityToList(city);
			}
		});
		$('#cities-table tbody').html(listHTML);

	});

	function addCityToList(city){
		var newHTML = '<tr>';
			newHTML += `<td class="city-name">${city.city}</td>`; 
			newHTML += `<td class="city-state">${city.state}</td>`;
			newHTML += `<td class="city-directions"><button class="btn btn-primary">Get Directions</button></td>`;
			newHTML += `<td class="city-zoom"><button class="btn btn-success">Zoom to city</button></td>`;
		newHTML += '</tr>'
		return newHTML;			
	}

	function createMarker(city){
		// console.log(city);
		// set up an object with this cities lat/lon
		var cityLL = {
			lat: city.lat,
			lng: city.lon
		}
		// set up a marker for current city
		var marker = new google.maps.Marker({
			// WHERE
			position: cityLL,
			map: map,
			title: city.city
		});
		// add a click listener to THIS marker
		// addListener takes 3 args:
		// 1. What
		// 2. Event
		// 3. Code to run...
		google.maps.event.addListener(marker, 'click',()=>{
			// all infoWindows (becuase they are constructors), have a setContent
			// method which is like .html("blah blah blah")
			var infoWindowHTML = `<h2>${city.city}</h2>`
			infoWindowHTML += `<h4>City population: ${city.yearEstimate}</h4>`
			infoWindowHTML += '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Wonder_Woman_%28DC_Rebirth%29.jpg/170px-Wonder_Woman_%28DC_Rebirth%29.jpg">';
			infoWindow.setContent(infoWindowHTML);
			// open takes 2 args:
			// 1. Map to open the infoWindow on
			// 2. Where to put the infoWindow on teh map
			infoWindow.open(map, marker);
		})
		markers.push(marker);
	}

};


