import {
    collectionData,
    collection,
    startAfter,
    Firestore,
    orderBy,
    query,
    limit,
    doc,
    getDoc,
    setDoc,
  } from '@angular/fire/firestore';
  import { assignTypes } from '@core/utils/assign-type.util';
  import { Injectable, inject } from '@angular/core';
  import { Observable } from 'rxjs';
  
import { Post } from './interfaces/post.interface';
import { PostsListConfig } from './interfaces/ost-list-config.interface';
  
@Injectable({
  providedIn: 'root',
})
export class PostsService {
    private readonly PATH = 'posts';
    private readonly firestore = inject(Firestore);
    private readonly collection = collection(this.firestore, this.PATH).withConverter(assignTypes<Post>());

    constructor() {
      // create the collection if it doesn't exist
     this.initializeCollection();
    }


    private async initializeCollection() {
      try {
        const docRef = doc(this.firestore, `${this.PATH}/${this.Id}`);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          await setDoc(docRef, { 
            title: 'Initial post',
            description: 'This is an initialization document',
            date: new Date()
          });
          console.log('Collection initialized with initial post');
        }
      } catch (error) {
        console.error('Error initializing collection:', error);
      }
    }

    private get Id() {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      return `${timestamp}-${random}`;
    }
  
    getPosts$(config: PostsListConfig): Observable<Post[]> {
      const { limit: qLimit, page, pageLastElements } = config;
      let postCollection;
      if (page === 1) {
        postCollection = query(this.collection, orderBy('date', 'desc'), limit(qLimit));
      } else {
        const { date } = pageLastElements.get(page - 1)!;
        postCollection = query(this.collection, orderBy('date', 'desc'), limit(qLimit), startAfter(date));
      }
      return collectionData(postCollection, { idField: 'id' });
    }
}

