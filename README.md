# BioSpin — Plataforma Institucional e Tecnológica

Plataforma web institucional completa da **BioSpin**, uma deeptech amazonense pioneira na convergência entre nanotecnologia avançada, biomateriais inovadores e bioativos da biodiversidade amazônica para saúde humana e dermatologia.

---

## 🔬 Sobre a BioSpin

A **BioSpin** desenvolve soluções de alto impacto baseadas em nanobiotecnologia sustentável com foco na floresta em pé:

- **Nanofiberdressing:** Curativo nanofibrilar com liberação controlada de bioativos amazônicos (copaíba, pracaxi e castanha) para tratamento e cicatrização acelerada de feridas crônicas (ex: pé diabético e úlceras de pressão). Maturidade tecnológica **TRL 5** com validação clínica em andamento.
- **OncoMatrix:** Membrana nanofibrilar bioabsorvível em estágio de desenvolvimento para suporte estrutural e regeneração tecidual após procedimentos cirúrgicos e oncológicos, projetada para futura incorporação ao SUS.

---

## 🚀 Tecnologias Utilizadas

- **Core & Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components & Server Actions)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) com design system sob medida, efeitos visuais avançados, microinterações e glassmorphism
- **Banco de Dados & ORM:** [PostgreSQL](https://www.postgresql.org/) com [Prisma ORM](https://www.prisma.io/)
- **Autenticação:** [NextAuth.js v5](https://next-auth.js.org/) com hash de senhas via Bcrypt
- **Upload de Arquivos:** [UploadThing](https://uploadthing.com/) com suporte a CDN
- **Editor de Conteúdo:** [TipTap](https://tiptap.dev/) (Rich Text Editor moderno e intuitivo)
- **Mensageria & Notificações:** [Resend](https://resend.com/) com React Email e [Sonner](https://sonner.emilkowal.ski/)
- **Ícones & Componentes UI:** [Lucide React](https://lucide.dev/) & [Radix UI](https://www.radix-ui.com/)

---

## 📂 Estrutura do Projeto

```text
src/
├── app/
│   ├── (public)/                 # Área pública institucional
│   │   ├── page.tsx              # Home institucional
│   │   ├── sobre/                # Quem somos, história e liderança
│   │   ├── solucoes/             # Catálogo e páginas dedicadas das soluções
│   │   ├── blog/                 # Blog com categorias e posts individuais
│   │   ├── contato/              # Formulários de contato e parcerias
│   │   ├── privacidade/          # Política de privacidade
│   │   └── termos/               # Termos de uso
│   ├── admin/                    # Painel administrativo protegido
│   │   ├── login/                # Autenticação de administradores
│   │   └── (protected)/
│   │       ├── posts/            # Gestão e publicação de matérias do blog
│   │       ├── categorias/       # Gestão de categorias do blog
│   │       └── solucoes/         # Gestão do catálogo de soluções
│   └── api/                      # Rotas de API (Auth, Upload, Contato)
├── components/
│   ├── admin/                    # Componentes do painel CMS
│   ├── public/                   # Navbar, Rodapé, Modais e Componentes Públicos
│   └── ui/                       # Primitivos de interface e design system
├── lib/                          # Configurações de banco (Prisma), autenticação e utilitários
└── proxy.ts                      # Proxy / Middleware de proteção
```

---

## 🛠️ Instalação e Execução Local

### 1. Pré-requisitos
- **Node.js:** versão 18.18+ ou 20+
- **PostgreSQL:** banco de dados local ou remoto rodando

### 2. Clonar o repositório
```bash
git clone https://github.com/jancarlosz/biospin.git
cd biospin
```

### 3. Instalar dependências
```bash
npm install
```

### 4. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/biospin"

# Autenticação NextAuth
AUTH_SECRET="sua-chave-secreta-super-segura"
NEXTAUTH_URL="http://localhost:3000"

# UploadThing
UPLOADTHING_SECRET="sua_chave_uploadthing"
UPLOADTHING_APP_ID="seu_app_id"

# Resend (E-mails)
RESEND_API_KEY="re_sua_chave_resend"
CONTACT_EMAIL_TO="contato@biospin.com.br"
```

### 5. Executar Migrações e Seed do Banco
```bash
npx prisma migrate dev
npm run seed
```

> **Credenciais padrão geradas pelo seed:**
> - **E-mail:** `admin@biospin.com.br`
> - **Senha:** `BioSpin@2026!`

### 6. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🔒 Painel Administrativo

Acesse [http://localhost:3000/admin/login](http://localhost:3000/admin/login) para gerenciar:
- Publicação de novos artigos com upload de capa e editor formatado
- Categorias de conteúdo
- Catálogo de tecnologias e soluções

---

## 📄 Licença

Propriedade intelectual de **BioSpin Deeptech**. Todos os direitos reservados.
