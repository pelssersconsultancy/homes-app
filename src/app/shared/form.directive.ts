import { Directive, inject, Output, output, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { mergeValuesAndRawValues } from './utils';

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormDirective<T> {
  private readonly ngForm = inject(NgForm, { self: true });
  public readonly formValueChange = output<T>();
  public readonly formDirtyChange = output<boolean>();

  constructor() {
    this.ngForm.form.valueChanges.pipe(debounceTime(0)).subscribe(() => {
      this.formValueChange.emit(mergeValuesAndRawValues<T>(this.ngForm.form));
      this.formDirtyChange.emit(this.ngForm.form.dirty);
    });
  }
}
