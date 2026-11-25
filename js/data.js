/* ==========================================================
   TWS LIQUID CHEF — ALL EDITABLE CONTENT LIVES IN THIS FILE
   Edit on GitHub (pencil icon) → Commit. Site updates in ~1 min.
   ========================================================== */

const CONFIG = {
  whatsapp: "26774892554",                 // digits only, with country code
  whatsappDisplay: "+267 74 892 554",
  whatsappMessage: "Hello TWS Liquid Chef. I would like to request a quotation for an upcoming event.",
  email: "wabotlhesebeso@gmail.com",
  phone: "",                               // add later, e.g. "+267 7X XXX XXX"
  hours: "By Appointment Only",
  area: "Based in Gaborone, available throughout Botswana.",
  travel: "Travel fees apply outside Gaborone.",
  notice: "Large events: please enquire 3–4 weeks in advance.",
  socials: { instagram: "", facebook: "", tiktok: "" } // paste full links when ready
};

/* Stock placeholders (Mixkit / Unsplash free licences). Replace with your own footage & photos. */
const IMG = (id, w = 1200) => `https://images.unsplash.com/${id}?w=${w}&q=70&auto=format&fit=crop`;
const MEDIA = {
  heroVideos: [ // desktop montage, plays in this order
    "https://assets.mixkit.co/videos/43962/43962-720.mp4",
    "https://assets.mixkit.co/videos/5227/5227-720.mp4",
    "https://assets.mixkit.co/videos/810/810-720.mp4",
    "https://assets.mixkit.co/videos/4416/4416-720.mp4"
  ],
  heroImage: "photo-1470337458703-46ad1756a187", // mobile hero still
  bar: "photo-1777791375006-2384a0d27c23",
  bar2: "photo-1778008543177-2dcca3697693",
  shelves: "photo-1758247706694-7830caadea8d",
  pour: "photo-1623408859815-22534357b3db",
  latte: "photo-1541167760496-1628856ab772",
  latteTop: "photo-1512568400610-62da28bc8a13",
  wedding: "photo-1648154164366-d067faecdc51",
  weddingTable: "photo-1511795409834-ef04bbd61622",
  dining: "photo-1780337092493-cb54156c9546",
  corporate: "photo-1768508950719-4d76978fdf44",
  toast: "photo-1527529482837-4698179dc6ce",
  kids: "photo-1767070805821-60c701885151",
  kidsCake: "photo-1765780199629-50df915ccb18",
  burger: "photo-1607013251379-e6eecfffe234",
  burger2: "photo-1571091718767-18b5b1457add",
  bartender: "photo-1787274031613-559170d08741",
  bartender2: "photo-1647776112336-72f4c30fafc1"
};

