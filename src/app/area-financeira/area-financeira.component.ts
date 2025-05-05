import { Component, computed, signal } from '@angular/core';
import { SaldoComponent } from "./saldo/saldo.component";
import { TransacoesComponent } from "./transacoes/transacoes.component";
import { ContasComponent } from "./contas/contas.component";
import { Conta } from './compartilhados/conta.model';
import { Transacao, TipoTransacao } from './compartilhados/transacao.model';

@Component({
  selector: 'app-area-financeira',
  imports: [SaldoComponent, TransacoesComponent, ContasComponent],
  templateUrl: './area-financeira.component.html',
  styleUrl: './area-financeira.component.css'
})
export class AreaFinanceiraComponent {

  transacoes = signal<Transacao[]>([]);

  saldo = computed(() => {
    return this.contasComSaldoAtualizado().reduce((acumulador, conta) => {
      return acumulador + conta.saldo;
    }, 0);
  });

  contasComSaldoInicial = signal<Conta[]>([]);

  contasComSaldoAtualizado = computed(() => {
    return this.contasComSaldoInicial().map(conta => {
      const saldoAtualizado = this.calculaSaldoAtualizado(conta);
      return { ...conta, saldo: saldoAtualizado };
    });
  })

  calculaSaldoAtualizado(contaInicial: Conta) {
    const transacoesDaConta = this.transacoes().filter((transacao) => {
      return transacao.conta === contaInicial.nome
    });

    const novoSaldo = transacoesDaConta.reduce((acumulador, transacao) => {
      switch (transacao.tipo) {
        case TipoTransacao.DEPOSITO:
          return acumulador + transacao.valor;
        case TipoTransacao.SAQUE:
          return acumulador - transacao.valor;
        default:
          transacao.tipo satisfies never;
          throw new Error('Tipo de transação inválido');
      }
    }, contaInicial.saldo);

    return novoSaldo;
  }

  processarTransacao(transacao: Transacao) {
    this.transacoes.update(() => [transacao, ...this.transacoes()]);
  }

  adicionarConta(conta: Conta) {
    this.contasComSaldoInicial.update(() => [conta, ...this.contasComSaldoInicial()]);
  }
}
