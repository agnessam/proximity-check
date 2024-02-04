import { LatLng, createClient } from '@google/maps';

const googleMapsClient = createClient({
  key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
});

export let nearbyServicesTypes = [];

export default async function handler(req: any, res: any) {
  try {
    const { address, types } = req.query;
  
    // Geocode the address
    const location: LatLng = await new Promise((resolve, reject) => {
            googleMapsClient.geocode({ address }, (err: any, response: { json: { results: string | any[]; }; }) => {
              if (err) reject(err);
              else {
                if (response.json.results.length === 0) {
                  reject(new Error('Address not found.'));
                } else {
                  resolve(response.json.results[0].geometry.location);
                }
              }
            });
        });

    // Find places around the location
    const placesResponse: any = await new Promise((resolve, reject) => {
      googleMapsClient.placesNearby({
          location,
          radius: 2000, // Start with a large radius
          type: types, // Filter by type
      }, (err: any, response: unknown) => {
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
            (err: any, response: { json: { rows: { elements: { duration: { value: unknown; }; }[]; }[]; }; }) => {
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

    nearbyServicesTypes = placesWithin15Min.flatMap((place: { types: any; }) => place.types);
  
    res.json(placesWithin15Min);
    
  } catch (error) {
    if ((error as Error).message === 'Address not found.') {
      res.status(404).json({ error: 'Address not found.' });
    } else {
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
}
