import { checkData } from "./functions.js";



export const makeMap = async(target, center={lat:40.720257, lng:-73.623361}) => {
    await checkData(()=>window.google);

    let map_el = $(target);

    if (!map_el.data("map")) map_el.data({
        map: new google.maps.Map(map_el[0], {
            center,
            zoom: 12,
            disableDefaultUI: true,
            styles: mapstyles,
        }),
        infoWindow: new google.maps.InfoWindow({content:''})
    });

    return map_el;
}


export const makeMarkers = (map_el,marker_locs=[]) => {
    let {map,markers} = map_el.data();

    if (markers) markers.forEach((marker) => marker.setMap(null));

    markers = [];

    marker_locs.forEach((location)=>{
        let marker = new google.maps.Marker({
            position: location,
            map,
            icon: {
                url:location.icon,
                scaledSize: {
                    width:40,
                    height:40,
                }
            }
        });
        markers.push(marker);
    });

    map_el.data({markers});
    setTimeout(()=>setMapBounds(map_el,marker_locs), 700);
}



export const setMapBounds = (map_el,marker_locs=[]) => {
    let {map} = map_el.data();
    let zoom = 14;

    if (marker_locs.length === 1) {
        map.setCenter(marker_locs[0]);
        map.setZoom(zoom);
    } else if (marker_locs.length === 0) {
        if (window.location.protocol !== "https:") return;
        else {
            navigator.geolocation.getCurrentPosition(p=>{
                let pos = {
                    lat:p.coords.latitude,
                    lng:p.coords.longitude,
                };
                map.setCenter(pos);
                map.setZoom(zoom);
            },(...args)=>{
                console.log(args);
            },{
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0,
            });
        }
    } else {
        let bounds = new google.maps.LatLngBounds(null);
        marker_locs.forEach(l => {
            bounds.extend(l);
        });
        map.fitBounds(bounds);
    }
}




const mapstyles = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c33939"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "color": "#f0fcf7"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f0fcf7"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f0fcf7"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e2f6fe"
            },
            {
                "lightness": 17
            }
        ]
    }
];