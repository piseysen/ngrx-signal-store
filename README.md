# NgRx Signal Store - Modern State Management for Angular

A professional Angular application demonstrating modern state management patterns using NgRx Signal Store.

## About

This project showcases the implementation of NgRx Signal Store for efficient state management in Angular 19+ applications. It features a complete blog posts management system with Firestore integration, providing real-world examples of state management patterns.

## What is NgRx Signal Store?

NgRx Signal Store is a lightweight state management solution that leverages Angular Signals for reactive state handling. Key benefits include:

- **Fully integrated with Angular Signals**: Built on top of Angular's first-party reactivity system
- **Type-safe**: Complete TypeScript support for safe state access and mutations
- **Reduced boilerplate**: Simpler API compared to traditional NgRx, with less code required
- **Optimized performance**: Fine-grained reactivity with minimal overhead
- **Developer-friendly**: Intuitive API that follows familiar patterns
- **DevTools compatibility**: Works with Redux DevTools for state inspection

## Features

- Complete posts management system
- Reactive state updates using Signal Store
- Firestore integration for data persistence
- Pagination with state management
- PrimeNG UI components integration
- Optimistic UI updates

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 10.x or later
- Angular CLI 19.x

### Installation

```bash
# Clone the repository
git clone https://github.com/piseysen/ngrx-signal-store.git

# Navigate to project folder
cd ngrx-signal-store

# Install dependencies
npm install
```

### Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore in your project
3. Update the Firebase configuration in `src/environments/environment.ts`

## Usage Examples

### Store Definition

```typescript
export const PostsListStore = signalStore(
  { providedIn: 'root' },
  withState<PostsListState>({
    posts: [],
    status: 'pending',
    error: null,
    limit: 5,
    page: 1,
    pageLastElements: new Map(),
  }),
  withMethods((store, postsService = inject(PostsService)) => ({
    loadPosts: rxMethod<number>(
      pipe(
        tap(() => store.patchState({ status: 'loading' })),
        switchMap((page) => {
          const config: PostsListConfig = {
            limit: store.limit(),
            page,
            pageLastElements: store.pageLastElements(),
          };
          return postsService.getPosts$(config).pipe(
            tapResponse({
              next: (posts) => {
                store.patchState({
                  posts,
                  status: 'success',
                  error: null,
                  page,
                });
              },
              error: (error) => store.patchState({ error, status: 'error' }),
            })
          );
        })
      )
    ),
  }))
);
```

### Using the Store in Components

```typescript
@Component({
  selector: 'posts-list',
  standalone: true,
  template: `
    <div class="posts-container">
      <div *ngIf="vm.status() === 'loading'">
        <post-card-skeleton></post-card-skeleton>
      </div>
      <div *ngIf="vm.status() === 'success'">
        <post-card *ngFor="let post of vm.posts()" [post]="post"></post-card>
      </div>
    </div>
  `,
})
export class PostsListComponent {
  private postsStore = inject(PostsListStore);
  
  vm = toSignal(
    combineLatest({
      posts: this.postsStore.posts$,
      status: this.postsStore.status$,
    })
  );
  
  ngOnInit() {
    this.postsStore.loadPosts(1);
  }
}
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [NgRx Signal Store Documentation](https://ngrx.io/guide/signals/signal-store)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Firebase Documentation](https://firebase.google.com/docs)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
