import { afterRender, Component, ElementRef, model, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal-base',
  imports: [],
  templateUrl: './modal-base.component.html',
  styleUrl: './modal-base.component.css'
})
export class ModalBaseComponent {
  modal = viewChild.required<ElementRef<HTMLDialogElement>>('modal');
  aberto = model(false);

  constructor() {
    afterRender(() => {
      if (this.aberto()) {
        this.modal().nativeElement.showModal();
      } else {
        this.modal().nativeElement.close();
      }
    })
  };

  fecharModal() {
    this.aberto.set(false);
    this.modal().nativeElement.close();
  }
}
