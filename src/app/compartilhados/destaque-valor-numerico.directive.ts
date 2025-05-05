import { afterRender, Directive, ElementRef, input } from "@angular/core";

@Directive({
  selector: "[appDestaqueValorNumerico]"
})
export class DestaqueValorNumericoDirective {

    appDestaqueValorNumerico = input.required<number>();

    corReceita = input<string>("var(--destaque-receita)");
    corDespesa = input<string>("var(--destaque-despesa)");

    constructor(elemento: ElementRef<HTMLElement>) {
        afterRender(() => {
            if (this.appDestaqueValorNumerico() > 0) {
                elemento.nativeElement.style.color = this.corReceita();
                return;
            } else if (this.appDestaqueValorNumerico() < 0) {
                elemento.nativeElement.style.color = this.corDespesa();
            }
        });
    }
}
