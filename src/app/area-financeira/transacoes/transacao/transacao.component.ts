import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TipoTransacao, Transacao } from '../../compartilhados/transacao.model';
import { DestaqueValorNumericoDirective } from '../../../compartilhados/destaque-valor-numerico.directive';

@Component({
  selector: 'app-transacao',
  imports: [CurrencyPipe, DatePipe, DestaqueValorNumericoDirective],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.css'
})
export class TransacaoComponent {
  transacao = input.required<Transacao>();

  valor = computed(() => {
    if (this.transacao().tipo === TipoTransacao.SAQUE) {
      return -this.transacao().valor;
    }

    return this.transacao().valor;
  });
}
