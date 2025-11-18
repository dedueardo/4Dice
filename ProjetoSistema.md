# REQUISITOS FUNCIONAIS

## RF001 - Cadastro de Usuário

O sistema deve permitir que novos usuários criem uma conta fornecendo: nome de usuário único, e-mail, senha e avatar (opcional)
O sistema deve validar formato de e-mail e força da senha (mínimo 8 caracteres, incluindo letras, caracter especial e números)
O sistema deve enviar e-mail de confirmação de cadastro

## RF002 - Login e Autenticação

O sistema deve permitir login via e-mail e senha
O sistema deve implementar autenticação JWT com refresh tokens
O sistema deve oferecer funcionalidade "Lembrar-me"
O sistema deve permitir recuperação de senha via e-mail

## RF003 - Perfil de Usuário

O sistema deve permitir que usuários editem suas informações: nome, avatar, biografia
O sistema deve exibir histórico de mesas participadas
O sistema deve permitir configurações de privacidade

# 1.2 GERENCIAMENTO DE MESAS

## RF004 - Criação de Mesa

O sistema deve permitir que qualquer usuário crie uma nova mesa de jogo
O criador da mesa deve especificar: nome da mesa, sistema de jogo (D&D 5E, Pathfinder, etc.), descrição, imagem de capa (opcional), visibilidade (pública/privada)
O criador da mesa automaticamente se torna o Mestre (DM/GM)

## RF005 - Configurações da Mesa

O mestre deve poder editar todas as informações da mesa
O mestre deve poder definir quantidade máxima de jogadores
O mestre deve poder arquivar ou deletar a mesa
O mestre deve poder transferir a posição de mestre para outro jogador

## RF006 - Convites e Participação

O mestre deve poder gerar links de convite para a mesa
O mestre deve poder convidar jogadores por e-mail ou nome de usuário
Jogadores devem poder aceitar ou recusar convites
O mestre deve poder remover jogadores da mesa
Jogadores devem poder sair voluntariamente da mesa

## RF007 - Lista de Mesas

O sistema deve exibir lista de mesas do usuário (como mestre e como jogador)
O sistema deve permitir filtrar mesas por status (ativa, arquivada)
O sistema deve exibir informações resumidas: nome, número de jogadores, última sessão

# 1.3 GERENCIAMENTO DE FICHAS

## RF008 - Criação de Ficha de Personagem

Jogadores devem poder criar fichas de personagem para mesas específicas
O sistema deve suportar templates de fichas para diferentes sistemas (D&D 5E inicial)
A ficha deve incluir: atributos (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma), raça, classe, nível, pontos de vida (HP), classe de armadura (AC), iniciativa, perícias, equipamentos, magias (se aplicável), características e traços, histórico

## RF009 - Edição de Ficha de Personagem

O jogador deve poder editar sua própria ficha a qualquer momento
O mestre deve poder editar fichas de todos os jogadores
Alterações devem ser salvas automaticamente
O sistema deve manter histórico de alterações importantes (nível, HP máximo)

## RF010 - Criação de Ficha de NPC

O mestre deve poder criar fichas de NPCs (personagens não-jogadores)
NPCs devem ter fichas simplificadas ou completas conforme necessidade
O mestre deve poder categorizar NPCs (aliado, neutro, inimigo)

## RF011 - Criação de Ficha de Inimigo/Monstro

O mestre deve poder criar fichas de inimigos/monstros
Fichas devem incluir: atributos, HP, AC, ataques, ações especiais, desafio (CR)
O sistema deve permitir importação de estatísticas de bestiários

## RF012 - Permissões de Visualização

Jogadores só podem visualizar suas próprias fichas de personagem
O mestre pode visualizar todas as fichas (jogadores, NPCs, inimigos)
Jogadores não podem visualizar fichas de NPCs/inimigos a menos que o mestre compartilhe
O mestre deve poder compartilhar fichas específicas com todos os jogadores

## RF013 - Tokens de Fichas

Cada ficha deve poder gerar um token visual para uso em mapas
Tokens devem exibir: imagem/avatar, nome (configurável para mostrar/ocultar), indicador de HP (opcional), indicador de status/condições

