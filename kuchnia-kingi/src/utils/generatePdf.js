/**
 * Generates a beautifully formatted PDF for a recipe using html2pdf.js.
 * The layout targets A4, includes photo, ingredient grid, numbered steps,
 * and a branded footer.
 */
export async function generateRecipePdf(recipe) {
  const { default: html2pdf } = await import('html2pdf.js');

  const imageHtml = recipe.image
    ? `<img src="${recipe.image}" alt="${recipe.title}" style="width:100%;height:260px;object-fit:cover;border-radius:12px;display:block;margin-bottom:28px;" crossorigin="anonymous" />`
    : `<div style="width:100%;height:180px;background:linear-gradient(135deg,#f5e8d0,#edd9b5);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:28px;font-size:48px;">🍽</div>`;

  const ingredientsHtml = recipe.ingredients
    .map(
      (ing, i) => `
      <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid #f5e8d0;">
        <div style="min-width:22px;height:22px;background:#c06840;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
          <span style="color:white;font-size:10px;font-weight:700;">${i + 1}</span>
        </div>
        <span style="font-size:13px;color:#2d2d2d;line-height:1.5;">${ing}</span>
      </div>`
    )
    .join('');

  const stepsHtml = recipe.steps
    .map(
      (step, i) => `
      <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:18px;page-break-inside:avoid;">
        <div style="min-width:32px;height:32px;background:#1e1e1e;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
          <span style="color:white;font-size:13px;font-weight:700;">${i + 1}</span>
        </div>
        <p style="font-size:13.5px;color:#2d2d2d;line-height:1.7;margin:0;padding-top:5px;">${step}</p>
      </div>`
    )
    .join('');

  const categoryBadgeColor = {
    'Śniadanie': '#d97706',
    'Obiad': '#547045',
    'Kolacja': '#3b82f6',
    'Deser': '#db2777',
    'Przekąski': '#c06840',
  }[recipe.category] || '#c06840';

  const formattedDate = new Date(recipe.createdAt).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
          font-family:'Inter',sans-serif;
          background:white;
          color:#2d2d2d;
          padding:40px 48px;
          font-size:13px;
          line-height:1.6;
        }
        .serif { font-family:'Playfair Display',Georgia,serif; }
        .header-accent { color:#c06840; font-size:11px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:8px; }
        h1 { font-family:'Playfair Display',Georgia,serif; font-size:34px; font-weight:700; color:#111; line-height:1.2; margin-bottom:12px; }
        .meta-row { display:flex; align-items:center; gap:20px; margin-bottom:20px; flex-wrap:wrap; }
        .meta-item { display:flex; align-items:center; gap:6px; font-size:12px; color:#666; }
        .badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; }
        .description { font-size:14px; color:#555; line-height:1.7; font-style:italic; margin-bottom:28px; padding:16px 20px; background:#fdfaf5; border-left:3px solid #c06840; border-radius:0 8px 8px 0; }
        .section-title { font-family:'Playfair Display',Georgia,serif; font-size:20px; font-weight:600; color:#111; margin-bottom:14px; padding-bottom:8px; border-bottom:2px solid #f5e8d0; }
        .two-col { display:grid; grid-template-columns:1fr 1fr; gap:36px; margin-bottom:32px; }
        .ingredients-col {}
        .footer { margin-top:40px; padding-top:16px; border-top:1px solid #f5e8d0; display:flex; justify-content:space-between; align-items:center; }
        .footer-brand { font-family:'Playfair Display',Georgia,serif; font-size:13px; font-style:italic; color:#c06840; }
        .footer-date { font-size:11px; color:#aaa; }
      </style>
    </head>
    <body>
      <p class="header-accent">Kuchnia Kingi</p>
      ${imageHtml}

      <span class="badge" style="background:${categoryBadgeColor}20;color:${categoryBadgeColor};border:1px solid ${categoryBadgeColor}40;margin-bottom:10px;display:inline-block;">
        ${recipe.category}
      </span>
      <h1>${recipe.title}</h1>

      <div class="meta-row">
        <div class="meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c06840" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
          <span>${recipe.prepTime} minut</span>
        </div>
        <div class="meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c06840" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>${recipe.servings} porcji</span>
        </div>
      </div>

      ${recipe.description ? `<div class="description">${recipe.description}</div>` : ''}

      <div class="two-col">
        <div>
          <h2 class="section-title">Składniki</h2>
          ${ingredientsHtml}
        </div>
        <div style="page-break-inside:avoid;">
          <h2 class="section-title">Sposób przygotowania</h2>
          ${stepsHtml}
        </div>
      </div>

      <div class="footer">
        <span class="footer-brand">Z pamiętnika kulinarnego Kingi</span>
        <span class="footer-date">Dodano: ${formattedDate}</span>
      </div>
    </body>
    </html>
  `;

  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  document.body.appendChild(container);

  const opt = {
    margin: 0,
    filename: `${recipe.title.replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.92 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await html2pdf().set(opt).from(container.querySelector('body') || container).save();
  } finally {
    document.body.removeChild(container);
  }
}
