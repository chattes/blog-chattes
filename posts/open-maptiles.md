---
title: Offline Map Server
date: November 27 2021
excerpt: Setting Up an Offline Map Server using Geofabrik
coverImage: "/images/posts/img1.jpg"
tags: openmaptiles, nodejs
---

#### OpenMapTiles

Download maps from [openmaptiles](https://openmaptiles.com/). We setup the mapserver using Docker as given in the Docs.

#### POI Data

We need to setup a POI server where we can query for the neighbourhood attractions and get a response.

We will load all the POI data as GeoJSON data into MongoDb. MongoDB has built geojson queries which we will be using.

Download Data

We will download all the openstreet map data from [Geofabrik](http://download.geofabrik.de/)

#### Extracting Data

We need to extract the POI data from the File downloaded. We need to use a tool called [Osmosis](https://wiki.openstreetmap.org/wiki/Osmosis) for this.

The command to extract the data looks like so

```
var query = {
    $and: [
      {
        geometry: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [options.lat, options.lng]
            },
            $maxDistance: 2000,
            $minDistance: 0
          }
        }
      },
      {
        "properties.other_tags": { $regex: "historic" }
      }
    ]
  };
```

The POI data extracted has a wikidata id and wikipedia link within them. We will use that to enrich the POI with Wikipedia Extracts and Images

We can query the [Wikipedia Rest API](https://en.wikipedia.org/api/rest_v1/#!)
