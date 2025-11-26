import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { NgxSonnerToaster } from 'ngx-sonner';
import type { ClassValue } from 'clsx';

import { mergeClasses } from '@shared/utils/merge-classes';
import { toastVariants, ZardToastVariants } from './toastr-variants/zard-toast-variants';

@Component({
  selector: 'z-toast, z-toaster',
  standalone: true,
  exportAs: 'zToast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      [theme]="theme()"
      [class]="classes()"
      [position]="position()"
      [duration]="duration()"
      [visibleToasts]="visibleToasts()"
    />
  `,
})
export class ZardToastComponent {
  readonly variant = input<ZardToastVariants['variant']>('default');
  readonly class = input<ClassValue>('');
  readonly theme = input<'light' | 'dark' | 'system'>('system');
  readonly position = input<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('bottom-right');
  readonly duration = input<number>(3500);
  readonly visibleToasts = input<number>(3);

  protected readonly classes = computed(() =>
    mergeClasses('toaster group', toastVariants({ variant: this.variant() }), this.class())
  );
}