/* ---------- MENU (prices in Pula are ESTIMATES — please confirm) ---------- */
const MENU = [
  { id: "signature", title: "Signature Drinks", note: "The drinks TWS is known for.", items: [
    { name: "Blue Curaçao", price: 85, alc: true, desc: "Our electric-blue signature, bright and citrus-led.", ing: "Vodka, blue curaçao, lemon, soda", diet: "Vegan" },
    { name: "Cloudy Sunset Mocktail", price: 55, alc: false, desc: "Layered tropical fruit that fades like a Kalahari sky.", ing: "Orange, pineapple, grenadine, soda", diet: "Vegan" },
    { name: "Margarita", price: 85, alc: true, desc: "The classic, shaken hard and served with a salted rim.", ing: "Tequila, triple sec, fresh lime, salt", diet: "Vegan · salt-free on request" }
  ]},
  { id: "coffee", title: "Coffee Collection", note: "Barista-made, latte art as standard.", items: [
    { name: "Café Latte", price: 38, alc: false, desc: "Silky steamed milk over a double espresso.", ing: "Espresso, steamed milk", diet: "Plant milk on request" },
    { name: "Amarula Café Mocha", price: 65, alc: true, desc: "Chocolate, espresso and a pour of Amarula cream.", ing: "Espresso, chocolate, milk, Amarula", diet: "Contains dairy" },
    { name: "Cappuccino", price: 36, alc: false, desc: "Equal parts espresso, milk and velvet foam.", ing: "Espresso, milk", diet: "Plant milk on request" },
    { name: "Espresso", price: 25, alc: false, desc: "A short, rich double shot.", ing: "Espresso", diet: "Vegan" },
    { name: "Americano", price: 30, alc: false, desc: "Espresso lengthened with hot water.", ing: "Espresso, water", diet: "Vegan" },
    { name: "Flat White", price: 38, alc: false, desc: "Ristretto shots with thin, glossy milk.", ing: "Espresso, steamed milk", diet: "Plant milk on request" },
    { name: "Frappé — Vanilla, Chocolate, Caramel or Coffee", price: 50, alc: false, desc: "Blended ice-cold and finished with cream.", ing: "Milk, ice, flavour of choice, cream", diet: "Contains dairy" }
  ]},
  { id: "mocktails", title: "Mocktails", note: "Zero alcohol, full flavour.", items: [
    { name: "Cloudy Sunset", price: 55, alc: false, desc: "Orange and pineapple with a grenadine fade.", ing: "Orange, pineapple, grenadine, soda", diet: "Vegan" },
    { name: "Berry Bliss", price: 55, alc: false, desc: "Muddled berries, basil and lemon.", ing: "Mixed berries, basil, lemon, tonic", diet: "Vegan" },
    { name: "Tropical Escape", price: 55, alc: false, desc: "Mango, passion fruit and coconut.", ing: "Mango, passion fruit, coconut, lime", diet: "Vegan" },
    { name: "Citrus Spark", price: 50, alc: false, desc: "Sharp, sparkling and refreshing.", ing: "Lemon, lime, orange, ginger, soda", diet: "Vegan" },
    { name: "Blue Lagoon", price: 50, alc: false, desc: "Our signature blue, alcohol-free.", ing: "Blue syrup, lemonade, lime", diet: "Vegan" }
  ]},
  { id: "cocktails", title: "Cocktails", note: "The classics, made properly.", items: [
    { name: "Margarita", price: 85, alc: true, desc: "Tequila, lime and a salted rim.", ing: "Tequila, triple sec, lime", diet: "Vegan" },
    { name: "Mojito", price: 80, alc: true, desc: "Fresh mint, lime and white rum.", ing: "White rum, mint, lime, sugar, soda", diet: "Vegan" },
    { name: "Cosmopolitan", price: 85, alc: true, desc: "Citrus vodka and cranberry, served up.", ing: "Vodka, triple sec, cranberry, lime", diet: "Vegan" },
    { name: "Whiskey Sour", price: 90, alc: true, desc: "Balanced, silky and bittered.", ing: "Whiskey, lemon, sugar, egg white (optional)", diet: "Vegan without egg white" },
    { name: "Daiquiri", price: 80, alc: true, desc: "Rum, lime and sugar — simple and sharp.", ing: "White rum, lime, sugar", diet: "Vegan" },
    { name: "Old Fashioned", price: 95, alc: true, desc: "Whiskey stirred down with bitters and orange.", ing: "Whiskey, sugar, bitters, orange peel", diet: "Vegan" }
  ]},
  { id: "bellinis", title: "Bellinis & Mimosas", note: "Bubbles for brunches, showers and toasts.", items: [
    { name: "Peach Bellini", price: 75, alc: true, desc: "Peach purée topped with sparkling wine.", ing: "Peach, sparkling wine", diet: "Vegan" },
    { name: "Strawberry Bellini", price: 75, alc: true, desc: "Strawberry purée and bubbles.", ing: "Strawberry, sparkling wine", diet: "Vegan" },
    { name: "Classic Mimosa", price: 70, alc: true, desc: "Fresh orange and sparkling wine.", ing: "Orange juice, sparkling wine", diet: "Vegan" },
    { name: "Tropical Mimosa", price: 75, alc: true, desc: "Pineapple, mango and bubbles.", ing: "Pineapple, mango, sparkling wine", diet: "Vegan" }
  ]},
  { id: "smoothies", title: "Smoothies", note: "Thick, fresh and filling.", items: [
    { name: "Fruity Smoothie", price: 50, alc: false, desc: "Seasonal fruit blended with yoghurt.", ing: "Seasonal fruit, yoghurt, honey", diet: "Vegetarian" },
    { name: "Chocolate Smoothie", price: 50, alc: false, desc: "Rich cocoa, banana and milk.", ing: "Cocoa, banana, milk", diet: "Contains dairy" },
    { name: "Crazy Smoothie", price: 55, alc: false, desc: "The chef's wildcard — ask on the day.", ing: "Varies", diet: "Ask our team" }
  ]},
  { id: "kids-drinks", title: "Children's Drinks", note: "Colourful, fun and alcohol-free.", items: [
    { name: "Rainbow Splash", price: 35, alc: false, desc: "Layered fruit colours in one glass.", ing: "Fruit juices, syrups, soda", diet: "Vegan" },
    { name: "Cotton Candy Cooler", price: 40, alc: false, desc: "Sweet, pink and topped with candy floss.", ing: "Lemonade, berry syrup, candy floss", diet: "Vegan" },
    { name: "Jungle Juice", price: 35, alc: false, desc: "Tropical fruit punch for little explorers.", ing: "Pineapple, orange, mango, soda", diet: "Vegan" }
  ]},
  { id: "fast-food", title: "Fast Foods", note: "Crowd favourites, cooked on site.", items: [
    { name: "Smash Burger", price: 95, alc: false, desc: "Two crisp-edged patties, cheese, house sauce.", ing: "Beef, cheese, brioche, sauce", diet: "Contains gluten & dairy" },
    { name: "Cheeseburger", price: 85, alc: false, desc: "Classic beef patty with melted cheese.", ing: "Beef, cheese, lettuce, tomato, bun", diet: "Contains gluten & dairy" },
    { name: "Hotdog", price: 55, alc: false, desc: "Grilled sausage, onions and sauces.", ing: "Sausage, roll, onion", diet: "Contains gluten" },
    { name: "Loaded Fries", price: 65, alc: false, desc: "Fries with cheese sauce and toppings.", ing: "Potato, cheese, toppings", diet: "Vegetarian option" },
    { name: "Wings (6)", price: 80, alc: false, desc: "Sticky, saucy and grilled.", ing: "Chicken, house glaze", diet: "Gluten-free on request" },
    { name: "Chicken Strips", price: 75, alc: false, desc: "Crumbed and golden, with dip.", ing: "Chicken, crumb, dip", diet: "Contains gluten" },
    { name: "Mini Sliders (3)", price: 90, alc: false, desc: "Three bite-size burgers — ideal for cocktail hours.", ing: "Beef, cheese, mini buns", diet: "Contains gluten & dairy" }
  ]},
  { id: "comfort", title: "Comfort Foods", note: "Hearty plates for longer events.", items: [
    { name: "Sharing Platter", price: 350, alc: false, desc: "Wings, sliders, strips and fries for 4–6.", ing: "Assorted", diet: "Ask about options" },
    { name: "Pasta Options", price: 95, alc: false, desc: "Creamy or tomato-based, with chicken or vegetables.", ing: "Pasta, sauce, protein", diet: "Vegetarian option" },
    { name: "Rice Meals", price: 90, alc: false, desc: "Seasoned rice with stew or grilled protein.", ing: "Rice, protein, vegetables", diet: "Gluten-free" },
    { name: "Grilled Selections", price: 120, alc: false, desc: "Chicken, beef or boerewors from the grill.", ing: "Grilled meats, sides", diet: "Gluten-free" },
    { name: "Wraps", price: 75, alc: false, desc: "Chicken or vegetable, with fresh salad.", ing: "Tortilla, filling, salad", diet: "Vegetarian option" }
  ]},
  { id: "kids-menu", title: "Children's Menu", note: "Made for small hands and big smiles.", items: [
    { name: "Kiddies Pack", price: 60, alc: false, desc: "Mini burger or nuggets, fries, juice and a treat.", ing: "Varies", diet: "Ask about allergies" },
    { name: "Celebration Cake", price: 0, alc: false, desc: "Custom cakes to your theme — priced per order.", ing: "Varies", diet: "Ask about options" },
    { name: "Snack Cups", price: 30, alc: false, desc: "Popcorn, crisps and sweets.", ing: "Assorted", diet: "Vegetarian" },
    { name: "Kids Burger", price: 50, alc: false, desc: "A smaller burger with cheese.", ing: "Beef, cheese, bun", diet: "Contains gluten" },
    { name: "Fries", price: 30, alc: false, desc: "Golden and lightly salted.", ing: "Potato", diet: "Vegan" },
    { name: "Nuggets (6)", price: 45, alc: false, desc: "Crumbed chicken bites with dip.", ing: "Chicken, crumb", diet: "Contains gluten" },
    { name: "Sweets Table", price: 0, alc: false, desc: "A styled sweets station — priced per event.", ing: "Assorted", diet: "Ask about options" }
  ]}
];

