// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import * as Location from 'expo-location';
import { collection, endAt, getDocs, getFirestore, orderBy, query, startAt } from 'firebase/firestore';
import { db } from '../firebase';

const geofire = require('geofire-common');

export type Bar = {
    geohash: string
    lat: number
    lng: number
    name: string
    postCount: number
    rating: number
    topPost: string,
    place_id: string
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

            console.log('fetching bars')

            const { latitude, longitude } = location.coords || {};
            if (latitude && longitude) {
            const radiusInM = 16 * 1000;
            const center = [latitude, longitude];
            const bounds = geofire.geohashQueryBounds(center, radiusInM);
            const matchingDocs: any = [];
            
            for (const b of bounds) {
                const q = query(
                    collection(db, "bars"),
                    orderBy("geohash"),
                    startAt(b[0]),
                    endAt(b[1])
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    matchingDocs.push({
                        ...doc.data(),
                        place_id: doc.id,
                    });
                });
            }

            return {data: matchingDocs}
            }
            
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