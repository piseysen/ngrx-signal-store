import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { Post } from 'app/posts/data-access/interfaces/post.interface';

@Component({
  selector: 'post-card',
  standalone: true,
  imports: [DatePipe, TagModule, ChipModule],
  providers: [DatePipe],
  template: `
    <div
      class="shadow-4 hover:shadow-6 surface-card hover:bg-blue-50 p-2 h-full border-round"
      tabindex="0">
      <div class="flex flex-wrap">
        <span class="text-gray-500 text-xs w-full">
          {{ formattedDate() | date: 'medium' }}
        </span>
        <h2 class="font-bold text-2xl w-full">
          {{ $post().title }}
        </h2>
        <p>{{ $post().description }}</p>
      </div>    
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  $post = input.required<Post>();

  formattedDate = computed(() => {
    const date = this.$post().date as any;
    return date && typeof date.toDate === 'function' ? date.toDate() : date;
  });

}