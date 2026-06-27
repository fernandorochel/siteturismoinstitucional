import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowSquareOut, Bicycle, CalendarBlank, CaretRight, EnvelopeSimple,
  Church, Info, InstagramLogo, List, MapPin, MapTrifold,
  Tree, WhatsappLogo, X,
} from "@phosphor-icons/react";
import { AdminNewsPage } from "./admin-panel.jsx";

const links = {
  prefeitura: "https://www.itatinga.sp.gov.br/",
  cidade: "https://www.itatinga.sp.gov.br/cidade",
  guia: "https://guia.turismoitatinga.com.br/",
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
    href: "https://resources.digitalmapas.com.br/map/290?place=3000&from=list",
    actionLabel: "Ver no mapa digital",
    actionIcon: ArrowSquareOut,
  },
  {
    title: "Parque Ecológico Antônio Parenti",
    text: "Espaço de lazer inaugurado em 2024, com áreas verdes, caminhada, convivência, piqueniques e contato direto com a natureza.",
    image: "/images/parque-ecologico-antonio-parenti.jpg",
    icon: Tree,
    href: "https://resources.digitalmapas.com.br/map/290?from=list&place=2999",
    actionLabel: "Ver no mapa digital",
    actionIcon: ArrowSquareOut,
  },
  {
    title: "Balsa Itatinga/Paranapanema",
    text: "Travessia emblemática sobre o Rio Paranapanema, com belas paisagens, conexão entre municípios e uma experiência marcante no interior paulista.",
    image: "/images/balsa-itatinga-paranapanema.jpg",
    icon: Tree,
    href: "https://resources.digitalmapas.com.br/map/290?place=3001&from=list",
    actionLabel: "Ver no mapa digital",
    actionIcon: ArrowSquareOut,
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

const newsItems = [
  {
    slug: "itatinga-participa-do-9-conexidades-em-campos-do-jordao",
    title: "Itatinga participa do 9º CONEXIDADES em Campos do Jordão",
    category: "Turismo",
    date: "2026-06-21",
    dateLabel: "21 jun 2026",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/ce9821997840fda8cfc4002cbb7d4f32.webp",
    summary: "A Prefeitura de Itatinga, por meio da Diretoria de Turismo, participou do 9º CONEXIDADES, realizado em Campos do Jordão, um dos principais encontros nacionais voltados à gestão pública e à integração entre municípios, iniciativa privada e lideranças.",
    content: [
      "A Prefeitura de Itatinga, por meio da Diretoria de Turismo, participou do 9º CONEXIDADES, realizado em Campos do Jordão, um dos principais encontros nacionais voltados à gestão pública e à integração entre municípios, iniciativa privada e lideranças.",
      "Durante o evento, representantes do município acompanharam debates, trocaram experiências e fortaleceram contatos estratégicos voltados ao desenvolvimento local, à inovação, ao turismo e à geração de novas oportunidades.",
      "A participação de Itatinga reforça o compromisso da administração municipal em buscar conhecimento, parcerias e soluções que contribuam para o crescimento do município e para a valorização das nossas potencialidades turísticas."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2376/itatinga-participa-do-9-conexidades-em-campos-do-jordao/",
  },
  {
    slug: "festa-do-trabalhador-2026-reune-grande-publico-e-consagra-novas-representantes-da-beleza-itatinguense",
    title: "FESTA DO TRABALHADOR 2026 REÚNE GRANDE PÚBLICO E CONSAGRA NOVAS REPRESENTANTES DA BELEZA ITATINGUENSE",
    category: "Festa do Trabalhador",
    date: "2026-05-06",
    dateLabel: "6 mai 2026",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/2a8c640b1800a01398a76c52f9a0fe1e.webp",
    summary: "A tradicional Festa do Trabalhador 2026 movimentou Itatinga com uma programação diversificada, reunindo apresentações culturais, atrações musicais, atividades esportivas e o aguardado concurso de beleza, que mais uma vez destacou o talento, a simpatia e a elegância das participantes do município.",
    content: [
      "A tradicional Festa do Trabalhador 2026 movimentou Itatinga com uma programação diversificada, reunindo apresentações culturais, atrações musicais, atividades esportivas e o aguardado concurso de beleza, que mais uma vez destacou o talento, a simpatia e a elegância das participantes do município.",
      "O concurso foi realizado em diferentes categorias — Mini Miss, Miss Infantil, Miss Trabalhador e Miss Itatinga — contando com a participação de dezenas de candidatas avaliadas por corpo de jurados nos quesitos beleza, desenvoltura, simpatia e passarela. O evento atraiu familiares, torcidas organizadas e grande público, fortalecendo a tradição da Festa do Trabalhador.",
      "Na categoria principal, o título de Miss Itatinga 2026 ficou com Ingrid Fernanda Oliveira da Silva, que conquistou pontuação máxima na avaliação dos jurados. A faixa de 1ª Princesa ficou com Laisa Teles dos Santos, enquanto Maria Aparecida Elida Carvalho recebeu o título de 2ª Princesa.",
      "Já na categoria Miss Infantil, Sophia de Oliveira Ramon foi coroada campeã da edição 2026. Ingrid Isabella Vaz Bueno conquistou o título de 1ª Princesa e Laura Andrade Geremias ficou como 2ª Princesa, após critério de desempate no quesito simpatia.",
      "Na disputa do Miss Trabalhador, Mirela Beatriz da Silva conquistou o primeiro lugar. Gabriella Costa do Nascimento recebeu a faixa de 1ª Princesa e Ana Julia de Morais ficou com o título de 2ª Princesa, com desempate definido pelo quesito passarela.",
      "Entre as pequenas participantes da categoria Mini Miss, Valentina Lourenço Escobar foi a grande vencedora. Helena Oliveira Domingues ficou com a faixa de 1ª Princesa e Laura Magna Costa recebeu o título de 2ª Princesa.",
      "Além do concurso, a Festa do Trabalhador contou com apresentações artísticas, shows musicais com artistas locais, atividades culturais e ampla participação popular, consolidando-se como um dos eventos mais tradicionais do calendário municipal.",
      "A organização destacou o alto nível das candidatas e agradeceu o envolvimento das famílias, apoiadores, patrocinadores, jurados e equipe organizadora, que contribuíram para o sucesso da edição 2026.",
      "O concurso reafirma o objetivo de valorizar a autoestima, a cultura, a participação social e o protagonismo das jovens itatinguenses, mantendo viva uma tradição que atravessa gerações no município."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2375/festa-do-trabalhador-2026-reune-grande-publico-e-consagra-novas-representantes-da-beleza-itatinguense/",
  },
  {
    slug: "programacao-da-festa-do-trabalhador-2026",
    title: "Programação da Festa do Trabalhador 2026",
    category: "Festa do Trabalhador",
    date: "2026-03-24",
    dateLabel: "24 mar 2026",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/e254be8a45fae14bdd5bcd97f753a8a5.webp",
    summary: "A programação da Festa do Trabalhador 2026 continua trazendo grandes atrações para o público. No dia 02 de maio (sábado), a Praça da Família será palco da apresentação da Banda New Balance, um dos destaques musicais da região.",
    content: [
      "A programação da Festa do Trabalhador 2026 continua trazendo grandes atrações para o público. No dia 02 de maio (sábado), a Praça da Família será palco da apresentação da Banda New Balance, um dos destaques musicais da região.",
      "Reconhecida pela versatilidade de seu repertório e por um espetáculo que combina qualidade sonora e efeitos de iluminação, a banda promete proporcionar uma noite memorável para moradores e visitantes.",
      "O evento está sendo cuidadosamente planejado pela Prefeitura de Itatinga, com foco em segurança do público, organização do espaço, ambiente familiar e acolhedor e infraestrutura adequada para receber visitantes.",
      "A proposta é oferecer uma experiência completa de lazer, valorizando o trabalhador e fortalecendo o turismo local.",
      "A Festa do Trabalhador é um momento de celebração e reconhecimento, além de uma excelente oportunidade para conhecer Itatinga e vivenciar um evento que une música, convivência e valorização da comunidade."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2374/programacao-da-festa-do-trabalhador-2026-/",
  },
  {
    slug: "i-festival-de-rock-de-itatinga-2026",
    title: "I Festival de Rock de Itatinga 2026",
    category: "Festa do Trabalhador",
    date: "2026-03-24",
    dateLabel: "24 mar 2026",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/1559eb5ad3ce48fc9cbaf8004a32ec93.webp",
    summary: "O município de Itatinga promoverá, no dia 03 de maio de 2026, na Praça da Família, o I Festival de Rock de Itatinga, evento que integra a programação da tradicional Festa do Trabalhador.",
    content: [
      "O município de Itatinga promoverá, no dia 03 de maio de 2026, na Praça da Família, o I Festival de Rock de Itatinga, evento que integra a programação da tradicional Festa do Trabalhador.",
      "Com entrada gratuita, o festival tem como objetivo fomentar o turismo local, valorizar a produção musical e proporcionar à população e visitantes uma experiência cultural e de lazer ao ar livre, reunindo diferentes estilos dentro do rock.",
      "A programação contará com apresentações ao longo de todo o dia, iniciando às 10h00, com a participação das bandas Golden Start, Scream Within, Beer Rock, 75Conto, Território 9, Imunidade 14, Encruzilhada e Rancheros.",
      "Realizado em espaço público estruturado, o evento reforça o compromisso do município com o fortalecimento do turismo, promovendo entretenimento de qualidade e incentivando a circulação de visitantes, contribuindo diretamente para o desenvolvimento econômico local.",
      "A Praça da Família será o ponto de encontro para moradores e turistas que desejam aproveitar um dia de música, convivência e celebração."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2373/i-festival-de-rock-de-itatinga-2026/",
  },
  {
    slug: "itatinga-brilha-na-v-famel-e-ii-copmais-um-marco-para-a-cidade-do-mel",
    title: "Itatinga brilha na V FAMEL e II COPMAIS: Um marco para a \"Cidade do Mel\"",
    category: "Eventos",
    date: "2026-03-17",
    dateLabel: "17 mar 2026",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/85a06d18e437a2a9b3f6cd727e684093.webp",
    summary: "O setor apícola paulista viveu dias de intensa inovação e troca de experiências durante a V FAMEL e o II COPMAIS. Itatinga, a nossa \"Cidade do Mel\", foi protagonista do evento e reforçou sua liderança no setor.",
    content: [
      "O setor apícola paulista viveu dias de intensa inovação e troca de experiências durante a V FAMEL e o II COPMAIS, realizados nos dias 12 e 13 de março. Itatinga, a nossa \"Cidade do Mel\", foi protagonista do evento sediado no campus da Uneduvale, reafirmando sua liderança regional e estadual no setor.",
      "A participação de Itatinga, viabilizada pelo apoio da Prefeitura Municipal, focou na profissionalização e na busca por novas frentes de mercado. Durante os dois dias de programação, os produtores locais mergulharam em discussões sobre manejo avançado de colmeias e novas tecnologias para garantir pureza e produtividade.",
      "Minicursos práticos e painéis sobre meliponicultura foram pontos altos, permitindo que a comitiva retornasse com conhecimentos atualizados para fortalecer a economia agrícola da cidade.",
      "O estande de Itatinga foi um dos mais visitados da feira, servindo como vitrine para a qualidade superior do mel local e reforçando o compromisso da administração com o desenvolvimento sustentável e a valorização da identidade local."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2372/itatinga-brilha-na-v-famel-e-ii-copmais-um-marco-para-a-cidade-do-mel/",
  },
  {
    slug: "vem-ai-a-festa-do-trabalhador-de-itatinga-2026",
    title: "VEM AÍ A FESTA DO TRABALHADOR DE ITATINGA 2026",
    category: "Festa do Trabalhador",
    date: "2026-02-03",
    dateLabel: "3 fev 2026",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/55e5e99569b49e72a86a93e4a24ade66.webp",
    summary: "Evento com entrada gratuita acontecerá de 01 a 03 de maio no bairro Terras de São José, trazendo o I Festival de Rock, Corrida do Trabalhador e concursos de miss, além de fomentar o turismo regional.",
    content: [
      "Evento com entrada gratuita acontecerá de 01 a 03 de maio no bairro Terras de São José, trazendo o I Festival de Rock, Corrida do Trabalhador e concursos de miss, além de fomentar o turismo regional.",
      "A Prefeitura Municipal de Itatinga prepara um grande evento para celebrar o Dia do Trabalhador em 2026, oferecendo três dias de programação intensa e gratuita para toda a família.",
      "Com o lema \"A sua dedicação é o que nos move\", a festa foi planejada para ir além da celebração, atuando como impulsionadora do turismo de eventos e da economia local.",
      "A programação inclui atrações locais, banda show, Festival de Rock, concursos de miss, corrida, praça de alimentação, espaço food truck, doces caseiros, artesanato local e brinquedos para as crianças."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2371/vem-ai-a-festa-do-trabalhador-de-itatinga-2026/",
  },
  {
    slug: "feira-do-empreendedor-2025",
    title: "Feira do Empreendedor 2025",
    category: "Eventos",
    date: "2025-10-18",
    dateLabel: "18 out 2025",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/f752411f00cd263a5d40549f1b675f42.jpeg",
    summary: "De 15 a 18 de outubro, a Feira do Empreendedor 2025 movimentou o São Paulo Expo, reunindo visitantes e empreendedores de todo o país. Itatinga participou reforçando seu potencial turístico e econômico.",
    content: [
      "De 15 a 18 de outubro, a Feira do Empreendedor 2025 movimentou o São Paulo Expo, reunindo visitantes e empreendedores de todo o país.",
      "Itatinga participou levando ao público o potencial turístico e econômico do município. Em um ano especial, com o título de Município de Interesse Turístico, o estande apresentou atrações locais, projetos de desenvolvimento sustentável e iniciativas como a Cidade do Mel.",
      "A participação contou com a presença da Diretoria de Turismo, Lazer e Eventos, além da Diretoria de Indústria e Comércio e empresários locais, reforçando oportunidades de investimento e o dinamismo da economia de Itatinga."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2370/feira-do-empreendedor-2025/",
  },
  {
    slug: "brasil-honey-show-2025",
    title: "Brasil Honey Show 2025",
    category: "Eventos",
    date: "2025-09-07",
    dateLabel: "7 set 2025",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/63973dba287fcfb8354f8869c2a04c75.jpeg",
    summary: "Entre os dias 5 e 7 de setembro, Botucatu recebeu o Brasil Honey Show 2025. Itatinga marcou presença com o projeto Cidade do Mel e fortaleceu parcerias para o futuro do setor.",
    content: [
      "Entre os dias 5 e 7 de setembro, Botucatu recebeu o Brasil Honey Show 2025, um dos maiores eventos do setor apícola do país.",
      "Itatinga marcou presença de forma especial. Reconhecida como Município de Interesse Turístico e em evidência com o projeto Cidade do Mel, a cidade levou ao evento o trabalho de seus produtores locais e divulgou as potencialidades da região.",
      "A participação teve como foco ampliar a visibilidade do município no cenário nacional, valorizar a atividade apícola e incentivar o desenvolvimento econômico e sustentável.",
      "Durante os três dias de programação, Itatinga mostrou a força de seus apicultores, artesãos e empreendedores, reforçando o papel da apicultura como patrimônio cultural e diferencial turístico."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2369/brasil-honey-show-2025/",
  },
  {
    slug: "itatinga-no-8-conexidades",
    title: "ITATINGA NO 8º CONEXIDADES!",
    category: "Eventos",
    date: "2025-08-08",
    dateLabel: "8 ago 2025",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/0661891ab11a772e779724584ac90a66.jpeg",
    summary: "A cidade de Itatinga encerrou sua participação no 8º Conexidades com entusiasmo, destacando cultura, empreendedorismo e novas conexões para o desenvolvimento local.",
    content: [
      "A cidade de Itatinga encerrou sua participação no 8º Conexidades com entusiasmo e satisfação.",
      "Durante o evento, realizado em Holambra, Itatinga esteve representada por artesãos, músicos e empreendedores locais, que demonstraram talento, criatividade e o potencial cultural e econômico do município.",
      "Ao longo dos dias, os representantes de Itatinga participaram de trocas de experiências e estabeleceram conexões valiosas com outras cidades e empresas privadas.",
      "Essas parcerias fortalecem o turismo, a cultura e a economia local, abrindo novas oportunidades para o desenvolvimento da cidade."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2368/itatinga-no-8-conexidades/",
  },
  {
    slug: "escolha-da-rainha-do-rodeio-2025",
    title: "ESCOLHA DA RAINHA DO RODEIO 2025",
    category: "25º Festa do Peão",
    date: "2025-07-23",
    dateLabel: "23 jul 2025",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/2d8f1a08dac4c4c7eee81b0d2f134753.jpeg",
    summary: "A Festa do Peão de Itatinga celebrou sua 25ª edição com rodeios, atrações musicais e o retorno da Escolha da Rainha do Rodeio, um dos momentos mais simbólicos da festa.",
    content: [
      "A Festa do Peão de Itatinga celebrou sua 25ª edição com rodeios, atrações musicais e o retorno da Escolha da Rainha do Rodeio, um dos momentos mais simbólicos da festa.",
      "Após alguns anos fora da programação, o concurso voltou com força total e emocionou o público presente no Recinto de Rodeios.",
      "O desfile das candidatas foi marcado por elegância, carisma e respeito à cultura sertaneja, com jovens que representaram com orgulho a mulher itatinguense e o espírito da festa.",
      "O sucesso da edição 2025 reforça o valor simbólico do concurso e abre espaço para que ele permaneça como parte fixa das próximas edições da Festa do Peão."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2367/escolha-da-rainha-do-rodeio-2025/",
  },
  {
    slug: "2-forum-regional-de-turismo-da-cuesta-paulista",
    title: "2º Fórum Regional de Turismo da Cuesta Paulista",
    category: "Eventos",
    date: "2025-05-29",
    dateLabel: "29 mai 2025",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/1b5c34994353c5576ec3f600be3896c3.jpeg",
    summary: "A Diretoria de Turismo de Itatinga participou do 2º Fórum Regional de Turismo da Cuesta Paulista, discutindo estratégias e oportunidades para fortalecer o turismo regional.",
    content: [
      "A Diretoria de Turismo de Itatinga participou ativamente do 2º Fórum Regional de Turismo da Cuesta Paulista, realizado no Parque Tecnológico de Botucatu.",
      "O evento reuniu representantes dos municípios da região para discutir estratégias, desafios e oportunidades para o fortalecimento do turismo regional.",
      "Um dos destaques foi a presença de apicultores de Itatinga, que apoiaram a participação da Diretoria expondo produtos derivados do mel, um dos atrativos da produção rural itatinguense.",
      "A participação reafirma o empenho da gestão municipal em fomentar o turismo como vetor de desenvolvimento econômico e valorização da identidade cultural."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2362/2-forum-regional-de-turismo-da-cuesta-paulista/",
  },
  {
    slug: "conheca-as-campeas-do-concurso-de-miss-realizado-na-festa-do-trabalhador-de-2025",
    title: "Conheça as Campeãs do Concurso de Miss, Realizado na Festa do Trabalhador de 2025",
    category: "Festa do Trabalhador",
    date: "2025-05-07",
    dateLabel: "7 mai 2025",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/5a237b8dbb1dd78fb7910dab11f8392a.jpeg",
    summary: "A tradicional Festa do Trabalhador de Itatinga foi marcada por celebrações culturais, música e valorização da beleza e da representatividade feminina em diversas faixas etárias.",
    content: [
      "A tradicional Festa do Trabalhador de Itatinga foi marcada por celebrações culturais, música e valorização da beleza e da representatividade feminina em diversas faixas etárias.",
      "Um dos momentos mais aguardados do evento foi o Concurso de Miss, que premiou candidatas em quatro categorias: Mini Miss, Miss Infantil, Miss Trabalhador e Miss Itatinga.",
      "Com grande participação popular, o desfile contou com a presença de jurados convidados e foi uma vitrine de autoestima, carisma e desenvoltura das concorrentes.",
      "A atividade reforça o compromisso da Prefeitura com a valorização da cultura, da autoestima e da participação comunitária em eventos que fortalecem os laços sociais."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2360/conheca-as-campeas-do-concurso-de-miss-realizado-na-festa-do-trabalhador-de-2025/",
  },
  {
    slug: "itatinga-esteve-presente-na-iv-famel-e-i-copmais",
    title: "ITATINGA ESTEVE PRESENTE NA IV FAMEL e I COPMAIS",
    category: "Eventos",
    date: "2025-03-17",
    dateLabel: "17 mar 2025",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/d21b69387d181dfbc0fb9532acf1d1de.jpeg",
    summary: "A Prefeitura Municipal de Itatinga participou da IV FAMEL e da I COPMAIS, apresentando o projeto Cidade do Mel e divulgando os atrativos turísticos do município.",
    content: [
      "A Prefeitura Municipal de Itatinga participou da IV FAMEL e da I COPMAIS, realizados nos dias 13 e 14 de março de 2025, na cidade de Avaré.",
      "O evento foi organizado pela Universidade Eduvale de Avaré, em parceria com a SAA/CATI e a Associação de Apicultores AAMARE.",
      "Com a participação de apicultores de Itatinga, foi possível apresentar o projeto Cidade do Mel, lançar o livreto de receitas e divulgar os atrativos turísticos do município.",
      "Foi um momento valioso de aprendizado, inovação e fortalecimento da apicultura sustentável."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2358/itatinga-esteve-presente-na-iv-famel-e-i-copmais/",
  },
  {
    slug: "como-voce-ve-o-turismo-de-itatinga",
    title: "COMO VOCÊ VÊ O TURISMO DE ITATINGA?",
    category: "Turismo",
    date: "2025-01-22",
    dateLabel: "22 jan 2025",
    image: "https://www.turismo.itatinga.sp.gov.br/admin/globalarq/noticia/noticia/651_366/ca4acb9edbd4be42ced5ebdf6112eeed.jpeg",
    summary: "Convidamos você a participar da Pesquisa Online de Percepção do Turismo, promovida pela Secretaria de Turismo e Viagens do Estado de São Paulo em parceria com o Centro de Inteligência da Economia do Turismo.",
    content: [
      "Convidamos você a participar da Pesquisa Online de Percepção do Turismo, promovida pela Secretaria de Turismo e Viagens do Estado de São Paulo em parceria com o Centro de Inteligência da Economia do Turismo.",
      "Quanto mais respostas alcançarmos, mais conseguiremos planejar novas estratégias sustentáveis, melhorando o bem-estar de todos.",
      "Participe pelo formulário oficial e ajude a fortalecer o turismo de Itatinga."
    ],
    officialUrl: "https://www.turismo.itatinga.sp.gov.br/noticia/2357/como-voce-ve-o-turismo-de-itatinga-/",
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
    icon: MapPin,
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
  { title: "Cultura e lazer", text: "Programações para todas as idades, com convivência, arte e entretenimento.", bee: true, tone: "blue" },
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
      {
        date: "22 a 25",
        title: "26ª Festa do Peão",
        href: "https://festadopeao.turismoitatinga.com.br",
        logo: "/images/logo-festa-peao-2026.png",
        actionLabel: "Acessar portal do evento",
      },
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
                      <div className="calendar-event-content">
                        {event.href ? (
                          <ExternalLink className="calendar-event-link" href={event.href}>
                            <strong>{event.title}</strong>
                          </ExternalLink>
                        ) : (
                          <strong>{event.title}</strong>
                        )}
                        {event.logo && event.href ? (
                          <ExternalLink className="calendar-event-logo-link" href={event.href}>
                            <img className="calendar-event-logo" src={event.logo} alt={`Logo do evento ${event.title}`} />
                          </ExternalLink>
                        ) : null}
                        {event.href && event.actionLabel ? (
                          <ExternalLink className="calendar-event-action" href={event.href}>
                            {event.actionLabel} <ArrowSquareOut />
                          </ExternalLink>
                        ) : null}
                      </div>
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
            {eventAreas.map(({ title, text, icon: Icon, bee, tone }) => (
              <article className={`event-area-card ${tone}`} key={title}>
                <span>{bee ? <img className="bee-card-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" /> : <Icon aria-hidden="true" />}</span>
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

const beekeepersHoneyProducts = [
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
          <div className="honey-producer-cards">
            <div className="honey-producer-card">
              <img className="honey-producer-logo" src="/images/logo-cidade-do-mel.png" alt="Logo do projeto Cidade do Mel" />
              <span>Rede local de produção</span>
              <h3>Apicultores do Projeto</h3>
              <p>Conheça o espaço dedicado aos apicultores participantes, com foco em identidade local, produção rural, derivados do mel e oportunidades de aproximação com o turismo.</p>
              <a className="button honey-button" href="#apicultores">Acessar apicultores <ArrowRight /></a>
            </div>
            <div className="honey-producer-card">
              <img className="honey-producer-logo" src="/images/logo-cidade-do-mel.png" alt="Logo do projeto Cidade do Mel" />
              <span>Parceria que fortalece o território</span>
              <h3>Conheça a APICUESTA</h3>
              <p>A associação sediada em Itatinga reúne apicultores da agricultura familiar e desenvolve um trabalho essencial para a produção, a sustentabilidade e o turismo regional.</p>
              <a className="button honey-button" href="#apicuesta">Conhecer a associação <ArrowRight /></a>
            </div>
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
  { title: "Economia local", text: "A valorização do mel fortalece produtores, empreendedores, pontos de venda e novas oportunidades de renda.", bee: true },
  { title: "Sustentabilidade", text: "A atividade incentiva o cuidado com as abelhas, a polinização, a biodiversidade e a preservação ambiental.", icon: Tree },
];

const beekeepersInstitutionalCards = [
  { title: "Tradição familiar", text: "Gerações de apicultores mantêm vivos saberes, técnicas e vínculos afetivos com o campo e com as abelhas." },
  { title: "Produção local", text: "Méis, própolis e derivados revelam a diversidade das floradas de Itatinga e fortalecem a economia rural." },
  { title: "Respeito à natureza", text: "A apicultura valoriza a polinização, a biodiversidade e uma relação equilibrada entre produção e preservação ambiental." },
  { title: "Turismo e experiências", text: "O visitante encontra produtos autênticos, histórias inspiradoras e vivências que aproximam produção e território." },
];

const beekeepers = [
  { name: "Apiários José Andrades", story: "José Aparecido, nascido em Itatinga, atua na apicultura há oito anos em uma empresa familiar dedicada à produção de mel de laranjeira, eucalipto e silvestre. Também cria abelhas sem ferrão, como Jataí e Mandaçaia.", products: "Mel de laranjeira, mel de eucalipto, mel silvestre e abelhas sem ferrão.", phone: "5514998621862", displayPhone: "(14) 99862-1862" },
  { name: "Apiário Fidélis", story: "Com mais de 60 anos de história, o Apiário Fidélis é marcado pela tradição familiar, dedicação e amor pelas abelhas. Fundado em 1960, mantém viva uma trajetória que atravessa gerações.", products: "Mel e produção apícola de tradição familiar.", phone: "5514997728926", displayPhone: "(14) 99772-8926" },
  { name: "Apiário Mel Puro Mel", story: "Lourival Almeida retomou a apicultura em 2017 e hoje integra a Associação de Itatinga. Para ele, trabalhar com abelhas é uma terapia para a mente e uma renovação para a alma.", products: "Mel e produção apícola artesanal.", phone: "5514996021308", displayPhone: "(14) 99602-1308" },
  { name: "Apiários Andrade", story: "Com mais de 40 anos de experiência, o Apiários Andrade une tradição familiar e qualidade na produção de méis de laranjeira, eucalipto e flores silvestres, em uma região marcada pela diversidade de biomas.", products: "Mel de laranjeira, eucalipto e flores silvestres.", phone: "5514996975852", displayPhone: "(14) 99697-5852" },
  { name: "Apiários Santos", story: "Edmundo Ferreira dos Santos trabalha ao lado do filho na produção de mel de eucalipto, laranjeira, silvestre e própolis. Também é membro da Associação de Mel.", products: "Mel de eucalipto, laranjeira, silvestre e própolis.", phone: "5514996793703", displayPhone: "(14) 99679-3703" },
  { name: "Apiários Roque", story: "Cibele vem de uma família tradicional de apicultores e atua ao lado do marido, Marco. Para ela, a apicultura é mais do que uma profissão: é um estilo de vida e uma lição diária de organização, cooperação e respeito à natureza.", products: "Mel e derivados produzidos com tradição familiar.", phone: "5514996547222", displayPhone: "(14) 99654-7222" },
  { name: "A.J Rodrigues Apiários", story: "Adrian pertence à terceira geração de apicultores. Recebeu sua primeira colmeia aos 14 anos e hoje trabalha ao lado da esposa Júlia, mantendo vivo o legado familiar.", products: "Mel e produção apícola com herança familiar.", phone: "5514997128566", displayPhone: "(14) 99712-8566" },
  { name: "LM Rodrigues Apiários", story: "Rosalina descobriu na apicultura sua verdadeira paixão e há 13 anos atua na atividade ao lado do marido. Sua família representa a terceira geração de apicultores.", products: "Mel e produção apícola em família.", phone: "5514998987228", displayPhone: "(14) 99898-7228" },
  { name: "Mel Cuesta Doce Tesouro", story: "A empresa Mel Cuesta Doce Tesouro, conhecida como Lúcia do Mel, está localizada em Itatinga e produz mel de flores silvestres, laranja e eucalipto, além de própolis, pólen desidratado, geleia real e cera.", products: "Mel, própolis, pólen desidratado, geleia real e cera.", phone: "5514996547222", displayPhone: "(14) 99654-7222 / (14) 99700-3941" },
  { name: "Néctar Brasileiro", story: "Fundado em outubro de 2023 por Bruno Natalício e Vanessa Fogaça, o Néctar Brasileiro nasceu da experiência de 10 anos do casal na apicultura. A empresa foi reconhecida no Brasil Honey Show, em Botucatu, conquistando o 3º lugar na categoria “Melhor Mel Apis”.", products: "Mel premiado e produção apícola contemporânea.", phone: "5514996094647", displayPhone: "(14) 99609-4647" },
];

const beekeepersQuotes = [
  "Trabalhar com abelhas é uma verdadeira terapia para a mente e uma renovação para a alma.",
  "A apicultura é muito mais do que um negócio: é uma missão de vida.",
  "As abelhas ensinam organização, cooperação, resiliência e harmonia com a natureza.",
];

const honeyProducts = [
  "Mel de laranjeira",
  "Mel de eucalipto",
  "Mel silvestre",
  "Própolis",
  "Pólen",
  "Cera",
  "Geleia real",
  "Mel de abelhas sem ferrão",
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
            <span><img className="bee-inline-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" /> Cooperação, qualidade e origem</span>
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
            {partnershipBenefits.map(({ title, text, icon: Icon, bee }) => (
              <article key={title}><span>{bee ? <img className="bee-pillar-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" /> : <Icon />}</span><h3>{title}</h3><p>{text}</p></article>
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

function BeekeepersPage() {
  return (
    <main id="conteudo" className="apicultores-page">
      <section className="apicultores-hero">
        <img src="/images/coleta-mel-itatinga.jpg" alt="Apicultor de Itatinga apresentando um quadro de mel durante o manejo das colmeias" />
        <div className="apicultores-hero-shade" />
        <div className="container apicultores-hero-content">
          <a className="city-back" href="#cidade-do-mel">← Voltar para Cidade do Mel</a>
          <p className="eyebrow light">Conheça quem faz da nossa cidade um lugar mais doce</p>
          <h1>Nossos<br />Apicultores</h1>
          <p>Tradição, dedicação e amor pelas abelhas. Conheça as histórias de quem transforma a natureza em puro mel.</p>
          <div className="hero-actions">
            <a className="button honey-button" href="#apicultores-lista">Conheça os apicultores <ArrowRight /></a>
            <ExternalLink className="button secondary-light" href="https://resources.digitalmapas.com.br/map/290/0.5/0.5/2">Planeje sua visita <MapTrifold /></ExternalLink>
          </div>
        </div>
      </section>

      <section className="apicultores-intro">
        <div className="container apicultores-intro-grid">
          <div>
            <p className="eyebrow">Cidade do Mel – Nossos Apicultores</p>
            <h2>Cada pote de mel carrega uma história de família, trabalho e respeito à natureza</h2>
          </div>
          <div>
            <p>O Projeto Cidade do Mel valoriza os produtores locais, suas histórias, seus saberes e a relação de respeito com as abelhas e com a natureza. Esta página apresenta os apicultores participantes, destacando sua importância para o turismo, a economia local, a preservação ambiental e a identidade do município de Itatinga.</p>
            <p>Por enquanto, os cards utilizam uma imagem padrão institucional. Assim que você enviar as fotos individuais, a estrutura já estará pronta para substituição sem refazer o layout da página.</p>
          </div>
        </div>
      </section>

      <section className="apicultores-highlights">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A apicultura como identidade de Itatinga</p>
              <h2>Produção local, tradição e experiências que fortalecem o território</h2>
            </div>
          </div>
          <div className="apicultores-cards">
            {beekeepersInstitutionalCards.map(({ title, text }) => (
              <article key={title}>
                <img className="bee-pillar-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="apicultores-directory" id="apicultores-lista">
        <div className="container apicultores-cta-grid">
          <div>
            <p className="eyebrow">Nossos apicultores</p>
            <h2>Conheça quem mantém vivas as tradições da apicultura em Itatinga</h2>
            <p>Os cards abaixo já funcionam como uma vitrine institucional do projeto. Eles foram preparados para receber foto, resumo da história, produtos principais, contato por WhatsApp e futuros desdobramentos como QR Codes, modal ou página individual de cada participante.</p>
          </div>
          <div className="apicultores-directory-summary">
            <img src="/images/aerea-itatinga.jpg" alt="Imagem institucional de Itatinga utilizada como apoio visual da página de apicultores" />
            <span><img className="bee-inline-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" /> Histórias, produtos e pertencimento local</span>
          </div>
        </div>
        <div className="container">
          <div className="apicultores-grid">
            {beekeepers.map(({ name, story, products, phone, displayPhone }) => (
              <article className="apicultor-card" key={name}>
                <img src="/images/coleta-mel-itatinga.jpg" alt={`Imagem institucional temporária do ${name}`} />
                <div className="apicultor-card-body">
                  <h3>{name}</h3>
                  <p>{story}</p>
                  <div className="apicultor-products">
                    <strong>Produtos principais</strong>
                    <span>{products}</span>
                  </div>
                  <div className="apicultor-actions">
                    <ExternalLink className="button primary" href={`https://wa.me/${phone}`}>WhatsApp <WhatsappLogo /></ExternalLink>
                    <a className="button honey-button" href="#contato">Saiba mais <ArrowRight /></a>
                  </div>
                  <small>{displayPhone}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="apicultores-voices">
        <div className="container">
          <p className="eyebrow">Vozes da apicultura</p>
          <div className="apicultores-voices-grid">
            {beekeepersQuotes.map((quote) => (
              <blockquote key={quote}>
                <img className="bee-pillar-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" />
                <p>{quote}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="apicultores-products">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Produtos da Cidade do Mel</p>
              <h2>Sabores e derivados que representam Itatinga</h2>
            </div>
          </div>
          <div className="apicultores-products-grid">
            {beekeepersHoneyProducts.map((item) => (
              <article key={item}>
                <img className="bee-pillar-logo" src="/images/logo-cidade-do-mel.png" alt="" aria-hidden="true" />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="apicultores-tourism">
        <div className="container apicultores-tourism-grid">
          <div className="apicultores-tourism-copy">
            <p className="eyebrow">Viva a experiência Cidade do Mel</p>
            <h2>Conheça de perto a produção de mel e valorize os produtores locais</h2>
            <p>Conheça de perto a produção de mel, valorize os produtores locais e descubra os sabores que fazem parte da identidade de Itatinga. A página já está preparada para crescer como uma vitrine turística, institucional e acolhedora do projeto.</p>
            <div className="apicultores-cta-actions">
              <ExternalLink className="button primary" href="https://resources.digitalmapas.com.br/map/290/0.5/0.5/2">Planeje sua visita <MapTrifold /></ExternalLink>
              <ExternalLink className="button honey-button" href={links.whatsapp}>Fale com a Diretoria de Turismo <WhatsappLogo /></ExternalLink>
              <a className="button secondary" href="#cidade-do-mel">Conheça os produtos locais <ArrowRight /></a>
            </div>
          </div>
          <figure className="apicultores-tourism-image">
            <img src="/images/aerea-itatinga.jpg" alt="Imagem padrão de Itatinga para a seção turística da página de apicultores" />
            <figcaption>Itatinga: natureza, produção local e acolhimento.</figcaption>
          </figure>
        </div>
      </section>

      <section className="apicultores-footer">
        <div className="container apicultores-footer-grid">
          <div>
            <p className="eyebrow">Cidade do Mel – Itatinga/SP</p>
            <h2>Diretoria de Turismo de Itatinga</h2>
            <p>Conteúdo institucional criado para apresentar os apicultores participantes, fortalecer a imagem do município e valorizar o turismo ligado à apicultura, à natureza e à produção local.</p>
          </div>
          <div className="apicultores-footer-actions">
            <ExternalLink className="button primary" href={links.instagram}>Instagram oficial <InstagramLogo /></ExternalLink>
            <ExternalLink className="button honey-button" href={links.whatsapp}>Contato por WhatsApp <WhatsappLogo /></ExternalLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function NewsPage({ items }) {
  return (
    <main id="conteudo" className="news-page">
      <section className="news-page-hero">
        <div className="news-page-shade" />
        <div className="container news-page-hero-content">
          <a className="city-back" href="#inicio">← Voltar para o início</a>
          <p className="eyebrow light">Informação pública e turismo local</p>
          <h1>Notícias de Itatinga</h1>
          <p>Acompanhe novidades, ações, eventos e conteúdos institucionais organizados em uma página própria dentro do site.</p>
        </div>
      </section>

      <section className="news-page-listing">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Últimas publicações</p>
              <h2>Turismo, eventos e desenvolvimento local</h2>
            </div>
          </div>

          <div className="news-cards-grid">
            {items.map((item) => (
              <a className="news-card" href={`#noticia/${item.slug}`} key={item.slug}>
                <img src={item.image} alt={item.title} />
                <div className="news-card-body">
                  <div className="news-meta">
                    <span>{item.category}</span>
                    <small>{item.dateLabel}</small>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="news-card-actions">
                    <span className="button primary">Ler reportagem completa <ArrowRight /></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function NewsArticlePage({ article }) {
  if (!article) {
    return (
      <main id="conteudo" className="news-article-page">
        <section className="news-article-shell">
          <div className="container">
            <a className="city-back news-back-dark" href="#noticias">← Voltar para notícias</a>
            <div className="news-article-empty">
              <p className="eyebrow">Conteúdo não encontrado</p>
              <h1>Esta notícia não está disponível.</h1>
              <a className="button primary" href="#noticias">Ver todas as notícias <ArrowRight /></a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="conteudo" className="news-article-page">
      <section className="news-article-shell">
        <div className="container">
          <a className="city-back news-back-dark" href="#noticias">← Voltar para notícias</a>
          <article className="news-article-card">
            <img className="news-article-cover" src={article.image} alt={article.title} />
            <div className="news-article-content">
              <div className="news-meta">
                <span>{article.category}</span>
                <small>{article.dateLabel}</small>
              </div>
              <h1>{article.title}</h1>
              <p className="news-article-summary">{article.summary}</p>
              {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="news-article-actions">
                {article.officialUrl ? <ExternalLink className="button primary" href={article.officialUrl}>Abrir notícia oficial <ArrowSquareOut /></ExternalLink> : null}
                <a className="button honey-button" href="#agenda-eventos">Ver agenda de eventos <ArrowRight /></a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function mergeNews(staticItems, dynamicItems) {
  const map = new Map();
  [...dynamicItems, ...staticItems].forEach((item) => {
    if (!item?.slug) return;
    map.set(item.slug, item);
  });
  return Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
}

function getActiveNewsSlug() {
  if (window.location.hash.startsWith("#noticia/")) {
    return window.location.hash.replace("#noticia/", "").replace(/\/$/, "");
  }
  return null;
}

function getActivePage() {
  if (window.location.hash === "#cidade") return "city";
  if (window.location.hash === "#agenda-eventos") return "events";
  if (window.location.hash === "#cidade-do-mel") return "honey";
  if (window.location.hash === "#apicultores") return "beekeepers";
  if (window.location.hash === "#apicuesta") return "apicuesta";
  if (window.location.hash === "#noticias") return "news";
  if (window.location.hash === "#painel-noticias") return "admin-news";
  if (window.location.hash.startsWith("#noticia/")) return "news-article";
  return "home";
}

const homeSectionHashes = new Set([
  "#inicio",
  "#atrativos",
  "#eventos",
  "#contato",
]);

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [activePage, setActivePage] = useState(getActivePage);
  const [activeNewsSlug, setActiveNewsSlug] = useState(getActiveNewsSlug);
  const [managedNews, setManagedNews] = useState([]);
  const combinedNews = mergeNews(newsItems, managedNews);
  const activeArticle = combinedNews.find((item) => item.slug === activeNewsSlug);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(getActivePage());
      setActiveNewsSlug(getActiveNewsSlug());
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) return;
        const data = await response.json();
        if (!cancelled && Array.isArray(data)) setManagedNews(data);
      } catch {
        if (!cancelled) setManagedNews([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hash = window.location.hash;
      if (homeSectionHashes.has(hash)) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activePage, activeNewsSlug]);

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

      {activePage === "city" ? <CityPage /> : activePage === "events" ? <EventsPage /> : activePage === "honey" ? <HoneyPage /> : activePage === "beekeepers" ? <BeekeepersPage /> : activePage === "apicuesta" ? <ApicuestaPage /> : activePage === "news" ? <NewsPage items={combinedNews} /> : activePage === "news-article" ? <NewsArticlePage article={activeArticle} /> : activePage === "admin-news" ? <AdminNewsPage onNewsUpdated={() => window.location.reload()} /> : <main id="conteudo">
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
              <span>Tradição, natureza e gastronomia</span>
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
                <span>Sistema interno de notícias</span>
                <h3>Informação pública, turismo e desenvolvimento local</h3>
                <p>Agora o site conta com uma página própria com galeria de notícias, imagem de capa, título e acesso à reportagem completa dentro do próprio portal.</p>
                <a className="button outline" href="#noticias">Ver notícias <ArrowRight /></a>
              </div>
              <div className="news-preview-grid">
                {combinedNews.slice(0, 3).map((item) => (
                  <a className="news-preview-card" href={`#noticia/${item.slug}`} key={item.slug}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <small>{item.category} • {item.dateLabel}</small>
                      <strong>{item.title}</strong>
                      <span>Ler reportagem completa</span>
                    </div>
                  </a>
                ))}
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
            <a href="#painel-noticias">Painel de notícias</a>
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
