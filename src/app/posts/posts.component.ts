import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-posts',
    standalone: true,
    template: `
        <div class="wrapper">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule
    ]

})
export class PostsComponent {

}