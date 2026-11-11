export interface HeroFlavor {
  id: string;
  src: string;
  bg: string;
  panel: string;
  textAccent: string;
  ghostText: string;
  category: string;
  title: string;
  description: string;
  price: string;
  serveType: string;
}

export interface MegaMenuCategory {
  title: string;
  items: {
    name: string;
    detail: string;
    price: string;
    href: string;
  }[];
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'ice-cream' | 'milkshakes' | 'kashmiri-chai';
  categoryLabel: string;
  description: string;
  price: string;
  portion: string;
  popular?: boolean;
}

export interface TestimonialPost {
  id: string;
  name: string;
  handle: string;
  initials: string;
  avatarBg: string;
  timestamp: string;
  quote: string;
  rating: string;
  ordered: string;
  likes: number;
  replies: number;
}

export type FaqCategory = 'Menu & Dairy' | 'Orders & WhatsApp' | 'Visit & Hours';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export interface WalkthroughChapter {
  id: string;
  title: string;
  durationLabel: string;
  caption: string;
  detail: string;
  accent: string;
  panel: string;
  image: string;
}

export const CAFE_INFO = {
  name: 'Ice Cream & Milkshakes Cafe',
  shortName: 'Jinnah Road Scoop',
  location: 'Vehari, Pakistan',
  address: '177 Jinnah Road, D Block, Vehari',
  phoneDisplay: '+92 325 9006218',
  phoneHref: 'tel:+923259006218',
  whatsappHref:
    'https://wa.me/923259006218?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20place%20an%20order%20from%20Ice%20Cream%20%26%20Milkshakes%20Cafe%20(177%20Jinnah%20Road).',
  email: 'cafe@vehari.example',
  ratingScore: '4.1',
  ratingCount: '75',
  ratingSource: 'Cybo Directory',
  mapUrl:
    'https://www.openstreetmap.org/search?query=177+Jinnah+Road+D+Block+Vehari+Pakistan',
  hours: [
    { day: 'Mon – Thu', time: '1:00 PM – 11:30 PM', days: [1, 2, 3, 4] },
    { day: 'Friday', time: '3:00 PM – 12:30 AM', days: [5] },
    { day: 'Sat – Sun', time: '1:00 PM – 12:30 AM', days: [6, 0] },
  ],
};

// Exact 4 palette hues and panel shades from the hero specification paired with the 4 local ice cream PNGs
export const HERO_FLAVORS: HeroFlavor[] = [
  {
    id: 'mango',
    src: '/images/icecream-mango.png',
    bg: '#F4845F',
    panel: '#F79B7F',
    textAccent: '#B8431B',
    ghostText: 'ICE CREAM',
    category: 'FRESH DAIRY ICE CREAM',
    title: 'MANGO & CREAM CONE',
    description:
      'Chilled fresh dairy scoops layered with ripe mango pulp and crisp rolled wafer on 177 Jinnah Road, D Block, Vehari. Churned every morning without artificial thickeners.',
    price: 'Rs. 280',
    serveType: 'Double Waffle Cone',
  },
  {
    id: 'pistachio',
    src: '/images/icecream-pistachio.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
    textAccent: '#1E6F34',
    ghostText: 'ICE CREAM',
    category: 'WAFFLE BOWL SPECIAL',
    title: 'ROASTED PISTACHIO BOWL',
    description:
      'Slow-simmered fresh milk base churned with green pistachios and toasted almond slivers inside a crisp baked waffle basket.',
    price: 'Rs. 360',
    serveType: 'Triple Waffle Bowl',
  },
  {
    id: 'kashmiri',
    src: '/images/icecream-kashmiri.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
    textAccent: '#A62865',
    ghostText: 'ICE CREAM',
    category: 'SHAKES & KASHMIRI CHAI',
    title: 'KASHMIRI ROSE SHAKE',
    description:
      'Our house pink Kashmiri chai brewed with cardamom, blended thick with chilled dairy ice cream and crushed pistachios.',
    price: 'Rs. 340',
    serveType: '450 ml Tall Glass',
  },
  {
    id: 'blueberry',
    src: '/images/icecream-blueberry.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    textAccent: '#175EA8',
    ghostText: 'ICE CREAM',
    category: 'THICK MILKSHAKES',
    title: 'BLUEBERRY SWIRL CUP',
    description:
      'Thick dairy vanilla folded with dark berry compote, fresh blueberries, and a double ice cream crown.',
    price: 'Rs. 380',
    serveType: 'Sundae Shake Cup',
  },
];

