import { Typography, List, ListItem, ListItemText } from '@mui/material'

export default function Idiomas({ items = [] }) {
  return (
    <section>
      <Typography variant="h5" sx={{ mb: 1 }}>Idiomas</Typography>
      <List>
        {items.map((e, i) => (
          <ListItem key={i} disableGutters>
            <ListItemText primary={e.idioma} secondary={e.nivel} />
          </ListItem>
        ))}
      </List>
    </section>
  )
}
