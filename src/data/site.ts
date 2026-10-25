// Contenido de la web de GESIC. Edita los textos e imágenes aquí sin tocar App.tsx.
// Las imágenes viven en /public/images/gesic/ (se referencian como /images/gesic/...)

export type PillarIcon = 'finance' | 'maintenance' | 'legal' | 'security'

export const pillars: {
  number: string
  icon: PillarIcon
  title: string
  tagline: string
  items: string[]
  image: string
}[] = [
  {
    number: '01',
    icon: 'finance',
    title: 'Finanzas sanas y transparentes',
    tagline: 'Cada sol, claro y conciliado.',
    items: [
      'Cobranza preventiva de morosidad',
      'Conciliación bancaria y liquidación mensual',
      'Proveedores calificados y presupuestos competitivos',
    ],
    image: '/images/gesic/finanzas.jpg',
  },
  {
    number: '02',
    icon: 'maintenance',
    title: 'Mantenimiento técnico preventivo',
    tagline: 'Prevenimos antes de reparar.',
    items: [
      'Calendario para bombas, cisternas, ascensores y portones',
      'Supervisión en sitio de limpieza, jardinería y seguridad',
      'Auditoría técnica inicial',
    ],
    image: '/images/gesic/mantenimiento.jpg',
  },
  {
    number: '03',
    icon: 'legal',
    title: 'Consultoría legal',
    tagline: 'Orden y respaldo en cada decisión.',
    items: [
      'Inscripción de juntas directivas',
      'Aplicación imparcial del Reglamento Interno',
      'Asambleas, actas y cobranza judicial',
    ],
    image: '/images/gesic/legal.jpg',
  },
  {
    number: '04',
    icon: 'security',
    title: 'Seguridad garantizada',
    tagline: 'Personal preparado, residentes protegidos.',
    items: [
      'Capacitación del personal en seguridad',
      'Simulacros de sismos e incendios',
      'Primeros auxilios a residentes',
    ],
    image: '/images/gesic/seguridad.jpg',
  },
]

// Cifras animadas de "Nosotros". Reemplaza o agrega cifras reales (p. ej. condominios administrados).
export const stats: { value: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 15, prefix: '+', suffix: ' años', label: 'liderando operaciones críticas en empresas de primer nivel' },
  { value: 4, label: 'frentes de gestión en un solo equipo' },
  { value: 0, prefix: 'S/ ', label: 'costo del diagnóstico inicial' },
]

export const results = [
  { title: 'Reducción de morosidad', text: 'Reportes financieros claros para la junta.', image: '/images/gesic/resultado-reportes.jpg' },
  { title: 'Tableros eléctricos', text: 'Mantenimiento preventivo de instalaciones.', image: '/images/gesic/resultado-tableros.jpg' },
  { title: 'Junta Directiva inscrita', text: 'Formalización ante SUNARP.', image: '/images/gesic/resultado-junta.jpg' },
  { title: 'Áreas verdes e iluminación', text: 'Espacios comunes recuperados.', image: '/images/gesic/resultado-areas-verdes.jpg' },
]

export const processSteps = [
  { number: '01', title: 'Visita técnica', text: 'Conocemos tu condominio sin compromiso.' },
  { number: '02', title: 'Diagnóstico y plan', text: 'Priorizamos finanzas, técnica y legal.' },
  { number: '03', title: 'Gestión integral', text: 'Ejecutamos y supervisamos en sitio.' },
  { number: '04', title: 'Reporte mensual', text: 'Cuentas claras para cada propietario.' },
]

export const team = [
  {
    name: 'Humberto Ura',
    role: 'Gerente General',
    bio: 'Abogado especializado en propiedad horizontal, formalización ante SUNARP y recuperación de morosidad. Exdirectivo de gestión residencial.',
    photo: '/images/gesic/humberto-ura.jpg',
  },
  {
    name: 'Juan',
    role: 'Sub Gerente',
    bio: 'Ingeniero industrial colegiado con 20 años en licitaciones y planes de mantenimiento para sistemas críticos.',
    photo: '/images/gesic/juan-alvarado.jpg',
  },
]

// Botón flotante de WhatsApp
// Los emojis van como códigos Unicode (\u{...}) para que no se dañen por la codificación del archivo.
export const whatsapp = {
  number: '51944014259', // +51 944 014 259 (formato internacional, sin "+" ni espacios)
  message:
    '¡Hola! Estoy interesado en una administración más ordenada y transparente para mi condominio. ¿Podrían brindarme más información sobre sus servicios? ¡Muchas gracias!',
}

// Números de contacto
export const phones = {
  whatsapp: '944 014 259',
  call: '989 105 038',
  callHref: '+51989105038',
}

// Formulario de contacto: los mensajes llegan a este correo vía FormSubmit (gratis, sin servidor).
// La PRIMERA vez que alguien envíe el formulario, FormSubmit mandará un correo de activación
// a esta dirección: hay que abrirlo y confirmar. Desde ahí, todos los mensajes llegan directo.
export const contactEndpoint = 'https://formsubmit.co/ajax/comercial@gesicperu.com'

// Sección "Respaldo y trayectoria"
export const founders = {
  intro:
    'En GESIC Perú fusionamos los más altos estándares de gestión operativa del sector corporativo e industrial con un riguroso marco de cumplimiento legal.',
  detail:
    'Nuestro equipo directivo suma más de 15 años liderando operaciones críticas en empresas de primer nivel, con sólida especialización en derecho inmobiliario y corporativo.',
  strengths: [
    {
      icon: 'operations' as const,
      title: 'Excelencia operativa',
      text: 'Eficiencia en el mantenimiento y en la optimización de los recursos de tu condominio.',
      items: [
        'Estándares de gestión corporativa e industrial',
        'Planes de mantenimiento para sistemas críticos',
        'Control estricto de costos operativos',
      ],
    },
    {
      icon: 'legal' as const,
      title: 'Blindaje legal',
      text: 'Una gestión legal correcta y segura de toda la comunidad.',
      items: [
        'Especialización en derecho inmobiliario y corporativo',
        'Cumplimiento del Reglamento Interno',
        'Formalización de juntas ante SUNARP',
      ],
    },
  ],
}
