export const chatBox = {
  display: 'flex',
  flexDirection: 'column',
  height: '90vh',
  marginTop: '40px',
  width: '100%',
  border: '1px solid #e0e0e0',
  borderRadius: 2,
  overflow: 'hidden',
  backgroundColor: '#fbfbfb'
}

export const userBubble = {
  p: 2, 
  backgroundColor: '#bebfbf', 
  borderRadius: 10,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word', 
  overflowWrap: 'break-word', 
  minWidth: '50px', 
  maxWidth: '100%', 
  display: 'inline-block'
}

export const chatBoxBox = {
  flexGrow: 1,
  overflowY: "auto",
  p: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
}

export const messageBox = {
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-end",
  maxWidth: "100%",
  width: "fit-content",
}

export const breakText = {
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
}

export const userInput = {
  p: 2,
  borderTop: "1px solid #e0e0e0",
  bgcolor: "background.paper",
}

export const buttonSubmit = {
  height: "56px",
  width: "56px",
  alignSelf: "flex-end",
  '&:focus': {
    color: '#363737',
  },
  color: '#080808',
  '&:hover': {
    transform: 'scale(1.1)',
  }
}