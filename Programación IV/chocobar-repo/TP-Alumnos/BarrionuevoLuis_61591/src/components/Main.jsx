import { Box, Typography, Divider } from '@mui/material'
import Estudios from './Estudios'
import SoftSkills from './SoftSkills'
import Proyectos from './Proyectos'
import Experiencia from './Experiencia'
import Idiomas from './Idiomas'
import Certificados from './Certificados'
import data from '../data/portfolio'

export default function Main() {
  const { profile, estudios, softSkills, proyectos, experiencia, idiomas, certificados } = data

  return (
    <Box component="main" sx={{ pb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>Sobre mí</Typography>
      <Typography sx={{ mb: 3 }}>{profile.about}</Typography>

      <Divider sx={{ my: 3 }} />
      <div id="estudios"><Estudios items={estudios} /></div>

      <Divider sx={{ my: 3 }} />
      <SoftSkills items={softSkills} />

      <Divider sx={{ my: 3 }} />
      <div id="proyectos"><Proyectos items={proyectos} /></div>

      <Divider sx={{ my: 3 }} />
      <div id="experiencia"><Experiencia items={experiencia} /></div>

      <Divider sx={{ my: 3 }} />
      <Idiomas items={idiomas} />

      <Divider sx={{ my: 3 }} />
      <Certificados items={certificados} />
    </Box>
  )
}
