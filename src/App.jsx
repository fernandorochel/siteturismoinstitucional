import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowSquareOut, Bicycle, CalendarBlank, CaretRight, EnvelopeSimple,
  Church, Info, InstagramLogo, List, MapPin, MapTrifold,
  Sparkle, Tree, WhatsappLogo, X,
} from "@phosphor-icons/react";

const links = {
  prefeitura: "https://www.itatinga.sp.gov.br/",
  cidade: "https://www.itatinga.sp.gov.br/cidade",
  guia: "https://guia.turismoitatinga.com.br",
  eventos: "https://www.itatinga.sp.gov.br/evento",
  decretoEventos: "https://itatinga.sispref.com.br/arquivo?Id=200170",
  noticias: "https://www.turismo.itatinga.sp.gov.br/noticia/2357/como-voce-ve-o-turismo-de-itatinga-/",
  instagram: "https://www.instagram.com/turismo_itatinga/",
  whatsapp: "https://wa.me/551438483039",
  apicuesta: "https://www.apicuesta.com/",
};

const attractions = [
  {
    title: "Recanto dos Cambarás",
    text: "Área pública às margens da Represa de Jurumirim, com quiosques, pesca, esportes e camping gratuito.",
    image: "/images/recanto-cambaras.jpg",
    icon: Tree,
  },
  {
    title: "Abadia de Nossa Senhora da Assunção",
    text: "Mosteiro cisterciense fundado em 1951, com arquitetura, jardins, celebrações e produção artesanal.",
    image: "/images/abadia-itatinga.jpg",
    icon: Church,
    href: "https://www.abadiadeitatinga.org",
    actionLabel: "Acessar site oficial",
    actionIcon: ArrowSquareOut,
  },
  {
    title: "Horto Florestal ESALQ/USP",
    text: "Trilhas, educação ambiental, pesquisa e lazer em uma área de 2.163 hectares próxima à cidade.",
    image: "/images/horto-florestal-esalq.jpg",
    icon: Tree,
    href: "https://www.instagram.com/horto.itatinga/",
    actionLabel: "Informações e reservas",
    actionIcon: InstagramLogo,
  },
];

const highlights = [
  {
    title: "Atrativos",
    text: "Lugares e experiências para descobrir.",
    icon: MapPin,
    imageIcon: "/images/icone-atrativos.png",
    tone: "blue image",
    href: "#atrativos",
  },
  {
    title: "Cidade do Mel",
    text: "Sabor, história e identidade local.",
    icon: Sparkle,
    imageIcon: "/images/icone-cidade-do-mel.png",
    tone: "honey image",
    href: "#cidade-do-mel",
  },
  {
    title: "Site institucional",
    text: "Informações oficiais do Turismo de Itatinga.",
    icon: Info,
    imageIcon: "/images/icone-site-institucional.png",
    tone: "green image",
    href: "https://www.turismo.itatinga.sp.gov.br/",
    external: true,
  },
  {
    title: "Guia da Cidade",
    text: "Serviços e informações úteis.",
    icon: MapTrifold,
    imageIcon: "/images/icone-guia-cidade.png",
    tone: "cyan image",
    action: "guide",
  },
];

