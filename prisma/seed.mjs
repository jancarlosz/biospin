import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting BioSpin database seeding...");

  // 1. Admin User
  const adminEmail = process.env.ADMIN_INITIAL_EMAIL || "admin@biospin.com.br";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "BioSpin@2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "BioSpin Administrador",
      passwordHash,
    },
    create: {
      name: "BioSpin Administrador",
      email: adminEmail,
      passwordHash,
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Categories from docs/PROJECT-SPEC.md
  const categoriesData = [
    {
      name: "Ciência & Inovação",
      slug: "ciencia-inovacao",
    },
    {
      name: "Impacto Amazônico",
      slug: "impacto-amazonico",
    },
    {
      name: "Novidades BioSpin",
      slug: "novidades-biospin",
    },
    {
      name: "Saúde & Cuidado",
      slug: "saude-cuidado",
    },
  ];

  const categoryMap = new Map();
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
    categoryMap.set(cat.slug, created.id);
    console.log(`✅ Category ready: ${created.name} (${created.slug})`);
  }

  // 3. Official Solutions
  const solutionsData = [
    {
      name: "Nanofiberdressing",
      slug: "nanofiberdressing",
      summary: "Curativo de nanofibras bioativas com liberação controlada de compostos da Amazônia para cicatrização acelerada de feridas crônicas.",
      content: `
        <h2>Curativo Bioativo Avançado para Feridas Crônicas</h2>
        <p>O <strong>Nanofiberdressing</strong> é um dispositivo médico inovador estruturado a partir de matrizes eletrofiadas de polímeros biocompatíveis conjugados com extratos bioativos amazônicos (copaíba e andiroba).</p>
        <h3>Principais Características</h3>
        <ul>
          <li><strong>Mimetização tecidual:</strong> Estrutura tridimensional ultrafina similar à matriz extracelular nativa da pele humana.</li>
          <li><strong>Liberação prolongada:</strong> Liberação sustentada e controlada de fitoativos com potente ação antimicrobiana, anti-inflamatória e pró-cicatrizante.</li>
          <li><strong>Maturidade tecnológica:</strong> Estágio TRL 5 com ensaios e validação clínica em andamento junto a centros hospitalares de referência.</li>
          <li><strong>Indicações:</strong> Tratamento de úlceras por pressão, feridas do pé diabético, úlceras venosas e queimaduras de espessura parcial.</li>
        </ul>
      `,
      status: "PUBLISHED",
      imageUrl: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=800&q=80",
      seoTitle: "Nanofiberdressing | Curativo Bioativo BioSpin",
      seoDescription: "Curativo bioativo acelera a cicatrização de feridas crônicas com nanofibras e ativos da Amazônia.",
      publishedAt: new Date(),
    },
    {
      name: "OncoMatrix",
      slug: "oncomatrix",
      summary: "Membrana nanofibrilar bioabsorvível para regeneração e suporte tecidual em cirurgias oncológicas, desenvolvida no Desafio Hackathon SUS.",
      content: `
        <h2>Membrana Nanofibrilar Bioabsorvível</h2>
        <p>O <strong>OncoMatrix</strong> é um biomaterial médico de vanguarda projetado para reconstrução, suporte estrutural e regeneração guiada de tecidos após ressecções em cirurgias oncológicas.</p>
        <h3>Diferenciais e Status de Desenvolvimento</h3>
        <ul>
          <li><strong>Solução premiada:</strong> Desenvolvida e laureada no Desafio 2 do Hackathon SUS.</li>
          <li><strong>Bioabsorção controlada:</strong> Matriz nanofibrilar desenhada para ser degradada e substituída de forma harmônica pelo novo tecido celular do próprio paciente.</li>
          <li><strong>Status:</strong> Solução em desenvolvimento científico e co-validação clínica junto a pesquisadores e instituições oncológicas de ponta.</li>
        </ul>
      `,
      status: "PUBLISHED",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
      seoTitle: "OncoMatrix | Membrana Nanofibrilar Bioabsorvível",
      seoDescription: "Biomaterial da BioSpin para reconstrução de tecidos em cirurgias oncológicas, do Hackathon SUS.",
      publishedAt: new Date(),
    },
  ];

  for (const sol of solutionsData) {
    const s = await prisma.solution.upsert({
      where: { slug: sol.slug },
      update: {
        name: sol.name,
        summary: sol.summary,
        content: sol.content,
        imageUrl: sol.imageUrl,
        status: sol.status,
        seoTitle: sol.seoTitle,
        seoDescription: sol.seoDescription,
        publishedAt: sol.publishedAt,
      },
      create: sol,
    });
    console.log(`✅ Solution ready: ${s.name} (${s.slug})`);
  }

  // 4. Initial Launch Posts
  const postsData = [
    {
      title: "Como nasceu a BioSpin: da pesquisa em nanotecnologia à startup amazônica",
      slug: "como-nasceu-a-biospin",
      excerpt: "A trajetória da deeptech de Manaus fundada a partir de pesquisas com nanotecnologia no INPA e UFAM, conectando ciência de ponta e floresta em pé.",
      content: `
        <p>A BioSpin nasceu da união entre o rigor da pesquisa científica em engenharia de materiais e a inesgotável riqueza botânica da Amazônia. Fundada por pesquisadores dedicados à ciência dos biopolímeros e da nanotecnologia, a startup surgiu com um propósito claro: transformar ativos da floresta em dispositivos médicos e biomateriais de alto valor agregado.</p>
        <p>Com apoio de programas fundamentais de fomento, como o Catalisa ICT do Sebrae Nacional e parcerias com o Laboratório de Transformação e Matérias-Primas Naturais (LTMN/INPA) e a UFAM, consolidamos patentes e tecnologias proprietárias de eletrofiação e liberação controlada.</p>
        <p>Nosso compromisso é duplo: entregar soluções biomédicas de classe mundial para o sistema de saúde e assegurar a repartição justa de benefícios com as comunidades tradicionais e extrativistas que preservam a floresta em pé.</p>
      `,
      status: "PUBLISHED",
      categoryId: categoryMap.get("novidades-biospin"),
      seoTitle: "Como nasceu a BioSpin | Da Pesquisa à Startup Amazônica",
      seoDescription: "Conheça a história da BioSpin, fundada por pesquisadores de Manaus para unir nanotecnologia e bioativos da floresta.",
      publishedAt: new Date(),
    },
    {
      title: "O que é nanoencapsulação e como ela potencializa bioativos da Amazônia",
      slug: "o-que-e-nanoencapsulacao-bioativos-amazonia",
      excerpt: "Entenda a engenharia que protege fitoquímicos sensíveis e garante liberação controlada e máxima eficácia em tecidos biológicos.",
      content: `
        <p>Os óleos e resinas amazônicos, como a copaíba, a andiroba e o cumaru, são conhecidos há gerações por suas virtudes cicatrizantes e regeneradoras. No entanto, quando aplicados de forma bruta, muitos dos seus compostos ativos sofrem rápida oxidação e têm absorção celular limitada.</p>
        <p>É aqui que a <strong>nanotecnologia da BioSpin</strong> faz a diferença: ao desenvolver carreadores e nanofibras em escala nanométrica, conseguimos proteger os princípios ativos da degradação ambiental e viabilizar uma liberação controlada exatamente no sítio da lesão tecidual.</p>
        <p>Isso significa menor necessidade de trocas de curativo, menor dor para o paciente e um tempo de cicatrização substancialmente reduzido em comparação aos tratamentos convencionais.</p>
      `,
      status: "PUBLISHED",
      categoryId: categoryMap.get("ciencia-inovacao"),
      seoTitle: "Nanoencapsulação e Bioativos da Amazônia | BioSpin",
      seoDescription: "Saiba como a nanobiotecnologia potencializa os ativos da floresta na cicatrização e regeneração de feridas crônicas.",
      publishedAt: new Date(),
    },
  ];

  for (const p of postsData) {
    const post = await prisma.post.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        status: p.status,
        categoryId: p.categoryId,
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        publishedAt: p.publishedAt,
      },
      create: p,
    });
    console.log(`✅ Post ready: ${post.title} (${post.slug})`);
  }

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