export const MEGA_MENUS: Record<'menu' | 'specialties', MegaMenuCategory[]> = {
  menu: [
    {
      title: 'Fresh Dairy Ice Cream',
      items: [
        {
          name: 'Mango & Vanilla Cone',
          detail: 'Double dairy scoops in a crisp waffle cone',
          price: 'Rs. 280',
          href: '#menu',
        },
        {
          name: 'Roasted Pistachio Bowl',
          detail: 'Whole pistachios, sliced almonds & wafer stick',
          price: 'Rs. 360',
          href: '#menu',
        },
        {
          name: 'Classic Kulfa Crunch',
          detail: 'Reduced milk kulfi scoop with cardamom & nuts',
          price: 'Rs. 260',
          href: '#menu',
        },
        {
          name: 'Family Takeaway Tub (1 L)',
          detail: 'Insulated pack for D Block & Vehari pickup',
          price: 'Rs. 1,150',
          href: '#menu',
        },
      ],
    },
    {
      title: 'Thick Milkshakes',
      items: [
        {
          name: 'Kashmiri Rose Milkshake',
          detail: 'Pink chai infusion spun with two scoops of cream',
          price: 'Rs. 340',
          href: '#menu',
        },
        {
          name: 'Blueberry Swirl Shake',
          detail: 'Dairy base, berry compote & whipped cream top',
          price: 'Rs. 380',
          href: '#menu',
        },
        {
          name: 'Thick Oreo & Fudge Shake',
          detail: 'Crushed cocoa biscuits blended dense with dairy',
          price: 'Rs. 320',
          href: '#menu',
        },
        {
          name: 'Dry Fruit Badam Shake',
          detail: 'Blanched almonds, dates & cold fresh milk',
          price: 'Rs. 350',
          href: '#menu',
        },
      ],
    },
    {
      title: 'Kashmiri Chai Counter',
      items: [
        {
          name: 'Hot Kashmiri Pink Chai',
          detail: 'Slow-whisked green tea leaves, milk & pistachios',
          price: 'Rs. 180',
          href: '#menu',
        },
        {
          name: 'Cardamom Doodh Patti',
          detail: 'Full-cream fresh milk simmered on low heat',
          price: 'Rs. 140',
          href: '#menu',
        },
        {
          name: 'Pistachio Chai Pot (4 Cups)',
          detail: 'Served hot for families at the D Block counter',
          price: 'Rs. 650',
          href: '#menu',
        },
      ],
    },
  ],
  specialties: [
    {
      title: 'Signature House Combos',
      items: [
        {
          name: 'D Block Evening Pair',
          detail: 'One Kashmiri Chai + One Pistachio Scoop Cup',
          price: 'Rs. 430',
          href: '#menu',
        },
        {
          name: 'Shake & Cone Duo',
          detail: 'Any Thick Milkshake + Mango Waffle Cone',
          price: 'Rs. 580',
          href: '#menu',
        },
      ],
    },
    {
      title: 'Order Channels',
      items: [
        {
          name: 'WhatsApp Pickup Order',
          detail: 'Message +92 325 9006218 to skip the counter queue',
          price: 'Direct',
          href: '#contact',
        },
        {
          name: 'Dine-In on Jinnah Road',
          detail: '177 Jinnah Road, D Block, Vehari',
          price: 'Open Daily',
          href: '#contact',
        },
      ],
    },
  ],
};

