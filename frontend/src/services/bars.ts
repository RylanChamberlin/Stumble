// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from '../firebase';
import * as Location from 'expo-location';
const geofire = require('geofire-common');

export type Bar = {
    geohash: string
    lat: number
    lng: number
    name: string
    postCount: number
    rating: number
    topPost: string,
    key: string
  }

// Define a service using a base URL and expected endpoints
export const fetchBars = createApi({
    reducerPath: 'fetchBars',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getBarsByLocation: build.query<Bar[] | any, void>({
        async queryFn(arg) {
          try {
            //const location = getState().userState.currentUserLocation;
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                //console.log('Permission to access location was denied')
                return {error: 'Permission to access location was denied'};
            }
            let location = await Location.getCurrentPositionAsync({});

            const center = [location.coords.latitude, location.coords.longitude];
            const radiusInM = 16 * 1000;

            // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
            // a separate query for each pair. There can be up to 9 pairs of bounds
            // depending on overlap, but in most cases there are 4.

            console.log('fetching bars')
            const bounds = geofire.geohashQueryBounds(center, radiusInM);
            const promises = [];
            for (const b of bounds) {
                const q = db.collection('bars')
                    .orderBy('geohash')
                    .startAt(b[0])
                    .endAt(b[1])
                promises.push(q.get());
            }
            // Collect all the query results together into a single list
            const data = Promise.all(promises).then((snapshots) => {
                const matchingDocs = [];

                for (const snap of snapshots) {
                    for (const doc of snap.docs) {
                        const lat = doc.get('lat');
                        const lng = doc.get('lng');

                        // We have to filter out a few false positives due to GeoHash
                        // accuracy, but most will match
                        const distanceInKm = geofire.distanceBetween([lat, lng], center);
                        const distanceInM = distanceInKm * 1000;
                        if (distanceInM <= radiusInM) {
                            matchingDocs.push({
                                ...doc.data(),
                                key: doc.id,
                            });
                        }
                    }
                }
                return matchingDocs;

                }
             )

            return {data: data}

          } catch (e) {
            return { error: e }
          }
        },
      }),
    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBarsByLocationQuery } = fetchBars