function ExternalLink({ href, children, className = "" }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

const timeline = [
  { year: "1875", title: "Início da povoação", text: "Formação do povoado que daria origem ao município de Itatinga." },
  { year: "1884", title: "Capela de São João", text: "Os pioneiros erguem a capela no local da atual Igreja Matriz." },
  { year: "1891", title: "Distrito de Paz", text: "Criação oficial do Distrito de Paz de São João de Itatinga." },
  { year: "1896", title: "Emancipação municipal", text: "Itatinga torna-se município em 24 de julho, desmembrando-se de Avaré." },
  { year: "1914", title: "Chegada da ferrovia", text: "Conclusão da ligação com a Estrada de Ferro Sorocabana." },
  { year: "1938", title: "O nome Itatinga", text: "O município deixa de se chamar São João de Itatinga e adota o nome atual." },
  { year: "1954", title: "Abadia Cisterciense", text: "Inauguração da Abadia de Nossa Senhora da Assunção, importante patrimônio cultural." },
];

function CityPage() {
  return (
    <main id="conteudo" className="city-page">
      <section className="city-hero">
        <img src="/images/aerea-itatinga.jpg" alt="Vista aérea do município de Itatinga e de sua paisagem rural" />
        <div className="city-hero-overlay" />
        <div className="container city-hero-content">
          <a className="city-back" href="#inicio">← Voltar para o início</a>
          <p className="eyebrow light">Conheça o município</p>
          <h1>Itatinga:<br />história, território e identidade</h1>
          <p>Uma cidade construída entre caminhos, paisagens, trabalho e hospitalidade no interior paulista.</p>
        </div>
      </section>

      <section className="city-intro">
        <div className="container city-intro-grid">
          <div>
            <p className="eyebrow">Pedra Branca</p>
            <h2>Um nome que nasce da paisagem</h2>
          </div>
          <div className="city-lead">
            <p>A origem do nome Itatinga remonta a uma formação rochosa branca situada a leste da sede municipal. Em tupi-guarani, <strong>itá</strong> significa pedra e <strong>tinga</strong>, branca.</p>
            <p>O município preserva em seu nome a memória dos povos originários e uma ligação profunda com o território.</p>
          </div>
        </div>
      </section>

      <section className="city-timeline-section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Nossa trajetória</p><h2>Marcos da história de Itatinga</h2></div>
          </div>
          <div className="city-timeline">
            {timeline.map((item) => (
              <article key={item.year}>
                <span>{item.year}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="city-story">
        <div className="container city-story-grid">
          <div className="city-story-photo">
            <img src="/images/aerea-itatinga.jpg" alt="Área urbana de Itatinga cercada por campos e áreas verdes" />
            <span>Itatinga vista do alto</span>
          </div>
          <div className="city-story-copy">
            <p className="eyebrow">Formação do município</p>
            <h2>De uma pequena povoação a uma cidade acolhedora</h2>
            <p>A povoação teve início em 1875. Em 1881, Antônio Francisco da Silva e José Pinto de Oliveira ergueram um cruzeiro em terras da Fazenda São João. Poucos anos depois, ao lado de outros pioneiros, construíram a Capela de São João de Itatinga.</p>
            <p>Em 24 de julho de 1896, o território foi elevado à categoria de município. A data permanece como aniversário oficial de Itatinga e celebra sua autonomia, memória e desenvolvimento.</p>
            <p>A ferrovia, o Distrito do Lobo e a Abadia Cisterciense também marcaram a história local e ajudaram a formar o patrimônio cultural do município.</p>
          </div>
        </div>
      </section>

      <section className="city-facts">
        <div className="container">
          <div className="city-facts-heading">
            <p className="eyebrow light">Itatinga em números</p>
            <h2>Um território amplo, conectado e cheio de natureza</h2>
          </div>
          <div className="facts-grid">
            <article><strong>19.070</strong><span>habitantes no Censo 2022</span></article>
            <article><strong>979,5 km²</strong><span>de área territorial</span></article>
            <article><strong>845 m</strong><span>de altitude na sede</span></article>
            <article><strong>221 km</strong><span>da capital paulista</span></article>
            <article><strong>19,2°C</strong><span>de temperatura média</span></article>
            <article><strong>89%</strong><span>da população na zona urbana</span></article>
          </div>
        </div>
      </section>

      <section className="city-location">
        <div className="container city-location-grid">
          <div>
            <p className="eyebrow">Localização e natureza</p>
            <h2>Entre rios, campos e caminhos</h2>
            <p>Itatinga integra a região administrativa de Sorocaba e está conectada à capital pela Rodovia Presidente Castelo Branco. Seu território é banhado por rios como Novo, das Pedras, Bonito, Tamanduá, Pardo, Santo Inácio, dos Veados e Paranapanema.</p>
          </div>
          <div className="boundary-card">
            <h3>Municípios limítrofes</h3>
            <dl>
              <div><dt>Norte</dt><dd>Botucatu</dd></div>
              <div><dt>Leste</dt><dd>Pardinho e Bofete</dd></div>
              <div><dt>Oeste</dt><dd>Avaré</dd></div>
              <div><dt>Sul</dt><dd>Angatuba e Paranapanema</dd></div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}

const eventAreas = [
  { title: "Festas e tradições", text: "Celebrações que preservam a memória, os costumes e a identidade da comunidade.", icon: Church, tone: "orange" },
  { title: "Cultura e lazer", text: "Programações para todas as idades, com convivência, arte e entretenimento.", icon: Sparkle, tone: "blue" },
  { title: "Esporte e natureza", text: "Atividades que valorizam os espaços públicos, os caminhos rurais e a vida ao ar livre.", icon: Bicycle, tone: "green" },
  { title: "Turismo e desenvolvimento", text: "Ações que fortalecem o comércio, a gastronomia, os produtores e o turismo local.", icon: MapPin, tone: "honey" },
];

const officialEvents = [
  {
    month: "Maio",
    color: "orange",
    events: [
      { date: "01 e 02", title: "Festa do Trabalhador" },
      { date: "03", title: "Corrida do Trabalhador e Festival de Rock" },
    ],
  },
  {
    month: "Julho",
    color: "blue",
    events: [
      { date: "22 a 25", title: "26ª Festa do Peão" },
    ],
  },
  {
    month: "Setembro",
    color: "green",
    events: [
      { date: "06", title: "Eco Trail" },
      { date: "12 e 13", title: "Two Days" },
    ],
  },
  {
    month: "Outubro",
    color: "honey",
    events: [
      { date: "12", title: "Festa do Dia das Crianças" },
      { date: "18", title: "Tour da Balsa" },
    ],
  },
  {
    month: "Dezembro",
    color: "red",
    events: [
      { date: "16 a 20", title: "Festival Natalino" },
    ],
  },
];

function EventsPage() {
  return (
    <main id="conteudo" className="events-page">
      <section className="events-page-hero">
        <img src="/images/eventos-praca-noturna.jpg" alt="Vista aérea noturna da Praça da Matriz durante evento em Itatinga" />
        <div className="events-page-shade" />
        <div className="container events-page-hero-content">
          <a className="city-back" href="#inicio">← Voltar para o início</a>
          <p className="eyebrow light">Diretoria Municipal de Turismo</p>
          <h1>Eventos que movimentam Itatinga</h1>
          <p>Tradição, cultura, esporte, lazer e experiências que aproximam pessoas e fortalecem o desenvolvimento local.</p>
          <div className="hero-actions">
            <ExternalLink className="button primary" href={links.eventos}>Consultar agenda oficial <CalendarBlank /></ExternalLink>
            <ExternalLink className="button secondary" href={links.whatsapp}>Falar com a Diretoria <WhatsappLogo /></ExternalLink>
          </div>
        </div>
      </section>

      <section className="events-intro">
        <div className="container events-intro-grid">
          <div>
            <p className="eyebrow">Viva Itatinga</p>
            <h2>Encontros que fazem parte da cidade</h2>
          </div>
          <div>
            <p>Os eventos municipais criam oportunidades de convivência, valorizam talentos, movimentam a economia e apresentam Itatinga a moradores e visitantes.</p>
            <p>A Diretoria atua na organização, divulgação e apoio a iniciativas que fortalecem o calendário turístico e a identidade local.</p>
          </div>
        </div>
      </section>

      <section className="official-calendar">
        <div className="container">
          <div className="calendar-heading">
            <div>
              <p className="eyebrow">Calendário municipal 2026</p>
              <h2>Um ano de encontros e experiências</h2>
            </div>
            <div className="calendar-source">
              <span>Fonte oficial</span>
              <strong>Decreto nº 3.752/2026</strong>
              <ExternalLink href={links.decretoEventos}>Consultar documento <ArrowSquareOut /></ExternalLink>
            </div>
          </div>
          <div className="official-calendar-grid">
            {officialEvents.map(({ month, color, events }) => (
              <article className={`calendar-month ${color}`} key={month}>
                <header>
                  <CalendarBlank weight="duotone" />
                  <h3>{month}</h3>
                </header>
                <div>
                  {events.map((event) => (
                    <div className="calendar-event" key={`${month}-${event.date}-${event.title}`}>
                      <span>{event.date}</span>
                      <strong>{event.title}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="calendar-note">Novos eventos poderão ser incluídos ao longo do ano. Regulamentos e detalhes de cada programação serão divulgados pelos canais oficiais.</p>
        </div>
      </section>

      <section className="events-areas">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Programação diversificada</p><h2>Experiências para diferentes públicos</h2></div>
          </div>
          <div className="event-area-grid">
            {eventAreas.map(({ title, text, icon: Icon, tone }) => (
              <article className={`event-area-card ${tone}`} key={title}>
                <span><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="events-agenda">
        <div className="container events-agenda-grid">
          <div className="events-agenda-copy">
            <p className="eyebrow light">Agenda atualizada</p>
            <h2>Acompanhe os próximos eventos</h2>
            <p>Datas, horários, locais e possíveis alterações são divulgados nos canais oficiais da Prefeitura e da Diretoria Municipal de Turismo.</p>
            <div className="hero-actions">
              <ExternalLink className="button pale" href={links.eventos}>Abrir calendário oficial <ArrowSquareOut /></ExternalLink>
              <ExternalLink className="button secondary" href={links.instagram}>Seguir @turismo_itatinga <InstagramLogo /></ExternalLink>
            </div>
          </div>
          <div className="events-agenda-card">
            <CalendarBlank weight="duotone" />
            <span>Informação oficial</span>
            <h3>Consulte sempre os canais da Prefeitura</h3>
            <p>A programação pode receber atualizações de data, horário ou local.</p>
          </div>
        </div>
      </section>

      <section className="events-partnership">
        <div className="container events-partnership-grid">
          <div>
            <p className="eyebrow">Parcerias e informações</p>
            <h2>Converse com a Diretoria</h2>
            <p>Para informações institucionais, sugestões ou propostas relacionadas aos eventos e ao turismo de Itatinga, entre em contato com nossa equipe.</p>
          </div>
          <ExternalLink className="button primary" href={links.whatsapp}>WhatsApp: (14) 3848-3039 <WhatsappLogo /></ExternalLink>
        </div>
      </section>
    </main>
  );
}

const honeyPillars = [
  { title: "Produção local", text: "Apiários, empreendedores e famílias que transformam conhecimento, cuidado e trabalho em produtos de qualidade.", bee: true },
  { title: "Natureza e polinização", text: "A relação com as abelhas contribui para a preservação ambiental e para o equilíbrio dos ecossistemas.", icon: Tree },
  { title: "Identidade territorial", text: "A flora regional proporciona méis com aromas, características e sabores ligados ao território de Itatinga.", icon: MapPin },
];

const honeyProducts = [
  "Mel de eucalipto",
  "Mel de laranjeira",
  "Mel de flores silvestres",
  "Própolis",
  "Pólen",
  "Geleia real",
  "Cera e derivados",
];

const honeyVarieties = [
  {
    name: "Mel de eucalipto",
    color: "Âmbar a escuro",
    flavor: "Marcante e encorpado",
    text: "Sua tonalidade, aroma e cristalização variam conforme a florada, o clima e o período da colheita.",
  },
  {
    name: "Mel de laranjeira",
    color: "Geralmente claro",
    flavor: "Suave e aromático",
    text: "É reconhecido pelo perfil delicado e costuma cristalizar mais lentamente que alguns méis de outras floradas.",
  },
  {
    name: "Mel silvestre",
    color: "Variável",
    flavor: "Complexo e singular",
    text: "Produzido a partir de diferentes flores, carrega características próprias da paisagem e da estação.",
  },
];

const hiveKnowledge = [
  {
    title: "Própolis",
    label: "Produto da colmeia",
    text: "Resina elaborada pelas abelhas a partir de substâncias vegetais. Possui compostos bioativos estudados por suas propriedades antioxidantes e antimicrobianas, mas não substitui medicamentos ou orientação profissional.",
  },
  {
    title: "Geleia real",
    label: "Nutrição da colmeia",
    text: "Substância produzida pelas abelhas operárias para alimentar larvas e a abelha-rainha. É comercializada como alimento ou suplemento, e seus possíveis efeitos à saúde continuam sendo pesquisados.",
  },
  {
    title: "Cristalização do mel",
    label: "Processo natural",
    text: "O mel puro pode cristalizar ao longo do tempo. A velocidade depende da origem floral, temperatura e armazenamento. Para recuperar a fluidez, use banho-maria brando, abaixo de 45°C, evitando o micro-ondas.",
  },
];

function HoneyPage() {
  return (
    <main id="conteudo" className="honey-page">
      <section className="honey-page-hero">
        <img src="/images/parque-ecologico.jpg" alt="Parque Ecológico Arduílio Parenti, paisagem natural de Itatinga" />
        <div className="honey-page-shade" />
        <div className="container honey-page-hero-content">
          <a className="city-back" href="#inicio">← Voltar para o início</a>
          <p className="eyebrow light">Identidade local</p>
          <h1>Itatinga,<br />Cidade do Mel</h1>
          <p>Tradição, natureza e desenvolvimento em cada colheita.</p>
        </div>
      </section>

      <section className="honey-page-intro">
        <div className="container honey-page-intro-grid">
          <div>
            <p className="eyebrow">Vocação apícola</p>
            <h2>Uma relação produtiva com a natureza</h2>
          </div>
          <div className="honey-page-lead">
            <p>Itatinga é reconhecida por sua forte vocação apícola e pelo trabalho de produtores que transformam a relação com a natureza em qualidade, tradição e desenvolvimento local.</p>
            <p>A diversidade da flora regional — formada por áreas de mata nativa, eucalipto, laranjeiras e flores silvestres — favorece a produção de méis com características próprias, aromas variados e identidade territorial.</p>
          </div>
        </div>
      </section>

      <section className="honey-project">
        <div className="container honey-project-grid">
          <div className="honey-project-photo">
            <img src="/images/coleta-mel-itatinga.jpg" alt="Apicultor durante a coleta de mel em Itatinga" />
            <span><img className="bee-inline-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" /> Natureza, trabalho e pertencimento</span>
          </div>
          <div>
            <p className="eyebrow">O projeto</p>
            <h2>Valorizar quem produz e fortalecer o território</h2>
            <p>O projeto Cidade do Mel nasce para valorizar a apicultura itatinguense, promover os produtores locais e fortalecer o mel e seus derivados como expressão da economia, da cultura rural e do turismo.</p>
            <p>A iniciativa reúne apiários, empreendedores e pontos de venda, ampliando a visibilidade do setor e aproximando moradores, visitantes e turistas da produção local.</p>
          </div>
        </div>
      </section>

      <section className="honey-pillars-section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Mais que um alimento</p><h2>Uma cadeia que gera valor</h2></div>
          </div>
          <div className="honey-pillars">
            {honeyPillars.map(({ title, text, icon: Icon, bee }) => (
              <article key={title}>
                <span>{bee ? <img className="bee-pillar-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" /> : <Icon aria-hidden="true" />}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="honey-products-section">
        <div className="container honey-products-grid">
          <div>
            <p className="eyebrow light">Sabores e derivados</p>
            <h2>Diversidade em cada produção</h2>
            <p>A produção local contempla diferentes tipos de mel e derivados, de acordo com a flora, a época da colheita e a atuação dos produtores cadastrados no município.</p>
          </div>
          <div className="honey-product-list">
            {honeyProducts.map((product) => (
              <span key={product}>
                <img className="bee-product-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" />
                {product}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="honey-varieties-section">
        <div className="container">
          <div className="honey-varieties-heading">
            <p className="eyebrow">Floradas de Itatinga</p>
            <h2>Conheça os principais tipos de mel</h2>
            <p>A origem floral influencia cor, aroma, viscosidade e sabor, conferindo identidade própria a cada colheita.</p>
          </div>
          <div className="honey-varieties">
            {honeyVarieties.map((item, index) => (
              <article key={item.name}>
                <span className="honey-number">0{index + 1}</span>
                <img className="honey-variety-logo" src="/images/logo-cidade-do-mel.png" alt="Logo do projeto Cidade do Mel" />
                <h3>{item.name}</h3>
                <dl>
                  <div><dt>Cor</dt><dd>{item.color}</dd></div>
                  <div><dt>Sabor</dt><dd>{item.flavor}</dd></div>
                </dl>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hive-knowledge-section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Conhecimento da colmeia</p><h2>Produtos, processos e consumo consciente</h2></div>
          </div>
          <div className="hive-knowledge-grid">
            {hiveKnowledge.map((item) => (
              <article key={item.title}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <aside className="honey-safety-note">
            <Info weight="fill" />
            <div>
              <strong>Informação responsável</strong>
              <p>Prefira produtos com identificação de origem e selo de inspeção. Produtos das abelhas podem provocar reações alérgicas. Mel não deve ser oferecido a crianças menores de 12 meses.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="honey-producers">
        <div className="container honey-producers-grid">
          <div>
            <p className="eyebrow">Produtores participantes</p>
            <h2>Histórias e produtos da nossa terra</h2>
            <p>Este espaço será dedicado aos produtores, apiários, empreendedores e pontos de venda participantes do projeto, reunindo suas histórias, produtos e canais de contato.</p>
            <p>Ao consumir o mel de Itatinga, você valoriza a produção local, apoia o empreendedor rural e leva consigo um pouco da essência da nossa cidade.</p>
          </div>
          <div className="honey-producer-card">
            <img className="honey-producer-logo" src="/images/logo-cidade-do-mel.png" alt="Logo do projeto Cidade do Mel" />
            <span>Parceria que fortalece o território</span>
            <h3>Conheça a APICUESTA</h3>
            <p>A associação sediada em Itatinga reúne apicultores da agricultura familiar e desenvolve um trabalho essencial para a produção, a sustentabilidade e o turismo regional.</p>
            <a className="button honey-button" href="#apicuesta">Conhecer a associação <ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="honey-closing">
        <div className="container">
          <img className="honey-closing-logo" src="/images/logo-cidade-do-mel.png" alt="Logo do projeto Cidade do Mel" />
          <p>Itatinga, Cidade do Mel</p>
          <h2>Tradição, natureza e desenvolvimento em cada colheita.</h2>
        </div>
      </section>
    </main>
  );
}

const apicuestaStats = [
  { value: "+90", label: "associados" },
  { value: "10", label: "cidades abrangidas" },
  { value: "12 mil", label: "colmeias" },
  { value: "1.000 t", label: "de mel por ano" },
];

const partnershipBenefits = [
  { title: "Turismo de experiência", text: "A apicultura aproxima visitantes da produção rural, dos saberes do campo e da identidade do território.", icon: MapPin },
  { title: "Economia local", text: "A valorização do mel fortalece produtores, empreendedores, pontos de venda e novas oportunidades de renda.", icon: Sparkle },
  { title: "Sustentabilidade", text: "A atividade incentiva o cuidado com as abelhas, a polinização, a biodiversidade e a preservação ambiental.", icon: Tree },
];

function ApicuestaPage() {
  return (
    <main id="conteudo" className="apicuesta-page">
      <section className="apicuesta-hero">
        <img src="/images/coleta-mel-itatinga.jpg" alt="Apicultor de Itatinga durante o manejo de uma colmeia" />
        <div className="apicuesta-hero-shade" />
        <div className="container apicuesta-hero-content">
          <a className="city-back" href="#cidade-do-mel">← Voltar para Cidade do Mel</a>
          <p className="eyebrow light">Associação dos Apicultores do Polo Cuesta</p>
          <h1>APICUESTA:<br />união que transforma</h1>
          <p>Produção sustentável, agricultura familiar e parceria para fortalecer o mel, o território e o turismo de Itatinga.</p>
          <ExternalLink className="button honey-button" href={links.apicuesta}>Visitar site oficial <ArrowSquareOut /></ExternalLink>
        </div>
      </section>

      <section className="apicuesta-intro">
        <div className="container apicuesta-intro-grid">
          <div>
            <p className="eyebrow">Desde 2004</p>
            <h2>Uma associação regional com raízes em Itatinga</h2>
          </div>
          <div>
            <p>Fundada em 23 de outubro de 2004, a APICUESTA abrange os municípios da região geográfica do Polo Cuesta e mantém sua sede em Itatinga.</p>
            <p>A entidade fortalece e une os apicultores, promovendo produção, beneficiamento e comercialização de maneira justa e sustentável.</p>
          </div>
        </div>
      </section>

      <section className="apicuesta-numbers">
        <div className="container">
          <p className="eyebrow light">Força coletiva</p>
          <div className="apicuesta-stats">
            {apicuestaStats.map((item) => <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}
          </div>
          <p className="apicuesta-source">Números divulgados pelo site oficial da APICUESTA.</p>
        </div>
      </section>

      <section className="honey-project apicuesta-house">
        <div className="container honey-project-grid">
          <div className="honey-project-photo">
            <img src="/images/coleta-mel-itatinga.jpg" alt="Produção apícola desenvolvida por associados da região do Polo Cuesta" />
            <span><Sparkle weight="fill" /> Cooperação, qualidade e origem</span>
          </div>
          <div>
            <p className="eyebrow">Casa do Mel</p>
            <h2>Estrutura para produzir, beneficiar e crescer</h2>
            <p>A sede de Itatinga abriga a Casa do Mel, utilizada pelo grupo para extração, beneficiamento e estocagem da produção.</p>
            <p>Essa estrutura representa organização, controle de qualidade e capacidade de agregar valor ao trabalho dos apicultores da agricultura familiar.</p>
          </div>
        </div>
      </section>

      <section className="apicuesta-tourism">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">APICUESTA + Turismo</p><h2>Uma parceria estratégica para Itatinga</h2></div>
          </div>
          <p className="apicuesta-tourism-lead">A parceria com a Diretoria Municipal de Turismo conecta produção, identidade e visitação. A APICUESTA participa do COMTUR desde 2019 e contribui para posicionar a apicultura como um dos eixos de desenvolvimento turístico do município.</p>
          <div className="honey-pillars apicuesta-pillars">
            {partnershipBenefits.map(({ title, text, icon: Icon }) => (
              <article key={title}><span><Icon /></span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="apicuesta-ig">
        <div className="container apicuesta-ig-grid">
          <div>
            <p className="eyebrow light">Identidade territorial</p>
            <h2>O caminho para a Indicação Geográfica</h2>
            <p>A associação participa da mobilização regional para o reconhecimento da Indicação Geográfica do Mel da Cuesta Paulista. O processo busca proteger a origem, valorizar a biodiversidade das floradas e fortalecer a reputação do mel produzido na região.</p>
          </div>
          <div className="apicuesta-values">
            <span>Respeito</span><span>Eficiência</span><span>Comprometimento</span><span>Sustentabilidade</span><span>União</span>
          </div>
        </div>
      </section>

      <section className="apicuesta-contact">
        <div className="container apicuesta-contact-grid">
          <div>
            <p className="eyebrow">Conheça o trabalho</p>
            <h2>Da colmeia ao desenvolvimento regional</h2>
            <p>Visite o portal da APICUESTA para conhecer sua história, produtos, projetos, parceiros e ações em defesa da apicultura.</p>
          </div>
          <ExternalLink className="button primary" href={links.apicuesta}>Acessar apicuesta.com <ArrowSquareOut /></ExternalLink>
        </div>
      </section>
    </main>
  );
}

function getActivePage() {
  if (window.location.hash === "#cidade") return "city";
  if (window.location.hash === "#agenda-eventos") return "events";
  if (window.location.hash === "#cidade-do-mel") return "honey";
  if (window.location.hash === "#apicuesta") return "apicuesta";
  return "home";
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [activePage, setActivePage] = useState(getActivePage);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(getActivePage());
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activePage]);

  const closeMenu = () => setMenuOpen(false);
  const openGuide = () => {
    closeMenu();
    setGuideOpen(true);
  };

  useEffect(() => {
    if (!guideOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setGuideOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [guideOpen]);

  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <div className="utility-bar">
        <div className="container utility-content">
          <span><MapPin weight="fill" /> Itatinga/SP</span>
          <nav aria-label="Links institucionais">
            <ExternalLink href={links.prefeitura}>Portal da Prefeitura</ExternalLink>
            <ExternalLink href="https://itatinga-prefeitura.cecam.com.br/CECAM_SISTEMAS_PORT/">Transparência</ExternalLink>
            <ExternalLink href="https://itatinga.1doc.com.br/b.php?pg=wp/wp&itd=4">Ouvidoria</ExternalLink>
          </nav>
        </div>
      </div>

      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <div className="container header-content">
          <a className="brand" href="#inicio" onClick={closeMenu}>
            <img src="/images/logo-turismo-itatinga.png" alt="Turismo Itatinga - SP" />
          </a>
          <button className="menu-button" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X /> : <List />}
          </button>
          <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Navegação principal">
            <a href="#inicio" onClick={closeMenu}>Início</a>
            <a href="#atrativos" onClick={closeMenu}>Atrativos</a>
            <a href="#agenda-eventos" onClick={closeMenu}>Eventos</a>
            <a href="#cidade-do-mel" onClick={closeMenu}>Cidade do Mel</a>
            <button type="button" onClick={openGuide}>Guia da Cidade</button>
            <a href="#contato" onClick={closeMenu}>Contato</a>
          </nav>
        </div>
      </header>

      {activePage === "city" ? <CityPage /> : activePage === "events" ? <EventsPage /> : activePage === "honey" ? <HoneyPage /> : activePage === "apicuesta" ? <ApicuestaPage /> : <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow light">Natureza, hospitalidade e tradições que encantam</p>
            <h1>Itatinga,<br />a cidade do mel</h1>
            <p className="hero-text">Natureza, gastronomia, cultura e eventos em uma cidade acolhedora que vai te encantar.</p>
            <div className="hero-actions">
              <ExternalLink className="button primary" href="https://resources.digitalmapas.com.br/map/290/0.5/0.5/2">
                Acesso Mapa Digital <MapTrifold />
              </ExternalLink>
              <a className="button secondary" href="#atrativos">Conheça os atrativos <ArrowRight /></a>
            </div>
          </div>
        </section>

        <section className="highlight-band" aria-label="Acessos turísticos">
          <div className="container highlights">
            {highlights.map(({ title, text, icon: Icon, imageIcon, tone, href, action, external }) => (
              <a
                className={`quick-link ${tone}`}
                href={action ? undefined : href}
                role={action ? "button" : undefined}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                key={title}
                onClick={action ? (event) => { event.preventDefault(); openGuide(); } : undefined}
              >
                <span className="quick-icon">
                  {imageIcon ? <img src={imageIcon} alt="" aria-hidden="true" /> : <Icon aria-hidden="true" />}
                </span>
                <span><strong>{title}</strong><small>{text}</small></span>
              </a>
            ))}
          </div>
        </section>

        <section className="section intro" id="itatinga">
          <div className="container split">
            <div className="section-copy">
              <p className="eyebrow">Conheça Itatinga</p>
              <h2>História, natureza e hospitalidade no interior paulista</h2>
              <p>Com origem em uma povoação iniciada em 1875 e emancipação celebrada em 24 de julho de 1896, Itatinga preserva tradições, paisagens rurais e uma forte identidade comunitária. Seu nome, de origem tupi, significa “Pedra Branca” e revela a ligação do município com seu território.</p>
              <a className="text-link" href="#cidade">Conheça a história de Itatinga <ArrowRight /></a>
            </div>
            <figure className="feature-image">
              <img src="/images/aerea-itatinga.jpg" alt="Vista aérea da cidade de Itatinga e de sua paisagem rural" />
              <figcaption>Itatinga: território, história e identidade local.</figcaption>
            </figure>
          </div>
        </section>

        <section className="section attractions" id="atrativos">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">O que fazer</p><h2>Atrações em destaque</h2></div>
              <button className="text-link desktop-link button-link" type="button" onClick={openGuide}>Ver guia da cidade <ArrowRight /></button>
            </div>
            <div className="attraction-grid">
              {attractions.map(({ title, text, image, icon: Icon, href, actionLabel = "Saiba mais", actionIcon: ActionIcon = ArrowSquareOut }) => (
                <article className="attraction-card" key={title}>
                  <img src={image} alt="" />
                  <div className="card-copy">
                    <Icon aria-hidden="true" />
                    <h3>{title}</h3>
                    <p>{text}</p>
                    {href && <ExternalLink className="card-action" href={href}>{actionLabel} <ActionIcon /></ExternalLink>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="honey-section" id="mel">
          <div className="container honey-grid">
            <div className="honey-copy">
              <p className="eyebrow">Identidade local</p>
              <h2>Itatinga, Cidade do Mel</h2>
              <p>O mel representa sabor, tradição, trabalho e pertencimento. Conheça uma das expressões mais marcantes da identidade turística de Itatinga.</p>
              <a className="button honey-button" href="#cidade-do-mel">
                Conheça a Cidade do Mel <ArrowRight />
              </a>
            </div>
            <div className="honey-image">
              <img src="/images/parque-ecologico.jpg" alt="Entrada do Parque Ecológico Arduílio Parenti, em Itatinga" />
              <span><Sparkle weight="fill" /> Tradição, natureza e gastronomia</span>
            </div>
          </div>
        </section>

        <section className="events" id="eventos">
          <div className="events-image"><img src="/images/eventos-praca-noturna.jpg" alt="Vista aérea noturna da Praça da Matriz durante evento municipal" /></div>
          <div className="events-copy">
            <p className="eyebrow light">Agenda municipal</p>
            <h2>Eventos que aproximam pessoas</h2>
            <p>Festas tradicionais, esporte, cultura e lazer movimentam o calendário de Itatinga. Consulte a programação oficial e participe.</p>
            <a className="button pale" href="#agenda-eventos">Ver calendário oficial <CalendarBlank /></a>
          </div>
        </section>

        <section className="section news" id="novidades">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">Acompanhe Itatinga</p><h2>Notícias e novidades</h2></div></div>
            <div className="news-layout">
              <div className="news-lead">
                <span>Portal oficial</span>
                <h3>Informação pública, turismo e desenvolvimento local</h3>
                <p>Acompanhe comunicados, ações municipais e novidades publicadas pela Prefeitura de Itatinga.</p>
                <ExternalLink className="button outline" href={links.noticias}>Acessar notícias <ArrowRight /></ExternalLink>
              </div>
              <div className="news-list">
                <ExternalLink href={links.eventos}><CalendarBlank /><span><strong>Agenda de eventos</strong>Confira datas e programação atualizada.</span><CaretRight /></ExternalLink>
                <button type="button" onClick={openGuide}><MapPin /><span><strong>Guia da cidade</strong>Encontre serviços e informações úteis.</span><CaretRight /></button>
                <ExternalLink href={links.instagram}><InstagramLogo /><span><strong>Redes oficiais</strong>Acompanhe registros e avisos da Prefeitura.</span><CaretRight /></ExternalLink>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="container contact-grid">
            <div><p className="eyebrow light">Diretoria Municipal de Turismo</p><h2>Fale com a gente</h2><p>Informações, sugestões ou parcerias para fortalecer o turismo local.</p></div>
            <div className="contact-items">
              <ExternalLink href={links.whatsapp}><WhatsappLogo weight="fill" /><span><small>WhatsApp</small>(14) 3848-3039</span></ExternalLink>
              <a href="mailto:turismo@itatinga.sp.gov.br"><EnvelopeSimple weight="fill" /><span><small>E-mail institucional</small>turismo@itatinga.sp.gov.br</span></a>
              <span><MapPin weight="fill" /><span><small>Diretoria Municipal de Turismo</small>Rua São João, 410 — Vila Prete</span></span>
            </div>
            <ExternalLink className="button pale" href={links.whatsapp}>Fale pelo WhatsApp <WhatsappLogo /></ExternalLink>
          </div>
        </section>
      </main>}

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <img className="prefeitura-logo" src="/images/logo-prefeitura-branco.png" alt="Prefeitura Municipal de Itatinga" />
            <p>Site oficial de turismo da Prefeitura Municipal de Itatinga. Informações para moradores e visitantes.</p>
          </div>
          <div>
            <h2>Links úteis</h2>
            <ExternalLink href={links.prefeitura}>Portal da Prefeitura</ExternalLink>
            <ExternalLink href={links.guia}>Guia da cidade</ExternalLink>
            <a href="#agenda-eventos">Calendário de eventos</a>
          </div>
          <div>
            <h2>Redes oficiais</h2>
            <div className="socials">
              <ExternalLink href={links.instagram} className="social-link"><InstagramLogo /><span>Instagram</span></ExternalLink>
              <ExternalLink href={links.whatsapp} className="social-link"><WhatsappLogo /><span>WhatsApp</span></ExternalLink>
            </div>
          </div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Prefeitura Municipal de Itatinga.</span><span>Conteúdo institucional e informativo.</span></div>
      </footer>

      {guideOpen && (
        <div className="guide-overlay" role="dialog" aria-modal="true" aria-labelledby="guide-title">
          <div className="guide-panel">
            <div className="guide-toolbar">
              <div>
                <span>Portal oficial</span>
                <h2 id="guide-title">Guia da Cidade</h2>
              </div>
              <div className="guide-toolbar-actions">
                <ExternalLink className="guide-external" href={links.guia}>
                  Abrir em nova aba <ArrowSquareOut />
                </ExternalLink>
                <button className="guide-close" type="button" aria-label="Fechar Guia da Cidade" onClick={() => setGuideOpen(false)}>
                  <X />
                </button>
              </div>
            </div>
            <div className="guide-notice">
              O conteúdo abaixo é fornecido pelo Portal Oficial de Turismo de Itatinga.
            </div>
            <iframe
              className="guide-frame"
              title="Guia da Cidade de Itatinga"
              src={links.guia}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      )}
    </>
  );
}
