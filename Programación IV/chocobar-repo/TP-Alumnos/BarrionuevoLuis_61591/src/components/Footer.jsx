import { Box, Link, Typography, Stack } from '@mui/material'

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, mt: 6, borderTop: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
        <Link href="#estudios">Estudios</Link>
        <Link href="#proyectos">Proyectos</Link>
        <Link href="#experiencia">Experiencia</Link>
        <Link href="https://github.com/tu_usuario" target="_blank">GitHub</Link>
        <Link href="https://www.linkedin.com/in/tu_usuario" target="_blank">LinkedIn</Link>
      </Stack>
      <Typography variant="caption">© {new Date().getFullYear()} Luis Barrionuevo</Typography>
    </Box>
  )
}
