import { Typography, List, ListItem, ListItemText } from '@mui/material'

export default function Experiencia({ items = [] }) {
  return (
    <section>
      <Typography variant="h5" sx={{ mb: 1 }}>Experiencia</Typography>
      <List>
        {items.map((e, i) => (
          <ListItem key={i} disableGutters>
            <ListItemText primary={`${e.empresa} — ${e.puesto}`} secondary={e.periodo} />
          </ListItem>
        ))}
      </List>
    </section>
  )
}