/* ---------- PACKAGES (starting prices are ESTIMATES — please confirm) ---------- */
const PACKAGES = [
  { group: "Corporate", intro: "Polished service for launches, year-ends and client functions.", tiers: [
    { name: "Small", guests: "Up to 30 guests", from: 4500, items: ["2 staff, 3 hours", "4-drink menu (mix of cocktails & mocktails)", "Mobile bar, glassware & ice", "Coffee station add-on available"] },
    { name: "Medium", guests: "30–60 guests", from: 8500, featured: true, items: ["3–4 staff, 4 hours", "6-drink menu incl. one branded signature", "Lit bar & printed menu board", "Barista coffee station"] },
    { name: "Large", guests: "60–100 guests", from: 14000, items: ["5 staff, 5 hours", "Fully custom menu with brand colours", "Bar + coffee station + canapé option", "Event-day coordinator"] }
  ]},
  { group: "Weddings", intro: "From welcome drinks to the last dance.", tiers: [
    { name: "Silver", guests: "Up to 50 guests", from: 9500, items: ["Welcome drink on arrival", "4-drink cocktail & mocktail bar", "3 hours of service", "Glassware & ice"] },
    { name: "Gold", guests: "50–80 guests", from: 15000, featured: true, items: ["Couple's signature cocktail", "6-drink bar + coffee after dinner", "5 hours of service", "Styled bar to your décor"] },
    { name: "Platinum", guests: "80–100 guests", from: 22000, items: ["Full bar team & coordinator", "Unlimited menu design", "Bellini toast for all guests", "Late-night snack service"] }
  ]},
  { group: "Private Celebrations", intro: "Birthdays, anniversaries, showers and house parties.", tiers: [
    { name: "Celebration", guests: "15–50 guests", from: 3500, items: ["1–2 mixologists, 3 hours", "4-drink menu", "Mobile bar & glassware", "Add food from our menu"] }
  ]},
  { group: "Children's Parties", intro: "Safe, colourful and completely alcohol-free.", tiers: [
    { name: "Kiddies", guests: "Up to 30 children", from: 2500, items: ["Rainbow drinks bar", "Kiddies packs for every child", "Fun presentation & themed cups", "Adult mocktails & coffee add-on"] }
  ]},
  { group: "Beverage-Only", intro: "Just the bar — you handle the rest.", tiers: [
    { name: "Bar Service", guests: "20–100 guests", from: 120, perGuest: true, items: ["Cocktails, mocktails or coffee", "Staff, bar, glassware & ice", "Menu tailored to your event", "Alcohol supplied or BYO"] }
  ]},
  { group: "Beverage + Catering", intro: "One team for drinks and food.", tiers: [
    { name: "Full Service", guests: "20–100 guests", from: 260, perGuest: true, items: ["Drinks bar + food menu", "Fast foods, comfort foods or platters", "Serving staff included", "Children's menu available"] }
  ]}
];

