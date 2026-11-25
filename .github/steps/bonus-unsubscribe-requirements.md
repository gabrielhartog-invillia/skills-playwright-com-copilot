# Requisitos do bônus opcional: descadastro da Newsletter

Este documento é o contrato de comportamento para o bônus opcional de
descadastro. A implementação deve se limitar aos requisitos abaixo e preservar
o formulário e a validação de inscrição existentes.

## Comportamento

- Depois de uma inscrição bem-sucedida, mostrar um botão acessível com o nome
  `Cancelar inscrição`.
- Ao cancelar, limpar o estado da inscrição mantido em memória, anunciar
  `Inscrição cancelada!` em uma região de status e mostrar novamente o
  formulário.
- Depois do cancelamento, permitir uma nova inscrição usando o formulário
  existente e sua validação.
- O estado da inscrição não persiste após recarregar a página.
- O descadastro é uma simulação de estado da interface; não remove um endereço
  de uma lista real de e-mails.

## Fora de escopo

Não implementar backend, banco de dados, API, `localStorage`, serviço de
e-mail, remoção administrativa, exclusão de conta ou alterações em workflows.

## Critérios de aceitação observáveis

1. Com uma inscrição válida, a confirmação de inscrição existente continua
   funcionando e o botão `Cancelar inscrição` fica disponível por nome
   acessível.
2. Ao ativar `Cancelar inscrição`, o texto `Inscrição cancelada!` aparece em
   uma região com `role="status"` e o formulário volta a ficar visível.
3. Após cancelar, é possível preencher e enviar o formulário novamente; a
   confirmação de inscrição aparece e o botão de cancelamento fica disponível
   novamente.
4. O formulário continua exigindo um endereço de e-mail válido conforme sua
   validação existente.
5. Após recarregar a página, o formulário inicial está disponível e o estado
   anterior da inscrição não é restaurado.

## Cenários Playwright derivados

- Inscrever um endereço válido e verificar a confirmação e o botão acessível
  `Cancelar inscrição`.
- Cancelar a inscrição e verificar a mensagem exata em `role="status"` e a
  visibilidade do formulário.
- Fazer uma nova inscrição depois do cancelamento e verificar a confirmação.
- Tentar enviar o formulário sem um endereço válido e confirmar que a
  validação existente impede o envio.
- Recarregar depois de uma inscrição e verificar que o estado não persiste.
