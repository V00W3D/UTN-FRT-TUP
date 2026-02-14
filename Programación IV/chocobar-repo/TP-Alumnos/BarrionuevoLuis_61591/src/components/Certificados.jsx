import { Typography, List, ListItem, ListItemText } from '@mui/material'

export default function Certificados({ items = [] }) {
  return (
    <section>
      <Typography variant="h5" sx={{ mb: 1 }}>Certificados</Typography>
      <List>
        {items.map((c, i) => (
          <ListItem key={i} disableGutters>
            <ListItemText primary={c.nombre} secondary={`${c.entidad} · ${c.anio}`} />
          </ListItem>
        ))}
      </List>
    </section>
  )
}
