/* ============================================
   SENSORIAL'S CAFÉ — Main JavaScript v4
   Light mode, bilingual (ES/EN), ambient sound
   ============================================ */
(function () {
    'use strict';

    // ---- Translations Dictionary ----
    const T = {
        es: {
            // Nav
            'nav.home': 'Inicio', 'nav.about': 'Nosotros', 'nav.menu': 'Menú',
            'nav.gallery': 'Galería', 'nav.reservations': 'Reservas', 'nav.contact': 'Contacto',
            'nav.toggle': 'Abrir menú',
            // Skip & Preloader
            'skip': 'Saltar al contenido principal',
            'preloader.text': 'Preparando tu experiencia<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',
            // Ambient
            'ambient.label': 'Sonido', 'ambient.aria': 'Activar sonido ambiental',
            // Hero
            'hero.title1': 'Despierta', 'hero.title2': 'tus sentidos',
            'hero.subtitle': 'Cada taza es un viaje sensorial por los aromas, sabores y texturas<br>del mejor café de especialidad de Armenia, Quindío.',
            'hero.cta1': 'Vive la experiencia', 'hero.cta2': 'Ver menú', 'hero.scroll': 'Descubre más',
            // Status & Greeting
            'status.open': 'Abierto ahora', 'status.closed': 'Cerrado ahora',
            'greeting.morning': 'Buenos días', 'greeting.afternoon': 'Buenas tardes', 'greeting.evening': 'Buenas noches',
            'greeting.suffix': ' — Armenia, Quindío',
            // Marquee
            'marquee.1': 'Café de Especialidad', 'marquee.2': 'Origen Quindío', 'marquee.3': 'Tostado Artesanal',
            'marquee.4': 'Experiencia Sensorial', 'marquee.5': 'Armenia, Eje Cafetero', 'marquee.6': '+1.500 msnm',
            // About
            'about.tag': 'Nuestra historia',
            'about.title': 'Donde cada sorbo<br>cuenta una <em>historia</em>',
            'about.text1': 'En <strong>Sensorial\'s Café</strong> creemos que el café es mucho más que una bebida — es una experiencia que despierta cada uno de tus sentidos. Nacidos en el corazón del <strong>Eje Cafetero colombiano</strong>, en Armenia, Quindío, traemos a tu taza la esencia misma de nuestra tierra cafetera.',
            'about.text2': 'Trabajamos directamente con caficultores locales para seleccionar los mejores granos de especialidad, tostados artesanalmente para resaltar notas únicas de origen que transforman cada visita en un momento memorable.',
            'about.float': 'Café de origen<br>Quindío',
            'about.stat1': 'Café de especialidad', 'about.stat2': 'Métodos de preparación', 'about.stat3': 'Metros de altitud',
            // Journey
            'journey.tag': 'Del origen a tu taza', 'journey.title': 'El viaje del <em>café</em>',
            'journey.desc': 'Desliza para descubrir cada etapa del recorrido de nuestro café de especialidad.',
            'journey.s1.title': 'La Semilla', 'journey.s1.text': 'Todo comienza con la selección de las mejores variedades: Castillo, Caturra y Colombia, cultivadas a más de 1.500 metros de altitud en las montañas del Quindío.',
            'journey.s2.title': 'El Cultivo', 'journey.s2.text': 'Nuestros caficultores cuidan cada planta con prácticas sostenibles, bajo sombra natural, respetando los ciclos de la tierra y la biodiversidad del eje cafetero.',
            'journey.s3.title': 'La Cosecha', 'journey.s3.text': 'Recolección manual cereza por cereza, seleccionando solo los frutos en su punto óptimo de maduración. Un proceso artesanal que garantiza la calidad.',
            'journey.s4.title': 'El Tostado', 'journey.s4.text': 'Tueste artesanal en pequeños lotes, controlando temperatura y tiempo para desarrollar el perfil sensorial único de cada origen. Ciencia y arte en cada tanda.',
            'journey.s5.title': 'Tu Taza', 'journey.s5.text': 'El momento donde todo cobra sentido. Preparado por baristas expertos en el método que elijas, cada taza cuenta la historia completa de su origen.',
            // Experience
            'exp.tag': 'La experiencia', 'exp.title': 'Un viaje para<br>los <em>cinco sentidos</em>',
            'exp.desc': 'Cada visita a Sensorial\'s es una inmersión completa en el mundo del café de especialidad.',
            'exp.sight.title': 'Vista', 'exp.sight.text': 'Observa el arte del latte, el color ámbar del espresso perfecto y la elegancia de cada preparación.',
            'exp.smell.title': 'Olfato', 'exp.smell.text': 'Déjate envolver por notas de caramelo, chocolate, cítricos y flores que emanan de nuestros granos recién tostados.',
            'exp.taste.title': 'Gusto', 'exp.taste.text': 'Descubre perfiles de sabor únicos: desde frutales y achocolatados hasta notas florales y especiadas.',
            'exp.touch.title': 'Tacto', 'exp.touch.text': 'Siente la textura sedosa del café, la calidez de la taza artesanal y la suavidad de cada bocado.',
            'exp.hearing.title': 'Oído', 'exp.hearing.text': 'Escucha el susurro del agua, el crujir del grano al moler y la música que complementa tu experiencia.',
            // Flavor Wheel
            'flavor.tag': 'Perfil sensorial', 'flavor.title': 'Rueda de <em>sabores</em>',
            'flavor.desc': 'Explora las notas de cata de nuestro café. Haz clic en cada categoría para descubrir los matices que hacen único a nuestro café del Quindío.',
            'flavor.default.title': 'Selecciona una nota', 'flavor.default.desc': 'Haz clic en los segmentos de la rueda para explorar cada familia de sabores presente en nuestro café de especialidad.',
            'flavor.center1': 'PERFIL', 'flavor.center2': 'SENSORIAL',
            'flavor.frutal.label': 'Frutal', 'flavor.floral.label': 'Floral', 'flavor.dulce.label': 'Dulce',
            'flavor.chocolate.label': 'Chocolate', 'flavor.nuez.label': 'Nuez', 'flavor.especiado.label': 'Especiado',
            'flavor.herbal.label': 'Herbal', 'flavor.caramelo.label': 'Caramelo',
            'flavor.frutal.title': 'Frutal', 'flavor.frutal.desc': 'Notas de cítricos, frutos rojos y tropicales. Nuestro café presenta matices de naranja, mandarina y frutos del bosque que aportan una acidez brillante y refrescante.',
            'flavor.floral.title': 'Floral', 'flavor.floral.desc': 'Delicadas notas de jazmín, lavanda y flores de café. Un perfil elegante y aromático que evoca los campos floridos del eje cafetero quindiano.',
            'flavor.dulce.title': 'Dulce', 'flavor.dulce.desc': 'Notas de panela, miel de abejas y caramelo. La dulzura natural de nuestro café de altura, sin necesidad de añadir azúcar para disfrutar su complejidad.',
            'flavor.chocolate.title': 'Chocolate', 'flavor.chocolate.desc': 'Notas de cacao oscuro, chocolate con leche y brownie. El cuerpo medio-alto de nuestro café aporta una base achocolatada envolvente y reconfortante.',
            'flavor.nuez.title': 'Frutos Secos', 'flavor.nuez.desc': 'Notas de almendra tostada, nuez y maní. Un sabor reconfortante y cálido que aporta complejidad al final de cada sorbo, con un finish largo y sedoso.',
            'flavor.especiado.title': 'Especiado', 'flavor.especiado.desc': 'Notas de canela, clavo y pimienta dulce. Un toque sutil de especias que emerge en la retronasal, añadiendo profundidad y carácter al perfil del café.',
            'flavor.herbal.title': 'Herbal', 'flavor.herbal.desc': 'Notas de hierbabuena, tomillo y té verde. Un frescor vegetal que equilibra la complejidad del café y evoca los jardines de las fincas cafeteras.',
            'flavor.caramelo.title': 'Caramelo', 'flavor.caramelo.desc': 'Notas de caramelo, toffee y azúcar morena. La firma distintiva de los cafés de altura del Quindío: una dulzura tostada que perdura en cada sorbo.',
            // Quote
            'quote.text': 'El café es el vino del alma, y como el buen vino, necesita todos los sentidos para apreciarlo.',
            // Menu
            'menu.tag': 'Nuestra carta', 'menu.title': 'Café de <em>especialidad</em>',
            'menu.desc': 'Preparaciones artesanales con los mejores granos del Quindío.',
            'menu.tab.hot': 'Bebidas Calientes', 'menu.tab.cold': 'Bebidas Frías', 'menu.tab.methods': 'Métodos', 'menu.tab.sides': 'Acompañantes',
            'menu.hot.espresso.name': 'Espresso Clásico', 'menu.hot.espresso.desc': 'Shot concentrado de nuestro blend de la casa. Intenso y aromático.',
            'menu.hot.cappuccino.name': 'Cappuccino Sensorial', 'menu.hot.cappuccino.desc': 'Espresso doble con leche vaporizada y espuma aterciopelada. Arte latte.',
            'menu.hot.latte.name': 'Latte de la Casa', 'menu.hot.latte.desc': 'Espresso con leche cremosa y un toque de vainilla natural del Quindío.',
            'menu.hot.mocha.name': 'Mocha Artesanal', 'menu.hot.mocha.desc': 'Espresso con chocolate artesanal colombiano y leche vaporizada.',
            'menu.hot.aromatica.name': 'Aromática de la Finca', 'menu.hot.aromatica.desc': 'Infusiones de hierbas aromáticas cultivadas en fincas locales del Quindío.',
            'menu.hot.chocolate.name': 'Chocolate Campesino', 'menu.hot.chocolate.desc': 'Cacao colombiano de origen preparado con leche fresca.',
            'menu.cold.coldbrew.name': 'Cold Brew Sensorial', 'menu.cold.coldbrew.desc': 'Extracción en frío por 18 horas. Suave, dulce y refrescante.',
            'menu.cold.icedlatte.name': 'Iced Latte', 'menu.cold.icedlatte.desc': 'Espresso doble sobre hielo con leche fría y un toque dulce.',
            'menu.cold.frappe.name': 'Frappé de Café', 'menu.cold.frappe.desc': 'Mezcla helada de espresso, leche, hielo y crema batida artesanal.',
            'menu.cold.tonic.name': 'Tonic Espresso', 'menu.cold.tonic.desc': 'Espresso sobre agua tónica premium con hielo y twist de naranja.',
            'menu.cold.limonada.name': 'Limonada de Café', 'menu.cold.limonada.desc': 'Fusión de cold brew con limonada natural y menta fresca.',
            'menu.method.v60.desc': 'Filtrado manual que resalta las notas más delicadas del grano.',
            'menu.method.chemex.desc': 'Preparación limpia y brillante. Ideal para notas frutales y florales.',
            'menu.method.aeropress.desc': 'Método versátil con café concentrado y cuerpo aterciopelado.',
            'menu.method.french.name': 'Prensa Francesa', 'menu.method.french.desc': 'Inmersión completa para un café robusto y con carácter.',
            'menu.method.siphon.desc': 'Preparación teatral al vacío. Una experiencia visual y gustativa única.',
            'menu.sides.croissant.name': 'Croissant de Mantequilla', 'menu.sides.croissant.desc': 'Hojaldrado artesanal horneado diariamente.',
            'menu.sides.banana.name': 'Torta de Banano', 'menu.sides.banana.desc': 'Receta de la abuela con banano del Quindío y nueces tostadas.',
            'menu.sides.cheesecake.name': 'Cheesecake de Maracuyá', 'menu.sides.cheesecake.desc': 'Cremoso cheesecake con coulis de maracuyá fresco.',
            'menu.sides.brownie.name': 'Brownie de Cacao', 'menu.sides.brownie.desc': 'Brownie húmedo con cacao colombiano premium y trozos de nuez.',
            'menu.sides.cookies.name': 'Galletas Artesanales', 'menu.sides.cookies.desc': 'Variedad del día: avena, chispas de chocolate o mantequilla de maní.',
            // Gallery
            'gallery.tag': 'Galería', 'gallery.title': 'Momentos <em>sensoriales</em>',
            'gallery.cap1': 'El arte de la preparación', 'gallery.cap3': 'Granos de origen',
            'gallery.cap4': 'Nuestro espacio', 'gallery.cap5': 'Repostería artesanal', 'gallery.cap6': 'Café colombiano',
            'gallery.cta': 'Síguenos en Instagram',
            'lightbox.close': 'Cerrar',
            // Testimonials
            'test.tag': 'Testimonios', 'test.title': 'Lo que dicen<br>nuestros <em>visitantes</em>',
            'test.q1': '"Una experiencia increíble. El V60 que probé tenía notas frutales que nunca había percibido en un café. El ambiente es mágico."',
            'test.q2': '"El mejor café que he probado en el eje cafetero. La atención es excepcional y el lugar te transporta a otro mundo."',
            'test.q3': '"Vine de vacaciones y fue el mejor hallazgo. La cata de café fue una experiencia única que recomiendo a todo el mundo."',
            // Reservas
            'res.tag': 'Experiencias exclusivas', 'res.title': 'Reserva tu<br><em>cata sensorial</em>',
            'res.text': 'Vive una experiencia privada donde nuestro barista te guiará por un viaje de aromas, sabores y texturas del café de especialidad del Quindío.',
            'res.f1.title': '90 minutos', 'res.f1.sub': 'Duración de la experiencia',
            'res.f2.title': '2 - 8 personas', 'res.f2.sub': 'Grupos pequeños e íntimos',
            'res.f3.title': '5 orígenes', 'res.f3.sub': 'Degustación de variedades',
            'res.f4.title': 'Certificado', 'res.f4.sub': 'De catador sensorial',
            'res.form.title': 'Agenda tu experiencia',
            'res.form.name': 'Nombre completo', 'res.form.name.ph': 'Tu nombre',
            'res.form.email.ph': 'correo@ejemplo.com', 'res.form.phone': 'Teléfono', 'res.form.date': 'Fecha', 'res.form.guests': 'Personas',
            'res.form.select': 'Seleccionar', 'res.form.p2': '2 personas', 'res.form.p3': '3 personas',
            'res.form.p4': '4 personas', 'res.form.p5': '5 personas', 'res.form.p6': '6 personas',
            'res.form.p7': '7 personas', 'res.form.p8': '8 personas',
            'res.form.exp': 'Tipo de experiencia', 'res.form.selectexp': 'Seleccionar experiencia',
            'res.form.cata': 'Cata Sensorial — $45.000/persona', 'res.form.barista': 'Taller de Barista — $65.000/persona',
            'res.form.origen': 'Tour de Origen — $80.000/persona', 'res.form.premium': 'Experiencia Premium — $120.000/persona',
            'res.form.submit': 'Reservar experiencia', 'res.form.note': 'Te confirmaremos por WhatsApp en menos de 2 horas.',
            'res.success.title': '¡Reserva enviada!', 'res.success.text': 'Te contactaremos por WhatsApp para confirmar tu experiencia sensorial. ¡Prepara tus sentidos!',
            // Contact
            'contact.tag': 'Encuéntranos', 'contact.title': 'Ven a vivir<br>la <em>experiencia</em>',
            'contact.text': 'Estamos en Parque Fundadores, en el corazón de Armenia, Quindío, esperándote con una taza del mejor café de especialidad del Eje Cafetero. Llámanos al <a href="tel:+573104058664" style="color:var(--color-gold)">310 405 8664</a>.',
            'contact.loc.label': 'Ubicación', 'contact.loc.text': 'Parque Fundadores<br>Armenia, Quindío — Eje Cafetero, Colombia',
            'contact.phone.label': 'Teléfono', 'contact.hours.label': 'Horario',
            'contact.hours.text': 'Lunes a Sábado: 8:00 AM - 8:00 PM<br>Domingos: 9:00 AM - 6:00 PM',
            'contact.social.label': 'Redes Sociales',
            // Footer
            'footer.nav': 'Navegación', 'footer.social': 'Síguenos',
            'footer.brand': 'Café de especialidad en Parque Fundadores, Armenia, Quindío. Una experiencia sensorial única en el corazón del Eje Cafetero colombiano. <a href="tel:+573104058664" style="color:var(--color-gold)">☎ 310 405 8664</a>',
            'footer.rights': '© 2026 Sensorial\'s Café. Todos los derechos reservados.',
            'footer.made': 'Hecho con <i data-lucide="heart" class="heart-icon"></i> en Armenia, Quindío',
            // Misc
            'whatsapp.aria': 'Contáctanos por WhatsApp', 'backtop.aria': 'Volver arriba',
        },
        en: {
            // Nav
            'nav.home': 'Home', 'nav.about': 'About', 'nav.menu': 'Menu',
            'nav.gallery': 'Gallery', 'nav.reservations': 'Reservations', 'nav.contact': 'Contact',
            'nav.toggle': 'Open menu',
            // Skip & Preloader
            'skip': 'Skip to main content',
            'preloader.text': 'Preparing your experience<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',
            // Ambient
            'ambient.label': 'Sound', 'ambient.aria': 'Toggle ambient sound',
            // Hero
            'hero.title1': 'Awaken', 'hero.title2': 'your senses',
            'hero.subtitle': 'Every cup is a sensory journey through the aromas, flavors, and textures<br>of the finest specialty coffee from Armenia, Quindío.',
            'hero.cta1': 'Live the experience', 'hero.cta2': 'View menu', 'hero.scroll': 'Discover more',
            // Status & Greeting
            'status.open': 'Open now', 'status.closed': 'Closed now',
            'greeting.morning': 'Good morning', 'greeting.afternoon': 'Good afternoon', 'greeting.evening': 'Good evening',
            'greeting.suffix': ' — Armenia, Quindío',
            // Marquee
            'marquee.1': 'Specialty Coffee', 'marquee.2': 'Quindío Origin', 'marquee.3': 'Artisan Roasted',
            'marquee.4': 'Sensory Experience', 'marquee.5': 'Armenia, Coffee Axis', 'marquee.6': '+1,500 masl',
            // About
            'about.tag': 'Our story',
            'about.title': 'Where every sip<br>tells a <em>story</em>',
            'about.text1': 'At <strong>Sensorial\'s Café</strong> we believe coffee is much more than a drink — it\'s an experience that awakens each of your senses. Born in the heart of the <strong>Colombian Coffee Axis</strong>, in Armenia, Quindío, we bring the very essence of our coffee-growing land to your cup.',
            'about.text2': 'We work directly with local farmers to select the finest specialty beans, artisanally roasted to bring out unique origin notes that transform every visit into a memorable moment.',
            'about.float': 'Quindío origin<br>coffee',
            'about.stat1': 'Specialty coffee', 'about.stat2': 'Brewing methods', 'about.stat3': 'Meters altitude',
            // Journey
            'journey.tag': 'From origin to cup', 'journey.title': 'The coffee <em>journey</em>',
            'journey.desc': 'Swipe to discover each stage of our specialty coffee\'s journey.',
            'journey.s1.title': 'The Seed', 'journey.s1.text': 'It all begins with selecting the finest varieties: Castillo, Caturra, and Colombia, grown above 1,500 meters altitude in the mountains of Quindío.',
            'journey.s2.title': 'The Farm', 'journey.s2.text': 'Our farmers care for each plant with sustainable practices, under natural shade, respecting the earth\'s cycles and the Coffee Axis biodiversity.',
            'journey.s3.title': 'The Harvest', 'journey.s3.text': 'Hand-picked cherry by cherry, selecting only the fruit at its optimal ripeness. An artisanal process that guarantees quality.',
            'journey.s4.title': 'The Roast', 'journey.s4.text': 'Artisanal roasting in small batches, controlling temperature and time to develop the unique sensory profile of each origin. Science and art in every batch.',
            'journey.s5.title': 'Your Cup', 'journey.s5.text': 'The moment where everything comes together. Prepared by expert baristas using your chosen method, each cup tells the complete story of its origin.',
            // Experience
            'exp.tag': 'The experience', 'exp.title': 'A journey for<br>the <em>five senses</em>',
            'exp.desc': 'Every visit to Sensorial\'s is a complete immersion in the world of specialty coffee.',
            'exp.sight.title': 'Sight', 'exp.sight.text': 'Watch the art of latte making, the amber color of the perfect espresso, and the elegance of each preparation.',
            'exp.smell.title': 'Smell', 'exp.smell.text': 'Let yourself be enveloped by notes of caramel, chocolate, citrus, and flowers emanating from our freshly roasted beans.',
            'exp.taste.title': 'Taste', 'exp.taste.text': 'Discover unique flavor profiles: from fruity and chocolaty to floral and spiced notes.',
            'exp.touch.title': 'Touch', 'exp.touch.text': 'Feel the silky texture of coffee, the warmth of the artisan cup, and the softness of every bite.',
            'exp.hearing.title': 'Hearing', 'exp.hearing.text': 'Listen to the whisper of water, the crackle of grinding beans, and the music that complements your experience.',
            // Flavor Wheel
            'flavor.tag': 'Sensory profile', 'flavor.title': 'Flavor <em>wheel</em>',
            'flavor.desc': 'Explore the tasting notes of our coffee. Click each category to discover the nuances that make our Quindío coffee unique.',
            'flavor.default.title': 'Select a note', 'flavor.default.desc': 'Click on the wheel segments to explore each flavor family present in our specialty coffee.',
            'flavor.center1': 'FLAVOR', 'flavor.center2': 'PROFILE',
            'flavor.frutal.label': 'Fruity', 'flavor.floral.label': 'Floral', 'flavor.dulce.label': 'Sweet',
            'flavor.chocolate.label': 'Chocolate', 'flavor.nuez.label': 'Nutty', 'flavor.especiado.label': 'Spiced',
            'flavor.herbal.label': 'Herbal', 'flavor.caramelo.label': 'Caramel',
            'flavor.frutal.title': 'Fruity', 'flavor.frutal.desc': 'Notes of citrus, red fruits, and tropical fruits. Our coffee presents hints of orange, tangerine, and forest berries that bring a bright and refreshing acidity.',
            'flavor.floral.title': 'Floral', 'flavor.floral.desc': 'Delicate notes of jasmine, lavender, and coffee blossoms. An elegant and aromatic profile that evokes the flower fields of the Quindío coffee region.',
            'flavor.dulce.title': 'Sweet', 'flavor.dulce.desc': 'Notes of panela, honey, and caramel. The natural sweetness of our high-altitude coffee, no sugar needed to enjoy its complexity.',
            'flavor.chocolate.title': 'Chocolate', 'flavor.chocolate.desc': 'Notes of dark cacao, milk chocolate, and brownie. The medium-high body of our coffee provides an enveloping and comforting chocolate base.',
            'flavor.nuez.title': 'Nuts', 'flavor.nuez.desc': 'Notes of toasted almond, walnut, and peanut. A comforting and warm flavor that adds complexity to every sip, with a long, silky finish.',
            'flavor.especiado.title': 'Spiced', 'flavor.especiado.desc': 'Notes of cinnamon, clove, and sweet pepper. A subtle touch of spice that emerges in the aftertaste, adding depth and character to the coffee profile.',
            'flavor.herbal.title': 'Herbal', 'flavor.herbal.desc': 'Notes of spearmint, thyme, and green tea. A vegetal freshness that balances the complexity of the coffee and evokes the gardens of coffee farms.',
            'flavor.caramelo.title': 'Caramel', 'flavor.caramelo.desc': 'Notes of caramel, toffee, and brown sugar. The distinctive signature of Quindío\'s high-altitude coffees: a toasty sweetness that lingers in every sip.',
            // Quote
            'quote.text': 'Coffee is the wine of the soul, and like fine wine, it needs all the senses to be appreciated.',
            // Menu
            'menu.tag': 'Our menu', 'menu.title': 'Specialty <em>coffee</em>',
            'menu.desc': 'Artisan preparations with the finest beans from Quindío.',
            'menu.tab.hot': 'Hot Drinks', 'menu.tab.cold': 'Cold Drinks', 'menu.tab.methods': 'Methods', 'menu.tab.sides': 'Sides',
            'menu.hot.espresso.name': 'Classic Espresso', 'menu.hot.espresso.desc': 'Concentrated shot from our house blend. Intense and aromatic.',
            'menu.hot.cappuccino.name': 'Sensorial Cappuccino', 'menu.hot.cappuccino.desc': 'Double espresso with steamed milk and velvety foam. Latte art.',
            'menu.hot.latte.name': 'House Latte', 'menu.hot.latte.desc': 'Espresso with creamy milk and a touch of natural Quindío vanilla.',
            'menu.hot.mocha.name': 'Artisan Mocha', 'menu.hot.mocha.desc': 'Espresso with artisan Colombian chocolate and steamed milk.',
            'menu.hot.aromatica.name': 'Farm Herbal Infusion', 'menu.hot.aromatica.desc': 'Aromatic herb infusions grown on local Quindío farms.',
            'menu.hot.chocolate.name': 'Country Chocolate', 'menu.hot.chocolate.desc': 'Colombian origin cacao prepared with fresh milk.',
            'menu.cold.coldbrew.name': 'Sensorial Cold Brew', 'menu.cold.coldbrew.desc': '18-hour cold extraction. Smooth, sweet, and refreshing.',
            'menu.cold.icedlatte.name': 'Iced Latte', 'menu.cold.icedlatte.desc': 'Double espresso over ice with cold milk and a sweet touch.',
            'menu.cold.frappe.name': 'Coffee Frappé', 'menu.cold.frappe.desc': 'Blended espresso, milk, ice, and artisan whipped cream.',
            'menu.cold.tonic.name': 'Tonic Espresso', 'menu.cold.tonic.desc': 'Espresso over premium tonic water with ice and orange twist.',
            'menu.cold.limonada.name': 'Coffee Lemonade', 'menu.cold.limonada.desc': 'Cold brew blended with natural lemonade and fresh mint.',
            'menu.method.v60.desc': 'Manual pour-over that highlights the most delicate notes of the bean.',
            'menu.method.chemex.desc': 'Clean and bright brew. Ideal for fruity and floral notes.',
            'menu.method.aeropress.desc': 'Versatile method with concentrated coffee and velvety body.',
            'menu.method.french.name': 'French Press', 'menu.method.french.desc': 'Full immersion for a robust coffee with character.',
            'menu.method.siphon.desc': 'Theatrical vacuum brewing. A unique visual and taste experience.',
            'menu.sides.croissant.name': 'Butter Croissant', 'menu.sides.croissant.desc': 'Artisan puff pastry baked daily.',
            'menu.sides.banana.name': 'Banana Cake', 'menu.sides.banana.desc': 'Grandma\'s recipe with Quindío banana and toasted walnuts.',
            'menu.sides.cheesecake.name': 'Passion Fruit Cheesecake', 'menu.sides.cheesecake.desc': 'Creamy cheesecake with fresh passion fruit coulis.',
            'menu.sides.brownie.name': 'Cacao Brownie', 'menu.sides.brownie.desc': 'Moist brownie with premium Colombian cacao and walnut pieces.',
            'menu.sides.cookies.name': 'Artisan Cookies', 'menu.sides.cookies.desc': 'Daily variety: oat, chocolate chip, or peanut butter.',
            // Gallery
            'gallery.tag': 'Gallery', 'gallery.title': 'Sensory <em>moments</em>',
            'gallery.cap1': 'The art of brewing', 'gallery.cap3': 'Origin beans',
            'gallery.cap4': 'Our space', 'gallery.cap5': 'Artisan pastries', 'gallery.cap6': 'Colombian coffee',
            'gallery.cta': 'Follow us on Instagram',
            'lightbox.close': 'Close',
            // Testimonials
            'test.tag': 'Testimonials', 'test.title': 'What our<br><em>visitors</em> say',
            'test.q1': '"An incredible experience. The V60 I tried had fruity notes I had never perceived in coffee. The atmosphere is magical."',
            'test.q2': '"The best coffee I\'ve had in the Coffee Axis. The service is exceptional and the place transports you to another world."',
            'test.q3': '"I came on vacation and it was the best find. The coffee tasting was a unique experience I recommend to everyone."',
            // Reservas
            'res.tag': 'Exclusive experiences', 'res.title': 'Book your<br><em>sensory tasting</em>',
            'res.text': 'Enjoy a private experience where our barista will guide you through a journey of aromas, flavors, and textures of Quindío\'s specialty coffee.',
            'res.f1.title': '90 minutes', 'res.f1.sub': 'Experience duration',
            'res.f2.title': '2 - 8 people', 'res.f2.sub': 'Small, intimate groups',
            'res.f3.title': '5 origins', 'res.f3.sub': 'Variety tasting',
            'res.f4.title': 'Certificate', 'res.f4.sub': 'Sensory cupper certificate',
            'res.form.title': 'Schedule your experience',
            'res.form.name': 'Full name', 'res.form.name.ph': 'Your name',
            'res.form.email.ph': 'email@example.com', 'res.form.phone': 'Phone', 'res.form.date': 'Date', 'res.form.guests': 'Guests',
            'res.form.select': 'Select', 'res.form.p2': '2 people', 'res.form.p3': '3 people',
            'res.form.p4': '4 people', 'res.form.p5': '5 people', 'res.form.p6': '6 people',
            'res.form.p7': '7 people', 'res.form.p8': '8 people',
            'res.form.exp': 'Experience type', 'res.form.selectexp': 'Select experience',
            'res.form.cata': 'Sensory Tasting — $45,000/person', 'res.form.barista': 'Barista Workshop — $65,000/person',
            'res.form.origen': 'Origin Tour — $80,000/person', 'res.form.premium': 'Premium Experience — $120,000/person',
            'res.form.submit': 'Book experience', 'res.form.note': 'We\'ll confirm via WhatsApp within 2 hours.',
            'res.success.title': 'Booking sent!', 'res.success.text': 'We\'ll contact you via WhatsApp to confirm your sensory experience. Get your senses ready!',
            // Contact
            'contact.tag': 'Find us', 'contact.title': 'Come live<br>the <em>experience</em>',
            'contact.text': 'We\'re at Parque Fundadores, in the heart of Armenia, Quindío, waiting for you with a cup of the finest specialty coffee from the Coffee Axis. Call us at <a href="tel:+573104058664" style="color:var(--color-gold)">310 405 8664</a>.',
            'contact.loc.label': 'Location', 'contact.loc.text': 'Parque Fundadores<br>Armenia, Quindío — Coffee Axis, Colombia',
            'contact.phone.label': 'Phone', 'contact.hours.label': 'Hours',
            'contact.hours.text': 'Monday to Saturday: 8:00 AM - 8:00 PM<br>Sundays: 9:00 AM - 6:00 PM',
            'contact.social.label': 'Social Media',
            // Footer
            'footer.nav': 'Navigation', 'footer.social': 'Follow us',
            'footer.brand': 'Specialty coffee at Parque Fundadores, Armenia, Quindío. A unique sensory experience in the heart of the Colombian Coffee Axis. <a href="tel:+573104058664" style="color:var(--color-gold)">☎ 310 405 8664</a>',
            'footer.rights': '© 2026 Sensorial\'s Café. All rights reserved.',
            'footer.made': 'Made with <i data-lucide="heart" class="heart-icon"></i> in Armenia, Quindío',
            // Misc
            'whatsapp.aria': 'Contact us on WhatsApp', 'backtop.aria': 'Back to top',
        }
    };

    // ---- Current Language ----
    let currentLang = localStorage.getItem('cafe-lang') || 'es';

    // ---- Reduced motion preference ----
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Init Lucide (defer-safe)
    function initLucide() { if (window.lucide) lucide.createIcons(); }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLucide);
    } else {
        initLucide();
    }

    // ---- Preloader with progress ----
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloaderBar');
    let loadProgress = 0;

    const progressInterval = setInterval(() => {
        loadProgress += Math.random() * 15;
        if (loadProgress > 95) loadProgress = 95;
        if (preloaderBar) preloaderBar.style.width = loadProgress + '%';
    }, 200);

    function hidePreloader() {
        clearInterval(progressInterval);
        if (preloaderBar) preloaderBar.style.width = '100%';
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            revealHero();
        }, 400);
    }

    if (document.readyState === 'complete') {
        setTimeout(hidePreloader, 600);
    } else {
        window.addEventListener('load', () => setTimeout(hidePreloader, 1000));
        setTimeout(hidePreloader, 4000);
    }

    // ---- Theme Toggle ----
    const themeToggle = document.getElementById('themeToggle');
    const iconSun = themeToggle?.querySelector('.icon-sun');
    const iconMoon = themeToggle?.querySelector('.icon-moon');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('cafe-theme', theme);
        if (iconSun && iconMoon) {
            iconSun.style.display = theme === 'dark' ? 'inline' : 'none';
            iconMoon.style.display = theme === 'light' ? 'inline' : 'none';
        }
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme === 'light' ? '#faf8f5' : '#0a0a0a';
    }

    // Initialize theme from localStorage (already set by inline script, but sync icons)
    const savedTheme = localStorage.getItem('cafe-theme') || 'dark';
    setTheme(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ---- Language Toggle ----
    const langToggle = document.getElementById('langToggle');
    const langLabel = langToggle?.querySelector('.lang-label');

    function setLanguage(lang) {
        currentLang = lang;
        const t = T[lang];
        localStorage.setItem('cafe-lang', lang);
        document.documentElement.lang = lang;

        // Toggle label shows the OTHER language
        if (langLabel) langLabel.textContent = lang === 'es' ? 'EN' : 'ES';

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) {
                if (el.hasAttribute('data-i18n-html')) {
                    el.innerHTML = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (t[key]) el.placeholder = t[key];
        });

        // Update aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;
            if (t[key]) el.setAttribute('aria-label', t[key]);
        });

        // Update flavor wheel data attributes
        document.querySelectorAll('.wheel-segment').forEach(seg => {
            const flavor = seg.dataset.flavor;
            if (t['flavor.' + flavor + '.title']) seg.dataset.title = t['flavor.' + flavor + '.title'];
            if (t['flavor.' + flavor + '.desc']) seg.dataset.desc = t['flavor.' + flavor + '.desc'];
        });

        // Update gallery captions
        document.querySelectorAll('.gallery-item').forEach(item => {
            const cap = item.dataset['caption' + (lang === 'es' ? 'Es' : 'En')];
            if (cap) item.dataset.caption = cap;
        });

        // Re-run dynamic text
        updateGreetingAndStatus();

        // Re-init Lucide for any innerHTML replacements
        if (window.lucide) setTimeout(() => lucide.createIcons(), 50);
    }

    // Initialize language
    if (langLabel) langLabel.textContent = currentLang === 'es' ? 'EN' : 'ES';
    if (currentLang !== 'es') setLanguage(currentLang);

    langToggle?.addEventListener('click', () => {
        setLanguage(currentLang === 'es' ? 'en' : 'es');
    });

    // ---- Dynamic Greeting & Open/Closed Status ----
    function updateGreetingAndStatus() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0=Sunday
        const greetingEl = document.getElementById('dynamicGreeting');
        const statusBadge = document.getElementById('statusBadge');
        const statusText = document.getElementById('statusText');
        const t = T[currentLang];

        let greeting;
        if (hour >= 5 && hour < 12) greeting = t['greeting.morning'];
        else if (hour >= 12 && hour < 18) greeting = t['greeting.afternoon'];
        else greeting = t['greeting.evening'];

        if (greetingEl) {
            greetingEl.textContent = greeting + t['greeting.suffix'];
        }

        // Open/closed logic (Mon-Sat 8-20, Sun 9-18)
        let isOpen = false;
        if (day === 0) { // Sunday
            isOpen = hour >= 9 && hour < 18;
        } else if (day >= 1 && day <= 6) { // Mon-Sat
            isOpen = hour >= 8 && hour < 20;
        }

        if (statusBadge && statusText) {
            if (isOpen) {
                statusBadge.classList.remove('closed');
                statusText.textContent = t['status.open'];
            } else {
                statusBadge.classList.add('closed');
                statusText.textContent = t['status.closed'];
            }
        }
    }

    updateGreetingAndStatus();
    setInterval(updateGreetingAndStatus, 60000);

    // ---- Scroll Progress Bar ----
    const scrollProgress = document.getElementById('scrollProgress');

    // ---- Cursor Glow (smooth lerp) ----
    const cursorGlow = document.getElementById('cursorGlow');
    let cursorX = 0, cursorY = 0, glowX = 0, glowY = 0, glowActive = false;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        if (!glowActive && cursorGlow) { cursorGlow.classList.add('active'); glowActive = true; }
    });

    function animateCursorGlow() {
        glowX += (cursorX - glowX) * 0.08;
        glowY += (cursorY - glowY) * 0.08;
        if (cursorGlow) {
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
        }
        requestAnimationFrame(animateCursorGlow);
    }
    if (window.innerWidth > 768 && !prefersReducedMotion) animateCursorGlow();

    // ---- Particles ----
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 35; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            const s = (2 + Math.random() * 3) + 'px';
            p.style.width = s;
            p.style.height = s;
            particlesContainer.appendChild(p);
        }
    }

    // ---- Hero Text Reveal ----
    function revealHero() {
        const hero = document.querySelector('.hero');
        if (hero) setTimeout(() => hero.classList.add('revealed'), 200);

        document.querySelectorAll('.hero [data-animate]').forEach(el => {
            const delay = parseInt(el.getAttribute('data-delay') || 0);
            setTimeout(() => el.classList.add('animated'), delay + 400);
        });

        // Text scramble on hero titles
        setTimeout(triggerScrambleEffects, 1200);
    }

    // ---- Text Scramble Effect ----
    function scrambleText(element) {
        const original = element.textContent;
        const chars = currentLang === 'es' ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóú' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let iteration = 0;

        const interval = setInterval(() => {
            element.textContent = original
                .split('')
                .map((letter, index) => {
                    if (index < iteration) return original[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iteration >= original.length) clearInterval(interval);
            iteration += 1 / 2;
        }, 30);
    }

    function triggerScrambleEffects() {
        document.querySelectorAll('[data-scramble]').forEach(el => {
            scrambleText(el);
        });
    }

    // ---- Navbar: hide/show on scroll ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    let lastScrollY = 0, scrollDir = 'up', ticking = false;

    function handleScroll() {
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar
        if (scrollProgress) scrollProgress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';

        // Navbar
        navbar.classList.toggle('scrolled', y > 60);
        if (y > 300) {
            if (y > lastScrollY && scrollDir !== 'down') { scrollDir = 'down'; navbar.classList.add('nav-hidden'); }
            else if (y < lastScrollY && scrollDir !== 'up') { scrollDir = 'up'; navbar.classList.remove('nav-hidden'); }
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = y;

        // Back to top
        const btt = document.getElementById('backToTop');
        if (btt) btt.classList.toggle('visible', y > 600);

        ticking = false;
    }

    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(handleScroll); ticking = true; } }, { passive: true });

    // Mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    navLinkItems.forEach(link => link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }));

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinkItems.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(s => sectionObserver.observe(s));

    // ---- Scroll Animations ----
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
                setTimeout(() => entry.target.classList.add('animated'), delay);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => {
        if (!el.closest('.hero')) animationObserver.observe(el);
    });

    // Image reveal
    const imgRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('revealed'), 200); imgRevealObserver.unobserve(e.target); } });
    }, { threshold: 0.3 });
    document.querySelectorAll('.img-reveal').forEach(el => imgRevealObserver.observe(el));

    // Counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target, parseInt(e.target.getAttribute('data-count'))); counterObserver.unobserve(e.target); } });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(c => counterObserver.observe(c));

    function animateCounter(el, target) {
        const start = performance.now();
        (function update(now) {
            const p = Math.min((now - start) / 2000, 1);
            try { el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString('es-CO'); }
            catch { el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target); }
            if (p < 1) requestAnimationFrame(update);
        })(start);
    }

    // ---- Coffee Journey Slider ----
    const journeyTrack = document.getElementById('journeyTrack');
    const journeyPrev = document.getElementById('journeyPrev');
    const journeyNext = document.getElementById('journeyNext');
    const journeyBar = document.getElementById('journeyProgressBar');
    const journeyNum = document.getElementById('journeyCurrentNum');
    let journeyIndex = 0;
    const journeyTotal = journeyTrack ? journeyTrack.children.length : 0;

    function goToJourneyStep(i) {
        journeyIndex = Math.max(0, Math.min(i, journeyTotal - 1));
        const stepWidth = journeyTrack.children[0].offsetWidth + 40; // gap
        journeyTrack.style.transform = `translateX(-${journeyIndex * stepWidth}px)`;
        if (journeyBar) journeyBar.style.width = ((journeyIndex + 1) / journeyTotal * 100) + '%';
        if (journeyNum) journeyNum.textContent = journeyIndex + 1;
    }

    if (journeyPrev) journeyPrev.addEventListener('click', () => { goToJourneyStep(journeyIndex - 1); resetJourneyAuto(); });
    if (journeyNext) journeyNext.addEventListener('click', () => { goToJourneyStep(journeyIndex + 1); resetJourneyAuto(); });

    // Journey auto-scroll
    let journeyAutoInterval;
    function startJourneyAuto() {
        journeyAutoInterval = setInterval(() => {
            if (journeyTotal > 0) goToJourneyStep(journeyIndex >= journeyTotal - 1 ? 0 : journeyIndex + 1);
        }, 5000);
    }
    function resetJourneyAuto() { clearInterval(journeyAutoInterval); startJourneyAuto(); }
    if (journeyTotal > 1) startJourneyAuto();

    // Pause auto-scroll on hover
    if (journeyTrack) {
        journeyTrack.addEventListener('mouseenter', () => clearInterval(journeyAutoInterval));
        journeyTrack.addEventListener('mouseleave', () => { if (journeyTotal > 1) startJourneyAuto(); });
    }

    // Touch support for journey
    if (journeyTrack) {
        let jtStartX = 0, jtDragging = false;
        journeyTrack.addEventListener('touchstart', (e) => { jtStartX = e.touches[0].clientX; jtDragging = true; journeyTrack.classList.add('dragging'); clearInterval(journeyAutoInterval); }, { passive: true });
        journeyTrack.addEventListener('touchend', (e) => {
            if (!jtDragging) return;
            jtDragging = false;
            journeyTrack.classList.remove('dragging');
            const diff = (e.changedTouches[0]?.clientX || 0) - jtStartX;
            if (Math.abs(diff) > 50) goToJourneyStep(diff < 0 ? journeyIndex + 1 : journeyIndex - 1);
            if (journeyTotal > 1) startJourneyAuto();
        });
    }

    // ---- Flavor Wheel ----
    const flavorWheel = document.getElementById('flavorWheel');
    const flavorDetail = document.getElementById('flavorDetail');
    const flavorDetailIcon = document.getElementById('flavorDetailIcon');
    const flavorDetailTitle = document.getElementById('flavorDetailTitle');
    const flavorDetailDesc = document.getElementById('flavorDetailDesc');

    if (flavorWheel) {
        const segments = flavorWheel.querySelectorAll('.wheel-segment');
        segments.forEach(seg => {
            seg.addEventListener('click', () => {
                segments.forEach(s => s.classList.remove('active'));
                seg.classList.add('active');
                if (flavorDetail) {
                    flavorDetail.classList.add('active');
                    flavorDetailIcon.textContent = seg.dataset.icon;
                    flavorDetailTitle.textContent = seg.dataset.title;
                    flavorDetailDesc.textContent = seg.dataset.desc;
                    // Remove data-i18n so language switch doesn't overwrite active selection
                    flavorDetailTitle.removeAttribute('data-i18n');
                    flavorDetailDesc.removeAttribute('data-i18n');
                }
            });
        });
    }

    // ---- Menu Tabs ----
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.menu-panel').forEach(p => {
                p.classList.toggle('active', p.id === tab.dataset.tab);
            });
        });
    });

    // ---- Menu Image Preview on Hover ----
    const menuPreview = document.getElementById('menuPreview');
    const menuPreviewImg = document.getElementById('menuPreviewImg');

    document.querySelectorAll('.menu-item[data-preview]').forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const src = item.dataset.preview;
            if (src && menuPreview && window.innerWidth > 768) {
                menuPreviewImg.src = src;
                menuPreview.classList.add('visible');
            }
        });

        item.addEventListener('mousemove', (e) => {
            if (menuPreview && window.innerWidth > 768) {
                menuPreview.style.left = (e.clientX + 20) + 'px';
                menuPreview.style.top = (e.clientY - 80) + 'px';
            }
        });

        item.addEventListener('mouseleave', () => {
            if (menuPreview) menuPreview.classList.remove('visible');
        });
    });

    // ---- Testimonials Slider with Touch ----
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    let currentSlide = 0, autoSlideInterval;

    if (dotsContainer && cards.length) {
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => { goToSlide(i); resetAuto(); });
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(i) {
        currentSlide = i;
        if (track) track.style.transform = `translateX(-${i * 100}%)`;
        dotsContainer?.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === i));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide === 0 ? cards.length - 1 : currentSlide - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide === cards.length - 1 ? 0 : currentSlide + 1); resetAuto(); });

    function startAuto() { autoSlideInterval = setInterval(() => { if (cards.length) goToSlide(currentSlide === cards.length - 1 ? 0 : currentSlide + 1); }, 5000); }
    function resetAuto() { clearInterval(autoSlideInterval); startAuto(); }
    startAuto();

    if (track) {
        let tStartX = 0;
        track.addEventListener('touchstart', (e) => { tStartX = e.touches[0].clientX; clearInterval(autoSlideInterval); }, { passive: true });
        track.addEventListener('touchend', (e) => {
            const diff = (e.changedTouches[0]?.clientX || 0) - tStartX;
            if (Math.abs(diff) > 50) goToSlide(diff < 0 ? Math.min(currentSlide + 1, cards.length - 1) : Math.max(currentSlide - 1, 0));
            startAuto();
        });
        track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        track.addEventListener('mouseleave', startAuto);
    }

    // ---- Gallery Lightbox ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.dataset.img;
            const cap = item.dataset.caption;
            if (src && lightbox) {
                lightboxImg.src = src;
                lightboxImg.alt = cap || '';
                lightboxCaption.textContent = cap || '';
                lightbox.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
        item.addEventListener('mouseenter', () => { galleryItems.forEach(o => { if (o !== item) o.style.opacity = '0.4'; }); });
        item.addEventListener('mouseleave', () => { galleryItems.forEach(o => o.style.opacity = '1'); });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
        setTimeout(() => { lightboxImg.src = ''; }, 400);
    }

    document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox?.classList.contains('active')) closeLightbox(); });

    // ---- Reservations Form ----
    const reservasForm = document.getElementById('reservasForm');
    const reservasSuccess = document.getElementById('reservasSuccess');

    if (reservasForm) {
        // Set min date to today
        const dateInput = document.getElementById('resDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        reservasForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = reservasForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<span>' + (currentLang === 'es' ? 'Enviando...' : 'Sending...') + '</span>';
            btn.disabled = true;

            setTimeout(() => {
                reservasForm.style.display = 'none';
                reservasSuccess.style.display = 'block';
                reservasSuccess.style.animation = 'menuSlideIn 0.6s var(--ease-out)';
            }, 1500);
        });
    }

    // ---- Parallax ----
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        if (parallaxBg) {
            const rect = parallaxBg.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                parallaxBg.style.transform = `translateY(${rect.top * 0.25}px)`;
            }
        }
    }, { passive: true });

    // ---- Magnetic Buttons ----
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.2}px)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    // ---- Tilt Cards ----
    document.querySelectorAll('.tilt-card').forEach(card => {
        const glow = card.querySelector('.sense-glow');
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            card.style.transform = `perspective(800px) rotateX(${((y - r.height / 2) / r.height) * -8}deg) rotateY(${((x - r.width / 2) / r.width) * 8}deg) translateY(-8px)`;
            if (glow) { glow.style.left = x + 'px'; glow.style.top = y + 'px'; }
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    // ---- Ambient Sound System ----
    const ambientToggle = document.getElementById('ambientToggle');
    const ambientIconOff = document.getElementById('ambientIconOff');
    const ambientIconOn = document.getElementById('ambientIconOn');
    let audioCtx, isPlaying = false;

    function createCoffeeShopAmbience() {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const master = audioCtx.createGain();
            master.gain.value = 0;
            master.connect(audioCtx.destination);
            const alive = () => audioCtx && audioCtx.state !== 'closed';

            // Pentatonic scale frequencies (happy, no dissonance)
            const penta = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3, 659.3];

            // --- Layer 1: Warm, dreamy pad (gentle chord) ---
            const chordNotes = [261.6, 329.6, 392.0]; // C major triad
            chordNotes.forEach((freq, i) => {
                const osc = audioCtx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = freq * 0.5;
                const lfo = audioCtx.createOscillator();
                lfo.type = 'sine';
                lfo.frequency.value = 0.15 + i * 0.05;
                const lfoG = audioCtx.createGain();
                lfoG.gain.value = 2;
                lfo.connect(lfoG);
                lfoG.connect(osc.frequency);
                const g = audioCtx.createGain();
                g.gain.value = 0.06;
                const lp = audioCtx.createBiquadFilter();
                lp.type = 'lowpass';
                lp.frequency.value = 600;
                osc.connect(lp);
                lp.connect(g);
                g.connect(master);
                osc.start();
                lfo.start();
            });

            // --- Layer 2: Gentle melodic chimes (pentatonic) ---
            function scheduleChime() {
                if (!alive()) return;
                setTimeout(() => {
                    if (!alive()) return;
                    const t = audioCtx.currentTime;
                    const note = penta[Math.floor(Math.random() * penta.length)];
                    const dur = 1.5 + Math.random() * 2;
                    const osc = audioCtx.createOscillator();
                    osc.type = 'sine';
                    osc.frequency.value = note;
                    const env = audioCtx.createGain();
                    env.gain.setValueAtTime(0, t);
                    env.gain.linearRampToValueAtTime(0.04, t + 0.02);
                    env.gain.exponentialRampToValueAtTime(0.001, t + dur);
                    osc.connect(env);
                    env.connect(master);
                    osc.start(t);
                    osc.stop(t + dur + 0.1);
                    const osc2 = audioCtx.createOscillator();
                    osc2.type = 'sine';
                    osc2.frequency.value = note * 2;
                    const env2 = audioCtx.createGain();
                    env2.gain.setValueAtTime(0, t);
                    env2.gain.linearRampToValueAtTime(0.012, t + 0.01);
                    env2.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.6);
                    osc2.connect(env2);
                    env2.connect(master);
                    osc2.start(t);
                    osc2.stop(t + dur + 0.1);
                    scheduleChime();
                }, (2.5 + Math.random() * 4) * 1000);
            }
            scheduleChime();

            // --- Layer 3: Soft wind / breeze ---
            const breezeLen = 4 * audioCtx.sampleRate;
            const breezeBuf = audioCtx.createBuffer(2, breezeLen, audioCtx.sampleRate);
            for (let ch = 0; ch < 2; ch++) {
                const d = breezeBuf.getChannelData(ch);
                let prev = 0;
                for (let i = 0; i < breezeLen; i++) {
                    prev = (prev + 0.015 * (Math.random() * 2 - 1)) / 1.015;
                    const wave = Math.sin(i / audioCtx.sampleRate * 0.4 * Math.PI) * 0.5 + 0.5;
                    d[i] = prev * 2.5 * wave;
                }
            }
            const breezeSrc = audioCtx.createBufferSource();
            breezeSrc.buffer = breezeBuf;
            breezeSrc.loop = true;
            const breezeLp = audioCtx.createBiquadFilter();
            breezeLp.type = 'lowpass';
            breezeLp.frequency.value = 800;
            const breezeG = audioCtx.createGain();
            breezeG.gain.value = 0.08;
            breezeSrc.connect(breezeLp);
            breezeLp.connect(breezeG);
            breezeG.connect(master);
            breezeSrc.start();

            // --- Layer 4: Happy little bird chirps ---
            function scheduleBird() {
                if (!alive()) return;
                setTimeout(() => {
                    if (!alive()) return;
                    const t = audioCtx.currentTime;
                    const baseFreq = 1800 + Math.random() * 1200;
                    const chirps = 2 + Math.floor(Math.random() * 3);
                    for (let c = 0; c < chirps; c++) {
                        const osc = audioCtx.createOscillator();
                        osc.type = 'sine';
                        const startF = baseFreq + Math.random() * 400;
                        const endF = startF + 200 + Math.random() * 600;
                        const offset = c * 0.12;
                        osc.frequency.setValueAtTime(startF, t + offset);
                        osc.frequency.linearRampToValueAtTime(endF, t + offset + 0.06);
                        osc.frequency.linearRampToValueAtTime(startF * 0.95, t + offset + 0.1);
                        const env = audioCtx.createGain();
                        env.gain.setValueAtTime(0, t + offset);
                        env.gain.linearRampToValueAtTime(0.015, t + offset + 0.015);
                        env.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.1);
                        osc.connect(env);
                        env.connect(master);
                        osc.start(t + offset);
                        osc.stop(t + offset + 0.15);
                    }
                    scheduleBird();
                }, (8 + Math.random() * 15) * 1000);
            }
            scheduleBird();

            // --- Layer 5: Gentle music-box melody ---
            function scheduleMelody() {
                if (!alive()) return;
                setTimeout(() => {
                    if (!alive()) return;
                    const t = audioCtx.currentTime;
                    const steps = 3 + Math.floor(Math.random() * 4);
                    let noteIdx = Math.floor(Math.random() * penta.length);
                    for (let s = 0; s < steps; s++) {
                        noteIdx = Math.max(0, Math.min(penta.length - 1, noteIdx + Math.floor(Math.random() * 3) - 1));
                        const freq = penta[noteIdx];
                        const offset = s * 0.35;
                        const osc = audioCtx.createOscillator();
                        osc.type = 'triangle';
                        osc.frequency.value = freq;
                        const env = audioCtx.createGain();
                        env.gain.setValueAtTime(0, t + offset);
                        env.gain.linearRampToValueAtTime(0.025, t + offset + 0.01);
                        env.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.8);
                        osc.connect(env);
                        env.connect(master);
                        osc.start(t + offset);
                        osc.stop(t + offset + 1);
                    }
                    scheduleMelody();
                }, (10 + Math.random() * 18) * 1000);
            }
            scheduleMelody();

            return { gainNode: master };
        } catch (e) {
            console.warn('Audio not supported:', e);
            return null;
        }
    }

    let ambientNodes = null;

    if (ambientToggle) {
        ambientToggle.addEventListener('click', () => {
            if (!isPlaying) {
                if (!ambientNodes) ambientNodes = createCoffeeShopAmbience();
                if (!ambientNodes) return;
                ambientNodes.gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 1);
                isPlaying = true;
                ambientToggle.classList.add('active');
                ambientIconOff.style.display = 'none';
                ambientIconOn.style.display = 'inline';
            } else {
                ambientNodes.gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
                isPlaying = false;
                ambientToggle.classList.remove('active');
                ambientIconOff.style.display = 'inline';
                ambientIconOn.style.display = 'none';
            }
        });
    }

    // ---- Back to Top ----
    document.getElementById('backToTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 10, behavior: 'smooth' });
            }
        });
    });

    // ---- Easter Egg: Konami Code = Coffee Bean Rain ----
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                startCoffeeBeanRain();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function startCoffeeBeanRain() {
        const canvas = document.getElementById('easterEggCanvas');
        if (!canvas) return;
        canvas.style.display = 'block';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        const beans = [];
        for (let i = 0; i < 80; i++) {
            beans.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                size: 12 + Math.random() * 16,
                speed: 2 + Math.random() * 4,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.1,
                opacity: 0.6 + Math.random() * 0.4
            });
        }

        let frame = 0;
        function drawBean(b) {
            ctx.save();
            ctx.translate(b.x, b.y);
            ctx.rotate(b.rotation);
            ctx.globalAlpha = b.opacity;
            ctx.font = b.size + 'px serif';
            ctx.fillText('☕', -b.size / 2, b.size / 2);
            ctx.restore();
        }

        function animate() {
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            beans.forEach(b => {
                b.y += b.speed;
                b.rotation += b.rotSpeed;
                b.x += Math.sin(frame * 0.02 + b.speed) * 0.5;
                drawBean(b);
            });
            if (frame < 300) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.display = 'none';
            }
        }

        animate();
    }

    // Robust Lucide init with retry (CDN may be slow)
    function retryLucide(attempts) {
        if (attempts <= 0) return;
        setTimeout(() => {
            if (window.lucide) { lucide.createIcons(); }
            else { retryLucide(attempts - 1); }
        }, 500);
    }
    retryLucide(8);

})();
