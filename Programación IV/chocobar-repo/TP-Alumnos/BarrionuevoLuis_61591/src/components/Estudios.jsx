import { Typography, List, ListItem, ListItemText } from '@mui/material'

export default function Estudios({ items = [] }) {
  return (
    <section>
      <Typography variant="h5" sx={{ mb: 1 }}>Estudios</Typography>
      <List>
        {items.map((e, i) => (
          <ListItem key={i} disableGutters>
            <ListItemText primary={`${e.titulo} — ${e.institucion}`} secondary={e.anio} />
          </ListItem>
        ))}
      </List>
    </section>
  )
}