export const STATS_ITEMS: StatItem[] = [
  {
    id: 'rating',
    value: '4.1 ★',
    label: 'Cybo Directory Rating',
    sublabel: 'Verified local guest score in Vehari',
  },
  {
    id: 'reviews',
    value: '75',
    label: 'Customer Reviews',
    sublabel: 'Feedback from dine-in & takeaway regulars',
  },
  {
    id: 'specialties',
    value: '3 Crafts',
    label: 'Dairy, Shakes & Chai',
    sublabel: 'Fresh ice cream, thick milkshakes & Kashmiri chai',
  },
  {
    id: 'address',
    value: '177',
    label: 'Jinnah Road, D Block',
    sublabel: 'Mobile & WhatsApp · +92 325 9006218',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Mango & Vanilla Waffle Cone',
    category: 'ice-cream',
    categoryLabel: 'Fresh Dairy Ice Cream',
    description: 'Two fresh dairy scoops topped with diced mango and a rolled wafer.',
    price: 'Rs. 280',
    portion: 'Double Scoop',
    popular: true,
  },
  {
    id: 'm2',
    name: 'Roasted Pistachio Waffle Bowl',
    category: 'ice-cream',
    categoryLabel: 'Fresh Dairy Ice Cream',
    description: 'Three scoops of green pistachio ice cream, toasted almonds, and crunch bowl.',
    price: 'Rs. 360',
    portion: 'Triple Scoop',
    popular: true,
  },
  {
    id: 'm3',
    name: 'Peshawari Kulfa & Almond Cup',
    category: 'ice-cream',
    categoryLabel: 'Fresh Dairy Ice Cream',
    description: 'Dense slow-cooked khoya dairy base with crushed green cardamom.',
    price: 'Rs. 260',
    portion: 'Regular Cup',
  },
  {
    id: 'm4',
    name: 'Belgian Dark Choco Chip Scoop',
    category: 'ice-cream',
    categoryLabel: 'Fresh Dairy Ice Cream',
    description: 'Fresh cream base folded with bitter-sweet cocoa shavings in cup or cone.',
    price: 'Rs. 240',
    portion: 'Single / Double',
  },
  {
    id: 'm5',
    name: 'Caramel Crunch Praline Cone',
    category: 'ice-cream',
    categoryLabel: 'Fresh Dairy Ice Cream',
    description: 'Toasted nut praline and salted milk caramel ribboned into cold vanilla cream.',
    price: 'Rs. 290',
    portion: 'Double Cone',
  },
  {
    id: 'm6',
    name: 'Takeaway Family Tub (1 Litre)',
    category: 'ice-cream',
    categoryLabel: 'Fresh Dairy Ice Cream',
    description: 'Choice of two house flavors packed in a thermal tub for home.',
    price: 'Rs. 1,150',
    portion: '1 Litre Pack',
  },
  {
    id: 'm7',
    name: 'Kashmiri Rose Milkshake',
    category: 'milkshakes',
    categoryLabel: 'Thick Milkshakes',
    description: 'Chilled pink chai cream spun thick with rose petals and chopped pistachios.',
    price: 'Rs. 340',
    portion: '450 ml Tall Glass',
    popular: true,
  },
  {
    id: 'm8',
    name: 'Blueberry Swirl Sundae Shake',
    category: 'milkshakes',
    categoryLabel: 'Thick Milkshakes',
    description: 'Wild blueberry compote swirled into cold fresh milk and double vanilla scoops.',
    price: 'Rs. 380',
    portion: '450 ml Sundae Cup',
    popular: true,
  },
  {
    id: 'm9',
    name: 'Thick Chocolate Fudge Shake',
    category: 'milkshakes',
    categoryLabel: 'Thick Milkshakes',
    description: 'Dark cocoa blended with cold dairy ice cream until spoon-thick.',
    price: 'Rs. 320',
    portion: '450 ml Tall Glass',
  },
  {
    id: 'm10',
    name: 'Badam & Date Milkshake',
    category: 'milkshakes',
    categoryLabel: 'Thick Milkshakes',
    description: 'Soaked almonds, soft dates, and chilled fresh milk with zero ice dilution.',
    price: 'Rs. 350',
    portion: '450 ml Tall Glass',
  },
  {
    id: 'm11',
    name: 'Roasted Oreo Cookie Shake',
    category: 'milkshakes',
    categoryLabel: 'Thick Milkshakes',
    description: 'Crushed cocoa sandwich biscuits blended dense with fresh cream.',
    price: 'Rs. 330',
    portion: '450 ml Tall Glass',
  },
  {
    id: 'm12',
    name: 'Chaunsa Mango Thick Shake',
    category: 'milkshakes',
    categoryLabel: 'Thick Milkshakes',
    description: 'Seasonal sweet Multan mango blended with whole chilled milk and cream scoop.',
    price: 'Rs. 310',
    portion: '450 ml Tall Glass',
  },
  {
    id: 'm13',
    name: 'Traditional Hot Kashmiri Chai',
    category: 'kashmiri-chai',
    categoryLabel: 'Kashmiri Chai',
    description: 'Hand-whisked pink tea brewed with star anise, cardamom, and crushed pistachios.',
    price: 'Rs. 180',
    portion: 'Hot Clay Cup',
    popular: true,
  },
  {
    id: 'm14',
    name: 'Saffron & Almond Pink Chai',
    category: 'kashmiri-chai',
    categoryLabel: 'Kashmiri Chai',
    description: 'Extra-rich pink Kashmiri tea finished with warm cream and sliced almonds.',
    price: 'Rs. 220',
    portion: 'Hot Clay Cup',
  },
  {
    id: 'm15',
    name: 'Cardamom Fresh Milk Doodh Patti',
    category: 'kashmiri-chai',
    categoryLabel: 'Kashmiri Chai',
    description: 'Strong black tea simmered directly in whole dairy milk.',
    price: 'Rs. 140',
    portion: 'Hot Cup',
  },
  {
    id: 'm16',
    name: 'Kashmiri Chai Family Flask (4 Cups)',
    category: 'kashmiri-chai',
    categoryLabel: 'Kashmiri Chai',
    description: 'Served steaming hot with toasted nuts on the side for takeaway or table.',
    price: 'Rs. 650',
    portion: '4 Servings',
  },
];

