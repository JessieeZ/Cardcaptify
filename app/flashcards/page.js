'use client'

import { useUser } from '@clerk/nextjs'
import { use, useEffect, useState } from 'react'

import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import {db} from '@/firebase';
import { useRouter } from 'next/navigation'
import { Container, Typography,
  CardActionArea, Grid, Card, CardContent, AppBar, Toolbar, Button, Box
  } from '@mui/material'
import Image from "next/image"
import logo from '@/public/images/card.png'
import deck from '@/public/images/deck.png'
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  borderRadius: '20px',
  textTransform: 'none',
  padding: '10px 20px',
  backgroundColor: '#B2C3D3',
  fontFamily:'Cormorant Garamond, serif',
});

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      } 
      else {
        await setDoc(docRef, { flashcards: [] })
      }
    }
    getFlashcards()
  }, [user])

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  return (
    <Container maxWidth="100vw">

      <AppBar position="static" sx={{backgroundColor: '#B2C3D3'}}>
        <Toolbar>
            <Image src={logo} alt="Cardcaptify Logo" width={100} height={100} />
            <Typography variant="h6" style={{flexGrow: 1, fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem'}}>
                Cardcaptify
            </Typography>
            <StyledButton color="inherit" href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>Home</StyledButton>
        </Toolbar>
      </AppBar>

      <Box sx={{textAlign: 'center', my: 0}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem' }}
          >
            My Decks
          </Typography>
          <Image src={deck} alt="deck" width={100} height={100} />
        </Box>
        <StyledButton variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>
          Create a New Deck of Flashcards
        </StyledButton>
      </Box>
      <Grid container spacing = {3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => 
          <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardActionArea onClick={() => { handleCardClick(flashcard.name)}}>
              <CardContent>
                <Typography variant="h6" component="div" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem'}}>
                  {flashcard.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Grid>
          )}
      </Grid>
    </Container>
  )
}