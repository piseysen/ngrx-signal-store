import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';

import {
  postListInitialState,
  PostListState,
} from './models/posts.model';
import { Post } from './interfaces/post.interface';
import { PostsService } from './posts.service';
import { PostsListConfig } from './interfaces/ost-list-config.interface';

export const PostsListStore = signalStore(
  { providedIn: 'root' },
  withState<PostListState>(postListInitialState),
  withComputed(store => ({
    paginator: computed(() => ({
      show: store.listConfig.page() > 1 || store.posts.entitiesCount() === store.listConfig.limit(),
      hasPreviousPage: store.listConfig.page() > 1,
      hasNextPage: store.posts.entitiesCount() === store.listConfig.limit(),
    })),
  })),
  withMethods((store, service = inject(PostsService)) => ({
    loadPosts: rxMethod<PostsListConfig>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap(listConfig =>
          service.getPosts$(listConfig).pipe(
            tapResponse({
              next: (entities: Post[]) => {
                const newPageLastElements = listConfig.pageLastElements.set(listConfig.page, entities[entities.length - 1]);
                patchState(store, {
                  posts: { entitiesCount: entities.length, entities },
                  listConfig: {
                    ...listConfig,
                    pageLastElements: newPageLastElements,
                  },
                  status: 'success',
                });
              },
              error: () => {
                console.error('Error loading posts');
                patchState(store, { ...postListInitialState }, { status: 'error' });
              },
            })
          )
        )
      )
    ),
  }))
);