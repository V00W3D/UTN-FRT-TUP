import { Typography, Chip, Stack } from '@mui/material'

export default function SoftSkills({ items = [] }) {
  return (
    <section>
      <Typography variant="h5" sx={{ mb: 1 }}>Soft Skills</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {items.map((s, i) => (<Chip key={i} label={s} />))}
      </Stack>
    </section>
  )
}
