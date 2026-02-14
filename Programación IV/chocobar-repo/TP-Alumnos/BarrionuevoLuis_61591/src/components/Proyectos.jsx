import { Typography, Grid, Card, CardContent, CardActions, Button, Chip, Stack } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

export default function Proyectos({ items = [] }) {
  return (
    <section>
      <Typography variant="h5" sx={{ mb: 1 }}>Proyectos</Typography>
      <Grid container spacing={2}>
        {items.map((p, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography variant="body2" sx={{ my: 1 }}>{p.description}</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {p.tech?.map((t, idx) => <Chip key={idx} label={t} size="small" />)}
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<LaunchIcon />} href={p.link} target="_blank">Ver repo</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  )
}
