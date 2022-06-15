// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from '../firebase';
import * as Location from 'expo-location';
import { useState } from 'react';
const geofire = require('geofire-common');



type dateTime = {
    nanoseconds: number,
    seconds: number
}

export type Post = { 
    bar: string
    createdAt: dateTime
    key: string
    text: string
    uid: string
    voteCount: number
    votes: number,
  }

// Define a service using a base URL and expected endpoints
export const fetchPosts = createApi({
    reducerPath: 'fetchPosts',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getPosts: build.query<Post[] | any, any | undefined>({
        async queryFn(lastDoc) {
          try {
            let ref = db.collection('messages').orderBy('createdAt', 'desc');
            const posts: Post[] = [];
            let lastPost;
            console.log('fetching posts')
            await ref.limit(9) // limit to your page size, 3 is just an example
                .get()
                .then((querySnapshot: any[]) => {
                    //lastPost = querySnapshot.docs[querySnapshot.docs.length - 1];
                    querySnapshot.forEach(documentSnapshot => {
                        posts.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                });   
            const data = {
                posts: posts,
                lastPost: lastPost
              }
            return {data: data};

          } catch (e) {
            return { error: e }
          }
        },
      }),
    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery } = fetchPosts