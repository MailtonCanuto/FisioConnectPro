# FisioConnectPro

Sistema completo para gestão de clínicas de fisioterapia.

## Funcionalidades

- Agenda inteligente com múltiplas visualizações
- Prontuário eletrônico
- Gestão financeira
- Lembretes automáticos
- Cadastro completo de pacientes
- Painel de desempenho
- Controle de convênios
- Atendimento online
- Área do paciente
- Gestão de equipe
- Relatórios clínicos e financeiros

## Tecnologias

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Node.js
- PostgreSQL (em breve)

## Pré-requisitos

- Node.js 18.17 ou superior
- npm 9.6.7 ou superior

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/fisioconnectpro.git
cd fisioconnectpro
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse o projeto em [http://localhost:3000](http://localhost:3000)

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa a verificação de código

## Estrutura do projeto

```
fisioconnectpro/
├── src/
│   ├── app/           # Páginas da aplicação
│   ├── components/    # Componentes reutilizáveis
│   ├── lib/          # Bibliotecas e configurações
│   ├── styles/       # Estilos globais
│   ├── types/        # Definições de tipos TypeScript
│   └── utils/        # Funções utilitárias
├── public/           # Arquivos estáticos
└── package.json      # Dependências e scripts
```

## Estrutura de Imagens

A pasta de imagens do projeto está organizada da seguinte forma:

- `/brand/` - Logos e elementos da marca
  - `logo.png` - Logo principal
  - `favicon.ico` - Ícone do site
  - `logo-white.png` - Versão branca da logo

- `/icons/` - Ícones customizados do sistema
  - `specialties/` - Ícones de especialidades
  - `status/` - Ícones de status
  - `actions/` - Ícones de ações

- `/backgrounds/` - Imagens de fundo e texturas
  - `patterns/` - Padrões e texturas
  - `hero/` - Imagens para seções principais

- `/avatars/` - Imagens de perfil padrão
  - `default-user.png` - Avatar padrão para usuários
  - `default-professional.png` - Avatar padrão para profissionais

- `/illustrations/` - Ilustrações e gráficos
  - `empty-states/` - Ilustrações para estados vazios
  - `onboarding/` - Ilustrações para onboarding

### Diretrizes para Imagens

1. Mantenha as imagens otimizadas para web
2. Use formatos apropriados:
   - PNG para logos e ícones
   - SVG para ícones e ilustrações vetoriais
   - JPG/WEBP para fotos e imagens de fundo
3. Mantenha um padrão de nomenclatura consistente
4. Adicione imagens na pasta apropriada conforme sua função

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.