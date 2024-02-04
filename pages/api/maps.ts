import { LatLng, createClient } from '@google/maps';

const googleMapsClient = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY as string,
});

export default async function handler(req: any, res: any) {
    const { address, types } = req.query;
  
    // Geocode the address
    const location: LatLng = await new Promise((resolve, reject) => {
            googleMapsClient.geocode({ address }, (err, response) => {
                if (err) reject(err);
                else resolve(response.json.results[0].geometry.location);
            });
        });

    // Find places around the location
    const placesResponse: any = await new Promise((resolve, reject) => {
        googleMapsClient.placesNearby({
            location,
            radius: 2000, // Start with a large radius
            type: types, // Filter by type
        }, (err, response) => {
            if (err) reject(err);
            else resolve(response);
        });
    })

    const places = placesResponse.json.results;
  
    // Calculate the walking time for each place
    const walkingTimes = await Promise.all(
        places.map((place: { geometry: { location: LatLng; }; }) =>
          new Promise((resolve, reject) => {
            googleMapsClient.distanceMatrix(
              {
                origins: [location],
                destinations: [place.geometry.location],
                mode: 'walking',
              },
              (err, response) => {
                if (err) reject(err);
                else resolve(response.json.rows[0].elements[0].duration.value);
              }
            );
          })
        )
      );
  
    // Filter the places based on the walking time
    const placesWithin15Min = places.filter(
        (_place: any, i: number) => walkingTimes[i] <= 15 * 60
    );
  
    res.json(placesWithin15Min);
  }