/* ---------- SERVICES ---------- */
const SERVICES = [
  { id: "beverage", name: "Beverage Experiences", img: "bar", primary: true, desc: "Our core craft: a styled mobile bar with cocktails, mocktails and barista coffee, designed around your guests.", sizes: "20–100 guests", benefits: ["Trained mixologists & baristas", "Menus built for your crowd", "Bar, glassware and ice included"], custom: "Brand colours, signature drinks, coffee station, BYO alcohol" },
  { id: "corporate", name: "Corporate Events", img: "corporate", desc: "Product launches, year-end functions and client evenings served with quiet professionalism.", sizes: "30–100 guests", benefits: ["Punctual, uniformed team", "Branded signature cocktails", "Invoices and quotations for procurement"], custom: "Logo garnishes, brand-coloured drinks, timed service" },
  { id: "weddings", name: "Weddings", img: "wedding", desc: "Welcome drinks, the couple's signature cocktail and a bar that keeps the dance floor full.", sizes: "40–100 guests", benefits: ["Styled to your décor", "Couple's signature drink", "Calm, coordinated service"], custom: "Named cocktails, toast service, late-night snacks" },
  { id: "private", name: "Private Celebrations", img: "toast", desc: "Anniversaries, house parties and milestone dinners — elevated without the fuss.", sizes: "15–60 guests", benefits: ["Flexible timings", "Small-venue friendly bar", "Mix of drinks & food"], custom: "Theme colours, menu size, food add-ons" },
  { id: "birthdays", name: "Birthday Parties", img: "bar2", desc: "From 21sts to 60ths, a bar that makes the night feel like an occasion.", sizes: "15–80 guests", benefits: ["Birthday signature drink", "Shots & cocktail rounds", "Party-ready staff"], custom: "Named drinks, colour themes, cake pairing" },
  { id: "children", name: "Children's Experiences", img: "kids", desc: "Rainbow drinks, kiddies packs and a safe, alcohol-free bar the little ones love.", sizes: "10–40 children", benefits: ["100% alcohol-free", "Allergy-aware menus", "Parents' coffee & mocktails"], custom: "Party themes, characters' colours, sweets table" },
  { id: "bridal", name: "Bridal Showers", img: "weddingTable", desc: "Bellinis, mimosas and pretty mocktails for the bride and her circle.", sizes: "10–40 guests", benefits: ["Bubbles bar", "Pastel-themed drinks", "Brunch-friendly timing"], custom: "Bride's signature drink, colour palette" },
  { id: "launches", name: "Product Launches", img: "shelves", desc: "Drinks that match your brand story and photograph beautifully.", sizes: "30–100 guests", benefits: ["Brand-matched menu", "Content-ready presentation", "Fast service for crowds"], custom: "Product-inspired cocktails, branded cups" },
  { id: "vip", name: "VIP Events", img: "dining", desc: "Discreet, attentive table and bar service for exclusive guest lists.", sizes: "10–50 guests", benefits: ["Senior mixologist", "Premium spirits menu", "Personal service"], custom: "Bespoke menu, tableside serves" },
  { id: "festivals", name: "Festivals", img: "bartender", desc: "High-volume bar service that stays quick, clean and consistent.", sizes: "Scaled to the event", benefits: ["Batch-ready recipes", "Efficient queues", "Flexible staffing"], custom: "Pop-up bar branding, price-per-drink options" },
  { id: "masterclass", name: "Cocktail Masterclasses", img: "pour", desc: "Hands-on sessions where your group learns to shake, stir and garnish.", sizes: "6–25 guests", benefits: ["Team-building favourite", "All equipment provided", "Take-home recipe cards"], custom: "Classic or mocktail focus, competition format" },
  { id: "catering", name: "Catering", img: "burger", desc: "Fast foods, comfort plates and children's menus served alongside the bar.", sizes: "20–100 guests", benefits: ["One team for food & drinks", "Cooked on site", "Children's options"], custom: "Platters, plated or buffet style" }
];

