# Bônus opcional: descadastro com agentes e TDD

**Atividade opcional — até 30 minutos.** Use o contrato em
[bonus-unsubscribe-requirements.md](./bonus-unsubscribe-requirements.md) como
fonte de verdade. O objetivo é simular o estado da interface; não é remover
alguém de uma lista real de e-mails.

## Executar o fluxo

1. No Copilot Chat do VS Code, escolha o agente invocável
   **Implementation Workflow Orchestrator**.
2. Forneça como requisitos o conteúdo de
   [bonus-unsubscribe-requirements.md](./bonus-unsubscribe-requirements.md)
   (ou peça ao agente para ler esse arquivo) e solicite a implementação do
   bônus.
3. Acompanhe os handoffs. O orquestrador deve executar cada agente
   especialista sequencialmente, passando os requisitos completos e o
   resultado validado da fase anterior:
   - **Planejamento:** `Plan Mode - Strategic Planning & Architecture` lê o
     repositório e produz o plano, sem editar.
   - **Inspeção no browser:** `Playwright Tester Mode` usa o Playwright MCP
     para observar a página e identificar locators/fluxos antes dos testes.
   - **RED:** `TDD Red Phase - Write Failing Tests First` adiciona ou ajusta
     somente testes e demonstra uma falha causada pelo comportamento ainda
     ausente.
   - **GREEN:** `TDD Green Phase - Make Tests Pass Quickly` altera somente a
     aplicação, sem enfraquecer os testes, e executa os testes.
   - **Refactor:** `TDD Refactor Phase - Improve Quality & Security` só
     refatora dentro do contrato e verifica novamente os testes.
   - **Verificação final:** o orquestrador confere o browser quando aplicável,
     os resultados dos testes e o diff final.
4. Confira cada gate antes de permitir a fase seguinte. Se um agente falhar,
   estiver indisponível, houver conflito de requisitos ou o RED não falhar
   pelo comportamento ausente, interrompa e resolva o bloqueio; não pule
   etapas.

> A configuração inicial desses agentes ocorre somente ao executar a skill
> `setup-newsletter-unsubscribe-bonus`. Eles não são pré-requisitos instalados
> automaticamente em outros momentos.

## Verificação manual

- Após inscrever-se, confirme que o botão acessível `Cancelar inscrição` está
  disponível.
- Cancele e confirme `Inscrição cancelada!` em uma região de status e o
  formulário visível novamente.
- Faça uma nova inscrição e confirme a mensagem de sucesso.
- Recarregue a página e confirme que o estado não persiste.
- Confirme que a validação original do formulário continua funcionando.

Use os comandos já existentes no projeto: `npx playwright test` para a suíte
completa ou `npx playwright test tests/newsletter.spec.js` para o teste de
inscrição existente. O bônus pode adicionar um arquivo de teste próprio; não
altere o teste existente sem necessidade.

O estado é mantido somente em memória: recarregar a página o reinicia. Não há
backend, API, persistência, serviço de e-mail ou descadastro real. Esta
atividade não cria nem altera workflow obrigatório.