export const TESTIMONIALS: TestimonialPost[] = [
  {
    id: 't1',
    name: 'Hamza Tariq',
    handle: '@hamzatariq_vhr',
    initials: 'HT',
    avatarBg: '#F4845F',
    timestamp: '9:48 PM · Oct 24',
    quote:
      'Stopped by 177 Jinnah Road after dinner for the pistachio waffle bowl and a thick chocolate shake. Actual fresh milk taste instead of watery ice syrup—easily our go-to spot in D Block.',
    rating: '4.5 ★',
    ordered: 'Pistachio Waffle Bowl',
    likes: 34,
    replies: 4,
  },
  {
    id: 't2',
    name: 'Zainab Bilal',
    handle: '@zainabbilal97',
    initials: 'ZB',
    avatarBg: '#E882B4',
    timestamp: '8:12 PM · Nov 02',
    quote:
      'Ordered two cups of hot Kashmiri chai and a mango cone via WhatsApp before leaving home in Vehari. Everything was ready at the counter in ten minutes, packed neat and steaming hot.',
    rating: '4.0 ★',
    ordered: 'Hot Kashmiri Chai',
    likes: 27,
    replies: 3,
  },
  {
    id: 't3',
    name: 'Usman Ghani',
    handle: '@usmanghani_pk',
    initials: 'UG',
    avatarBg: '#6EB5FF',
    timestamp: '10:35 PM · Oct 19',
    quote:
      'The blueberry swirl shake is genuinely thick enough to hold a spoon upright. Best part is they stay open past 11 PM on Jinnah Road when everywhere else starts shutting down.',
    rating: '4.5 ★',
    ordered: 'Blueberry Swirl Cup',
    likes: 41,
    replies: 6,
  },
  {
    id: 't4',
    name: 'Maham Farooq',
    handle: '@mahamfarooq',
    initials: 'MF',
    avatarBg: '#6BBF7A',
    timestamp: '7:20 PM · Oct 29',
    quote:
      'Brought cousins visiting from Multan for the roasted pistachio bowl and pink chai. Real almonds and green pistachios on top, fair D Block prices, and quick service.',
    rating: '4.0 ★',
    ordered: 'Family Counter Visit',
    likes: 19,
    replies: 2,
  },
  {
    id: 't5',
    name: 'Sanaullah Khan',
    handle: '@sanaullahk',
    initials: 'SK',
    avatarBg: '#F4845F',
    timestamp: '11:05 PM · Nov 05',
    quote:
      'Finally a spot in Vehari that does both cold dairy shakes in summer and real slow-brewed Kashmiri chai when evenings turn cool. WhatsApp order confirmation on +92 325 9006218 is fast.',
    rating: '4.5 ★',
    ordered: 'Kashmiri Rose Shake',
    likes: 29,
    replies: 5,
  },
  {
    id: 't6',
    name: 'Bilal Raza',
    handle: '@bilalraza_vehari',
    initials: 'BR',
    avatarBg: '#6EB5FF',
    timestamp: '6:55 PM · Oct 14',
    quote:
      'Picked up a 1-litre fresh dairy tub for a family get-together. Did not melt out on the short drive across D Block and the mango flavor actually tastes like real fruit.',
    rating: '4.0 ★',
    ordered: '1L Family Takeaway Tub',
    likes: 22,
    replies: 1,
  },
];

