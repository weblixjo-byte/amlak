// Cloudflare Pages Function API for Brands (MongoDB / Edge Sync)

let inMemoryStore = null;

export async function onRequestGet(context) {
  try {
    if (context.env.AMLAK_KV) {
      const data = await context.env.AMLAK_KV.get('brands');
      if (data) {
        return new Response(data, {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }
  } catch (e) {}

  return new Response(JSON.stringify(inMemoryStore || []), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

export async function onRequestPost(context) {
  try {
    const newItem = await context.request.json();
    let items = [];

    if (context.env.AMLAK_KV) {
      const existing = await context.env.AMLAK_KV.get('brands');
      items = existing ? JSON.parse(existing) : [];
      items.unshift(newItem);
      await context.env.AMLAK_KV.put('brands', JSON.stringify(items));
    } else {
      items = inMemoryStore || [];
      items.unshift(newItem);
      inMemoryStore = items;
    }

    return new Response(JSON.stringify(items), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function onRequestDelete(context) {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');
    let items = [];

    if (context.env.AMLAK_KV) {
      const existing = await context.env.AMLAK_KV.get('brands');
      items = existing ? JSON.parse(existing) : [];
      items = items.filter((item) => item.id !== id);
      await context.env.AMLAK_KV.put('brands', JSON.stringify(items));
    } else {
      items = (inMemoryStore || []).filter((item) => item.id !== id);
      inMemoryStore = items;
    }

    return new Response(JSON.stringify(items), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