# 1.4 SISTEMA DE MAPAS

## RF014 - Upload de Mapas

O mestre deve poder fazer upload de imagens de mapas (PNG, JPG, WebP)
O sistema deve suportar mapas de até 10MB
O mestre deve poder organizar mapas em pastas/categorias

## RF015 - Grid e Medidas

O sistema deve permitir configurar grid sobre o mapa (quadrado ou hexagonal)
O mestre deve poder ajustar o tamanho do grid
O sistema deve exibir régua de medição de distância

## RF016 - Colocação de Tokens

O mestre deve poder colocar tokens de fichas no mapa
O mestre deve poder mover tokens de qualquer personagem
Jogadores devem poder mover apenas seus próprios tokens (se permitido pelo mestre)
Tokens devem exibir área de movimento (baseado em velocidade do personagem)

## RF017 - Interação com Tokens

O sistema deve permitir rotação de tokens
O sistema deve permitir redimensionamento de tokens
O sistema deve permitir adicionar marcadores/status em tokens (envenenado, invisível, etc.)
O sistema deve permitir visualizar ficha ao clicar no token

## RF018 - Fog of War (Névoa de Guerra)

O mestre deve poder aplicar fog of war ao mapa
O mestre deve poder revelar áreas específicas do mapa
Jogadores só devem ver áreas reveladas
O sistema deve manter estado de revelação entre sessões

## RF019 - Camadas do Mapa

O sistema deve suportar múltiplas camadas: fundo (mapa base), tokens, anotações, fog of war
O mestre deve poder bloquear/desbloquear camadas
O mestre deve poder ajustar ordem de camadas

## RF020 - Ferramentas de Desenho

O mestre deve poder desenhar formas básicas no mapa (círculos, quadrados, linhas)
O sistema deve permitir medição de áreas de efeito (raio de explosão, cone, etc.)
O mestre deve poder adicionar marcadores e anotações

# 1.5 SISTEMA DE ROLAGEM DE DADOS

## RF021 - Tipos de Dados

O sistema deve suportar dados: d4, d6, d8, d10, d12, d20, d100
O sistema deve permitir rolagens múltiplas (exemplo: 3d6)
O sistema deve permitir modificadores (exemplo: 1d20+5)

## RF022 - Interface de Rolagem

O sistema deve fornecer interface visual para selecionar dados e modificadores
O sistema deve permitir rolagem rápida de testes comuns (ataque, perícia, salvaguarda)
Fichas devem ter botões de rolagem integrados para cada atributo/perícia

## RF023 - Rolagens Especiais

O sistema deve suportar vantagem/desvantagem (rola 2d20 e pega maior/menor)
O sistema deve identificar acertos críticos (20 natural) e falhas críticas (1 natural)
O sistema deve permitir rolagens customizadas com fórmulas complexas (2d6+1d8+3)

## RF024 - Rolagens Privadas

O mestre deve poder fazer rolagens privadas (só ele vê o resultado)
O mestre deve poder revelar resultados de rolagens privadas posteriormente
Jogadores sempre fazem rolagens públicas (todos veem)

## RF025 - Histórico de Rolagens

O sistema deve manter histórico completo de todas as rolagens da sessão
O histórico deve exibir: quem rolou, tipo de dado, resultado, modificadores, timestamp
O histórico deve ser mantido entre sessões
Usuários devem poder exportar histórico de rolagens

# 1.6 SISTEMA DE CHAT

## RF026 - Chat em Tempo Real

O sistema deve fornecer chat em tempo real usando WebSockets
Mensagens devem ser entregues instantaneamente a todos os participantes da mesa
O sistema deve exibir indicador de "digitando"

## RF027 - Tipos de Mensagem

O sistema deve suportar: mensagens de texto normais, rolagens de dados (formatadas especialmente), ações de personagem (formatação em itálico), mensagens do sistema (entrada/saída de jogadores, etc.)

## RF028 - Mensagens Privadas

O mestre deve poder enviar mensagens privadas para jogadores específicos
Mensagens privadas devem ser claramente identificadas
Jogadores não devem ver mensagens privadas de outros

