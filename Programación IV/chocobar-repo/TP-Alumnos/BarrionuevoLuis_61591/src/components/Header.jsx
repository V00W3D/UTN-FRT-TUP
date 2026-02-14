import { AppBar, Toolbar, Typography, Avatar, Box, Button, Stack } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material'

export default function Header() {
  return (
    <Box sx={{ mb: 4 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Portfolio</Typography>
          <Stack direction="row" spacing={1}>
            <Button href="#estudios">Estudios</Button>
            <Button href="#proyectos">Proyectos</Button>
            <Button href="#experiencia">Experiencia</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 4 }}>
        <Avatar alt="Luis Barrionuevo" src="/profile.jpg" sx={{ width: 96, height: 96 }} />
        <Box>
          <Typography variant="h3" component="h1" fontWeight={700}>
            Luis Barrionuevo
          </Typography>
          <Typography variant="subtitle1">Backend / Data · San Miguel de Tucumán</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button startIcon={<GitHub />} href="https://github.com/tu_usuario" target="_blank">GitHub</Button>
            <Button startIcon={<LinkedIn />} href="https://www.linkedin.com/in/tu_usuario" target="_blank">LinkedIn</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
