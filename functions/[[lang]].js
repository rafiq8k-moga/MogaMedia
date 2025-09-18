export async function onRequest(context) {
  const { params } = context;
  const lang = params.lang || "id"; // default ID

  // load translations.json
  const url = new URL("/translations.json", context.request.url);
  const res = await fetch(url);
  const translations = await res.json();

  // fallback kalau bahasa nggak ada
  const dict = translations[lang] || translations["id"];

  // bikin HTML
  const html = `
  <!DOCTYPE html>
  <html lang="${lang}">
  <head>
    <meta charset="UTF-8">
    <title>${dict.site_title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-50 text-gray-900">
    <!-- 🌸 Navbar -->
    <header class="p-6 flex justify-between items-center bg-white shadow">
      <h1 class="text-2xl font-bold text-purple-600">MogaMediaID</h1>
      <nav class="flex gap-6">
        <a href="#services">${dict.nav.services}</a>
        <a href="#collab">${dict.nav.collab}</a>
        <a href="#portfolio">${dict.nav.portfolio}</a>
        <a href="#contact">${dict.nav.contact}</a>
      </nav>
      <div class="flex gap-2">
        <a href="/id/">🇮🇩</a>
        <a href="/en/">🇬🇧</a>
        <a href="/jp/">🇯🇵</a>
      </div>
    </header>

    <!-- 🌸 Hero -->
    <section class="text-center py-20 bg-gradient-to-r from-purple-100 to-pink-100">
      <h2 class="text-4xl font-extrabold mb-4">${dict.hero.title}</h2>
      <p class="max-w-2xl mx-auto mb-6">${dict.hero.desc}</p>
      <a href="#contact" class="bg-purple-600 text-white px-6 py-3 rounded shadow">${dict.hero.cta}</a>
    </section>

    <!-- 🌸 Layanan -->
    <section id="services" class="py-20 px-6 max-w-5xl mx-auto">
      <h3 class="text-3xl font-bold mb-10 text-center">${dict.services.title}</h3>
      <div class="grid md:grid-cols-3 gap-8">
        ${dict.services.items.map(s => `
          <div class="bg-white p-6 rounded-xl shadow">
            <h4 class="font-bold text-xl mb-2">${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- 🌸 Kolaborasi -->
    <section id="collab" class="py-20 px-6 bg-gray-100">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-3xl font-bold mb-6">${dict.collab.title}</h3>
        <p class="mb-6">${dict.collab.desc}</p>
        <a href="#contact" class="bg-pink-600 text-white px-6 py-3 rounded">${dict.collab.cta}</a>
      </div>
    </section>

    <!-- 🌸 Portofolio -->
    <section id="portfolio" class="py-20 px-6 max-w-5xl mx-auto">
      <h3 class="text-3xl font-bold mb-10 text-center">${dict.portfolio.title}</h3>
      <div class="grid md:grid-cols-3 gap-8">
        ${dict.portfolio.items.map(p => `
          <div class="bg-white p-6 rounded-xl shadow">
            <img src="${p.image}" alt="${p.title}" class="mb-4 rounded">
            <h4 class="font-bold text-lg">${p.title}</h4>
            <p>${p.desc}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- 🌸 Kontak -->
    <section id="contact" class="py-20 px-6 bg-purple-50">
      <div class="max-w-3xl mx-auto text-center">
        <h3 class="text-3xl font-bold mb-6">${dict.contact.title}</h3>
        <p class="mb-6">${dict.contact.desc}</p>
        <a href="mailto:mogamedia39@gmail.com" class="bg-purple-600 text-white px-6 py-3 rounded">${dict.contact.cta}</a>
      </div>
    </section>

    <footer class="p-6 text-center bg-white border-t mt-10">
      <p>&copy; 2025 MogaMediaID</p>
    </footer>
  </body>
  </html>
  `;

  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}
