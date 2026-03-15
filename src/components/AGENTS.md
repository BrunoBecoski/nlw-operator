# Padrões de Componentes

## Estrutura de Componentes

```
src/
  components/
    ui/              # Componentes genéricos de UI (botões, inputs, etc.)
    navbar.tsx       # Componentes de layout específicos do app
    stats-bar.tsx   # Componentes de features
    ...
```

## Localização

- **Componentes genéricos de UI**: `src/components/ui/`
- **Componentes de features**: `src/components/`
- **Componentes de pages**: `src/app/[page]/`

## Padrões de Arquivos

### Componentes UI Genéricos

Use a estrutura de composição conforme `src/components/ui/AGENTS.md`:
- `*Root`, `*Header`, `*Content`, `*Footer`
- Named exports
- tailwind-variants para variantes

### Componentes de Features

Podem usar outros padrões conforme necessidade:
- Client components para interactivity
- Server components para SSR
- NumberFlow para animações de números

## export default vs Named Exports

- **Componentes UI genéricos**: sempre named exports
- **Page components**: pode usar default export
- **Feature components**: seguir necessidade (geralmente named exports)