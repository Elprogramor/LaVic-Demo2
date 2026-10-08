# Loader LaVic

Arquivos esperados pelo storefront:

- `lavic-loader.webm` (preferencial)
- `lavic-loader.mp4` (fallback)

Local:

`apps/storefront/public/media/`

Teste direto do asset:

- `http://localhost:3000/media/lavic-loader.webm`
- `http://localhost:3000/media/lavic-loader.mp4`

Para forçar a reprodução da intro durante o desenvolvimento use um fragmento de URL, não query string:

`http://localhost:3000/#intro`

ou

`http://localhost:3000/#intro=1`

O fragmento (`#intro`) não é enviado ao servidor Next.js, portanto não participa do roteamento e não pode provocar 404 da página.
