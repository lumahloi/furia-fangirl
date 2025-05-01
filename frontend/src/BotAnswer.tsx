import { Box, Typography, Avatar } from '@mui/material';

interface BotAnswerProps {
  message: string;
}

function BotAnswer({ message }: BotAnswerProps){
  return(
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Avatar alt="Chat Bot" src="/static/images/avatar/1.jpg" />
        <Typography variant="h6">Mascote</Typography>
      </Box>
      <Box sx={{ p: 2, backgroundColor: '#555555', borderRadius: 10, }}>
        <Typography variant="body1" sx={{ color: '#ffffff' }}>{message}</Typography>
      </Box>
  </Box>
  )
}

export default BotAnswer;