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

export const profileImageContainer = {
  '& img': {
    borderRadius: '50%',
    width: 50,
    height: 50,
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
    }
  }
};

export const textFieldStyles = {
  transition: "all 0.3s ease",
  "& .MuiOutlinedInput-root": {
    color: "#3e3f3f",
    borderRadius: 4,
    "&.Mui-focused fieldset": {
      borderColor: "#363737",
    },
    "&:hover fieldset": {
      borderColor: "#5e6060",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#5e6060",
    opacity: 1,
  }
};

export const contactIcons = {
  color: "white",
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)',
    color: 'primary.main'
  }
};

export const sideBarContainer = {
  minHeight: '20vh',
  alignContent: 'start',
  marginTop: '50px'
};

export const contactInfoContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6
};

export const developerInfoContainer = {
  display: 'flex',
  flexDirection: 'row',
  gap: 3,
  alignContent: 'center',
  alignItems: 'center'
};