'use client'

import { useState } from 'react'
import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  Paper,
  CardActionArea, Grid, Card, CardContent, AppBar, Toolbar
  } from '@mui/material'
import { styled } from '@mui/system';
import Image from "next/image"
import logo from '@/public/images/card.png'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'; 
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore';
import {db} from '@/firebase'; // Ensure you import your Firestore configuration


const StyledButton = styled(Button)({
  borderRadius: '20px',
  textTransform: 'none',
  padding: '10px 20px',
});

const StyledButton2 = styled(Button)({
  borderRadius: '20px',
  textTransform: 'none',
  padding: '10px 20px',
  backgroundColor: '#B2C3D3',
  fontFamily:'Cormorant Garamond, serif',
  fontSize: '1rem'
});


export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }

      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const saveFlashcards = async () => {
    if (!name.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }

    try {
      const batch = writeBatch(db)
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)

      if (userDocSnap.exists()) {
        const collections = userDocSnap.data().flashcards || []
        if (collections.find((f) => f.name === name)) {
          alert('Flashcard collection with the same name already exists.')
          return
        } else {
          collections.push({ name })
          batch.set(userDocRef, { flashcards: collections }, { merge: true })
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] })
      }
      
      const colRef = collection(userDocRef, name)
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
      })

      await batch.commit()
      alert('Flashcards saved successfully!')
      handleClose()
      setName('')
      router.push('/flashcards')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  return (
    <Container maxWidth="md">
      <AppBar position="static" sx={{backgroundColor: '#B2C3D3'}}>
        <Toolbar>
            <Image src={logo} alt="Cardcaptify Logo" width={100} height={100} />
            <Typography variant="h6" style={{flexGrow: 1, fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem'}}>
                Cardcaptify
            </Typography>
            <StyledButton color="inherit" href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>Home</StyledButton>
            <StyledButton color="inherit" href={isSignedIn ? "/flashcards" : "/sign-in"} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>
              {isSignedIn ? 'My Decks' : 'Login'}
            </StyledButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ my: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Generate Flashcards
        </Typography>
        <Paper sx={{ p: 4, width: '100%' }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
            InputLabelProps={{
              sx: {
                fontFamily: 'Cormorant Garamond, serif'
              },
            }}
          />
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          >
            <StyledButton2  onClick={handleSubmit}>
              Generate Flashcards
            </StyledButton2>
          </Box>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Flashcards Preview
          </Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: '1000px',
                          '& > div': {
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: '200px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                            transform: flipped[index]
                              ? 'rotateY(180deg)'
                              : 'rotateY(0deg)',
                          },
                          '& > div > div': {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            boxSizing: 'border-box'
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)',
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h5" component="div" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
            <StyledButton2 onClick={handleOpen}>
              Save
            </StyledButton2>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontFamily: 'Cormorant Garamond, serif' }}>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Please enter a name for your flashcard collection.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            InputLabelProps={{
              style: { fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }, 
            }}
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Cancel
          </Button>
          <Button onClick={saveFlashcards} color="primary" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}