export const FAQ_CATEGORIES: FaqCategory[] = [
  'Menu & Dairy',
  'Orders & WhatsApp',
  'Visit & Hours',
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'f1',
    category: 'Menu & Dairy',
    question: 'Is your ice cream made with fresh dairy milk?',
    answer:
      'Yes. All house scoops and milkshake bases are churned from fresh local dairy milk and cream rather than powdered premixes, giving every cone and thick shake a clean dairy finish.',
  },
  {
    id: 'f2',
    category: 'Menu & Dairy',
    question: 'Do you serve hot Kashmiri chai year-round or only in winter?',
    answer:
      'Hot Kashmiri pink chai is brewed daily at our counter on Jinnah Road, alongside our chilled Kashmiri Rose Milkshake for warmer Vehari afternoons.',
  },
  {
    id: 'f3',
    category: 'Menu & Dairy',
    question: 'Can I mix two different ice cream flavors in a 1-litre family tub?',
    answer:
      'Yes. You can split any 1-litre takeaway tub half-and-half between two flavors—popular pairs are Mango + Vanilla Cream or Roasted Pistachio + Kulfa.',
  },
  {
    id: 'f4',
    category: 'Menu & Dairy',
    question: 'Are your milkshakes made with ice cream scoops or ice cubes?',
    answer:
      'Our thick milkshakes are blended using chilled fresh milk and two full scoops of dairy ice cream—never watered down with crushed ice.',
  },
  {
    id: 'f5',
    category: 'Orders & WhatsApp',
    question: 'How do I place an order on WhatsApp or phone?',
    answer:
      'Call or send a WhatsApp message to +92 325 9006218 with your flavor choices, cone or cup preference, and pickup time. The same number handles both voice calls and WhatsApp messages.',
  },
  {
    id: 'f6',
    category: 'Orders & WhatsApp',
    question: 'How long does it take to prepare a WhatsApp pickup order?',
    answer:
      'Single cones, cups, and milkshakes are usually ready within 8 to 12 minutes. Fresh Kashmiri chai flasks or multi-tub family orders take roughly 15 to 20 minutes.',
  },
  {
    id: 'f7',
    category: 'Orders & WhatsApp',
    question: 'What payment options do you accept at the counter?',
    answer:
      'We accept cash on pickup at the Jinnah Road counter as well as instant bank / JazzCash / Easypaisa transfers confirmed on WhatsApp (+92 325 9006218).',
  },
  {
    id: 'f8',
    category: 'Visit & Hours',
    question: 'Where exactly is Ice Cream & Milkshakes Cafe located?',
    answer:
      'You will find us at 177 Jinnah Road, D Block, Vehari, Punjab, Pakistan—easy to reach for evening family visits and quick takeaway stops.',
  },
  {
    id: 'f9',
    category: 'Visit & Hours',
    question: 'What are your daily opening and closing hours?',
    answer:
      'We typically serve from 1:00 PM to 11:30 PM Monday–Thursday, from 3:00 PM after Friday prayers until 12:30 AM, and 1:00 PM to 12:30 AM on weekends. Message +92 325 9006218 for holiday timings.',
  },
  {
    id: 'f10',
    category: 'Visit & Hours',
    question: 'Is there space for families and group takeaway orders?',
    answer:
      'Yes, our D Block counter welcomes families and evening groups, and we pack insulated 1-litre tubs and multi-cup Kashmiri chai flasks for home gatherings.',
  },
];

export const WALKTHROUGH_CHAPTERS: WalkthroughChapter[] = [
  {
    id: 'ch1',
    title: '01 · Fresh Dairy Churning',
    durationLabel: '0:00 – 0:11',
    caption: 'Small-Batch Morning Dairy Base',
    detail:
      'Every morning starts with fresh local milk, slow-reduced for our mango, kulfa, and roasted pistachio batches at 177 Jinnah Road.',
    accent: '#F4845F',
    panel: '#F79B7F',
    image: '/images/icecream-mango.png',
  },
  {
    id: 'ch2',
    title: '02 · Waffle Bowls & Crunch',
    durationLabel: '0:12 – 0:22',
    caption: 'Crisp Cones & Whole Roasted Nuts',
    detail:
      'Triple-scoop waffle bowls finished to order with whole green pistachios, sliced almonds, and rolled wafer biscuits.',
    accent: '#6BBF7A',
    panel: '#85CC92',
    image: '/images/icecream-pistachio.png',
  },
  {
    id: 'ch3',
    title: '03 · Kashmiri Chai & Shakes',
    durationLabel: '0:23 – 0:33',
    caption: 'Brewed Pink Tea & Thick Dairy Blends',
    detail:
      'Hand-whisked Kashmiri pink tea served steaming hot in clay cups or spun with cold vanilla ice cream for our rose shake.',
    accent: '#E882B4',
    panel: '#ED9DC4',
    image: '/images/icecream-kashmiri.png',
  },
  {
    id: 'ch4',
    title: '04 · Direct WhatsApp Pickup',
    durationLabel: '0:34 – 0:45',
    caption: 'Ready in 10 Minutes on +92 325 9006218',
    detail:
      'Message your flavor list on WhatsApp before leaving D Block and pick up freshly packed cones, shakes, or family tubs without waiting.',
    accent: '#6EB5FF',
    panel: '#8DC4FF',
    image: '/images/icecream-blueberry.png',
  },
];