/* ---------- GALLERY (category: beverages | food | corporate | weddings | children | bts) ---------- */
const GALLERY = [
  { img: "pour", cat: "beverages", alt: "Cocktail being poured into a glass" },
  { img: "wedding", cat: "weddings", alt: "Couple dancing at a wedding reception" },
  { img: "latte", cat: "beverages", alt: "Barista pouring latte art" },
  { img: "bartender", cat: "bts", alt: "Bartender working behind a dimly lit bar" },
  { img: "corporate", cat: "corporate", alt: "Guests at a formal corporate dinner" },
  { img: "burger", cat: "food", alt: "Double cheeseburger on a dark surface" },
  { img: "kids", cat: "children", alt: "Table set for a children's party" },
  { img: "heroImage", cat: "beverages", alt: "Amber cocktail strained over a large ice cube" },
  { img: "weddingTable", cat: "weddings", alt: "Wedding table with floral centrepiece" },
  { img: "bar2", cat: "bts", alt: "Bartender preparing cocktails" },
  { img: "toast", cat: "corporate", alt: "Guests raising glasses in a toast" },
  { img: "latteTop", cat: "beverages", alt: "Heart latte art from above" },
  { img: "kidsCake", cat: "children", alt: "Children blowing out birthday candles" },
  { img: "burger2", cat: "food", alt: "Cheeseburger with fresh toppings" },
  { img: "dining", cat: "weddings", alt: "Elegant dining room with dim lighting" },
  { img: "bartender2", cat: "bts", alt: "Mixologist making a drink" },
  { img: "shelves", cat: "bts", alt: "Bar shelves lined with bottles" },
  { img: "bar", cat: "beverages", alt: "Cocktail being prepared at a dim bar" }
];