## RF029 - Formatação e Recursos

O sistema deve suportar formatação básica: negrito, itálico, links
O sistema deve permitir menções a outros jogadores (@nome)
O sistema deve exibir timestamps em todas as mensagens

## RF030 - Histórico de Chat

O sistema deve manter histórico completo do chat da sessão
O histórico deve ser persistido entre sessões
Usuários devem poder pesquisar no histórico
Usuários devem poder exportar histórico do chat

# 1.7 GERENCIAMENTO DE SESSÕES

## RF031 - Planejamento de Sessões

O mestre deve poder agendar sessões futuras com: data e hora, duração estimada, descrição/objetivos
O sistema deve enviar notificações/lembretes aos jogadores
Jogadores devem poder confirmar presença

## RF032 - Sessão Ativa

O mestre deve poder iniciar uma sessão
Durante a sessão, todos os recursos (mapa, chat, fichas) devem estar ativos
O sistema deve rastrear duração da sessão
O mestre deve poder pausar e encerrar a sessão

## RF033 - Histórico de Sessões

O sistema deve manter registro de todas as sessões realizadas
Cada sessão deve incluir: data, duração, resumo (opcional), histórico de chat, histórico de rolagens, lista de participantes

## RF034 - Notas e Resumos

O mestre deve poder adicionar notas durante a sessão
O mestre deve poder criar resumo pós-sessão
Jogadores devem poder visualizar notas e resumos

# 1.8 BIBLIOTECA DE RECURSOS

## RF035 - Bestiário

O sistema deve incluir bestiário básico de D&D 5E (SRD)
O mestre deve poder adicionar criaturas customizadas
O sistema deve permitir pesquisa e filtros por CR, tipo, ambiente

## RF036 - Compêndio de Magias

O sistema deve incluir lista de magias de D&D 5E (SRD)
Usuários devem poder pesquisar magias por: nome, nível, escola, classe
Fichas de personagem devem poder vincular magias

## RF037 - Itens e Equipamentos

O sistema deve incluir lista básica de itens e equipamentos
Fichas devem poder adicionar itens ao inventário
O sistema deve calcular peso e capacidade de carga

# 1.9 FUNCIONALIDADES ADICIONAIS

## RF038 - Música e Ambientação

O mestre deve poder reproduzir música de fundo (via URL do YouTube/Spotify)
O sistema deve permitir controle de volume individual
O mestre deve poder criar playlists temáticas

## RF039 - Iniciativa e Combate

O sistema deve ter rastreador de iniciativa
O mestre deve poder adicionar combatentes e rolar iniciativa
O sistema deve ordenar automaticamente por valor de iniciativa
O sistema deve indicar turno atual
O sistema deve rastrear rodadas de combate

## RF040 - Notificações

O sistema deve enviar notificações para: convites de mesa, início de sessão, menções no chat, atualizações importantes
Usuários devem poder configurar preferências de notificação

# REGRAS DE NEGÓCIO

## RN001 - Hierarquia de Permissões

O Mestre tem controle total sobre a mesa
Jogadores têm acesso limitado conforme configurado pelo Mestre
Apenas o criador da mesa pode deletá-la permanentemente

## RN002 - Criação de Fichas

Cada jogador pode ter apenas uma ficha de personagem ativa por mesa
NPCs e inimigos só podem ser criados pelo Mestre
Fichas deletadas devem ser movidas para "arquivo" antes de exclusão permanente

## RN003 - Limites de Recursos

Cada mesa pode ter no máximo 150 fichas de NPCs/inimigos
Cada mesa pode ter no máximo 200 mapas
Histórico de chat mantido por 6 meses

## RN004 - Sessões

Apenas o Mestre pode iniciar uma sessão
Jogadores não podem editar fichas de outros jogadores, mesmo durante sessão
Rolagens não podem ser editadas após serem feitas

## RN005 - Dados e Rolagens

Resultados de dados devem ser gerados com aleatoriedade criptograficamente segura
Rolagens devem ser imutáveis após serem realizadas
O sistema deve prevenir manipulação de resultados