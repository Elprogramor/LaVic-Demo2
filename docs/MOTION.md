# Motion — LaVic v0.2

## Princípios
Movimento deve comunicar identidade, hierarquia, feedback ou narrativa. A interface não deve estar permanentemente animada.

## Loader
- 1.5–2s.
- Fundo preto completamente estático.
- Apenas a logo é animada no vídeo aprovado: estrela gira e se encaixa no C; demais letras saem de trás do C; sem fade intermediário.
- Vídeo 720p WebM como principal e MP4 como fallback.
- Tocar apenas uma vez por sessão.
- A saída do loader acontece por movimento sólido da tela, não por fade da logo.

Arquivos esperados:
- `/public/media/lavic-loader.webm`
- `/public/media/lavic-loader.mp4`

## Durações
- Fast: 160ms
- Normal: 280ms
- Slow: 520ms
- Editorial: 800ms+
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`

## Acessibilidade
`prefers-reduced-motion` desativa o loader e minimiza transições.