/* ---------- REVIEWS ----------
   Approved reviews only. When a review arrives on WhatsApp and you approve it,
   copy this shape and add it to the list:
   { name: "Thandi M.", event: "Wedding", rating: 5, date: "2026-11-20", text: "Their words…", photo: "" }
*/
const REVIEWS = [];

const EVENT_TYPES = ["Corporate Event", "Wedding", "Private Celebration", "Birthday Party", "Children's Party", "Bridal Shower", "Product Launch", "VIP Event", "Festival", "Masterclass", "Other"];

/* ---------- FAQS ---------- */
const FAQS = [
  { q: "How far in advance should I book?", a: "For large events, please enquire 3–4 weeks in advance. Smaller gatherings can often be arranged sooner — send us your date on WhatsApp and we'll confirm availability." },
  { q: "Do you travel?", a: "Yes. We're based in Gaborone and available throughout Botswana." },
  { q: "Do you cater outside Gaborone?", a: "Absolutely. Travel fees apply outside Gaborone and are shown clearly in your quotation." },
  { q: "Can menus be customised?", a: "Every menu is fully customisable — from signature drinks named after you to brand-coloured cocktails and themed children's drinks." },
  { q: "Can dietary requirements be accommodated?", a: "Yes, where possible. Tell us about allergies, halal, vegan or sugar-free needs when you enquire and we'll adapt the menu." },
  { q: "What guest sizes can you handle?", a: "We currently serve events of approximately 50–100 guests comfortably, with around 5 staff — and smaller intimate gatherings too. Staffing is flexible to your event." },
  { q: "Do you provide children's options?", a: "Yes — alcohol-free rainbow drinks, kiddies packs, snacks and cakes. Children's parties are one of our specialities." },
  { q: "How do quotations work?", a: "Message us on WhatsApp with your date, venue, guest count and event type. We'll reply with a tailored quotation. A deposit secures your date." },
  { q: "Do you supply the alcohol?", a: "We can supply everything, or work with alcohol you provide — we'll send a shopping list so nothing goes to waste." }
];
