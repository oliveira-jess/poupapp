import { Component, input, output, signal } from '@angular/core';
import { BotaoComponent } from "../../../compartilhados/botao/botao.component";
import { ModalBaseComponent } from "../../compartilhados/modal-base/modal-base.component";
import { TipoTransacao, Transacao } from '../../compartilhados/transacao.model';
import { Conta } from '../../compartilhados/conta.model';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-botao-adicionar-transacao',
  imports: [BotaoComponent, ModalBaseComponent, KeyValuePipe, FormsModule],
  templateUrl: './botao-adicionar-transacao.component.html',
  styleUrl: './botao-adicionar-transacao.component.css'
})
export class BotaoAdicionarTransacaoComponent {
  tipoTransacaoEnum = TipoTransacao;
  contas = input.required<Conta[]>();
  modalAberto = signal(false);
  novaTransacaoForm = {
    nome: '',
    valor: '',
    tipo: '',
    conta:'',
    data: ''
  }
  transacaoCriada = output<Transacao>();

  abrirModal() {
    this.modalAberto.set(true);
  }

  aoSubmeter() {
    const novaTransacao = new Transacao(
      this.novaTransacaoForm.nome,
      this.novaTransacaoForm.tipo as TipoTransacao,
      Number(this.novaTransacaoForm.valor),
      this.novaTransacaoForm.data,
      this.novaTransacaoForm.conta,
    );
    
    this.transacaoCriada.emit(novaTransacao);
    this.modalAberto.set(false);

    // Limpar os campos do formulário
    this.limparFormulario();
  }

  limparFormulario() {
    this.novaTransacaoForm = {
      nome: '',
      valor: '',
      tipo: '',
      conta: '',
      data: ''
    };
  }

}
