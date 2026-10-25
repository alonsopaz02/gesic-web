export const company = {
  name: 'GESIC PERÚ S.A.C.',
  fullName: 'Gestión y Soluciones Integrales en Condominios Perú S.A.C.',
  website: 'https://www.gesicperu.com',
  email: 'comercial@gesicperu.com',
  phones: [
    { label: '989 105 038', href: '+51989105038' },
    { label: '944 014 259', href: '+51944014259' },
  ],
  // TODO: Confirmar qué número tiene WhatsApp Business antes de activar el enlace.
  whatsappNumber: '',
}

export const services = [
  {
    number: '01',
    icon: 'finance',
    title: 'Finanzas sanas y transparentes',
    intro: 'Orden financiero, seguimiento de obligaciones y reportes claros para una mejor toma de decisiones.',
    items: [
      'Control y seguimiento preventivo de la morosidad.',
      'Conciliación bancaria.',
      'Liquidación mensual de gastos clara y legible.',
      'Optimización de costos con proveedores calificados y presupuestos competitivos.',
    ],
  },
  {
    number: '02',
    icon: 'maintenance',
    title: 'Mantenimiento técnico preventivo',
    intro: 'Una gestión preventiva para cuidar las instalaciones y anticiparse a problemas que pueden afectar la operación.',
    items: [
      'Calendario de mantenimiento de bombas de agua, cisternas, ascensores y portones.',
      'Fiscalización en sitio del personal de limpieza, jardinería y seguridad.',
      'Evaluación técnica inicial para identificar posibles fallas.',
    ],
  },
  {
    number: '03',
    icon: 'legal',
    title: 'Consultoría legal',
    intro: 'Acompañamiento para contribuir al orden documental y la gestión de asuntos legales del condominio.',
    items: [
      'Asesoría para la inscripción de juntas directivas.',
      'Aplicación del reglamento interno y normas de convivencia.',
      'Soporte legal en asambleas generales y elaboración de actas.',
      'Acciones prejudiciales y judiciales para el cobro de morosidad, según corresponda.',
    ],
  },
  {
    number: '04',
    icon: 'security',
    title: 'Seguridad y prevención',
    intro: 'Coordinación y preparación para contribuir a un entorno residencial más seguro y organizado.',
    items: [
      'Capacitación del personal en seguridad.',
      'Programa de simulacros ante sismos e incendios.',
      'Preparación en primeros auxilios para la atención inicial de emergencias.',
    ],
  },
]

export const processSteps = [
  { number: '01', title: 'Escuchamos tus necesidades', text: 'Conocemos las principales preocupaciones de la junta directiva y los propietarios.' },
  { number: '02', title: 'Evaluamos el condominio', text: 'Revisamos necesidades administrativas, financieras, técnicas y operativas dentro del alcance acordado.' },
  { number: '03', title: 'Presentamos una propuesta', text: 'Planteamos prioridades, servicios y un esquema de trabajo adecuado a las características del inmueble.' },
  { number: '04', title: 'Coordinamos y damos seguimiento', text: 'Organizamos las actividades acordadas y mantenemos una comunicación clara sobre su desarrollo.' },
]

export const galleryItems = [
  { title: 'Gestión financiera', subtitle: 'Morosidad y reportes', image: '/images/gestion-financiera.jpg', alt: 'Espacio reservado para fotografía de gestión financiera' },
  { title: 'Mantenimiento técnico', subtitle: 'Tableros eléctricos', image: '/images/tablero-electrico.jpg', alt: 'Espacio reservado para fotografía de mantenimiento eléctrico' },
  { title: 'Gestión legal', subtitle: 'Juntas directivas', image: '/images/junta-directiva.jpg', alt: 'Espacio reservado para fotografía de documentación de junta directiva' },
  { title: 'Áreas comunes', subtitle: 'Jardines e iluminación', image: '/images/areas-verdes.jpg', alt: 'Espacio reservado para fotografía de áreas verdes de un condominio' },
]

export const team = [
  {
    name: 'Humberto Ura',
    role: 'Gerente general',
    initials: 'HU',
    bio: 'Abogado con trayectoria en asesoría legal corporativa, contratos de arrendamiento en conjuntos residenciales y gestión de propiedad horizontal. Su experiencia como exmiembro directivo residencial aporta una visión orientada a resolver conflictos vecinales, aplicar el reglamento interno, formalizar juntas ante SUNARP y gestionar la morosidad.',
  },
  {
    name: 'Juan Alvarado',
    role: 'Subgerente',
    initials: 'JA',
    bio: 'Ingeniero industrial titulado y colegiado, con 20 años de experiencia en licitaciones, gestión de contratos y planes de mantenimiento integral para sistemas críticos, incluidos equipos de bombeo, ascensores, subsistemas eléctricos y estructuras.',
  },
]
