import { Directive, inject, Output, output, signal } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormDirective<T> {
  private readonly ngForm = inject(NgForm, { self: true });
  public readonly formValueChange = output<T>();
  public readonly formDirtyChange = output<boolean>();

  constructor() {
    this.ngForm.form.valueChanges.subscribe((value) => {
      this.formValueChange.emit(value);
      this.formDirtyChange.emit(this.ngForm.form.dirty);
    });
  }
}
