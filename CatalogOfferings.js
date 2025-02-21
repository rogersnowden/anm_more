// CatalogOfferings  stuff to buy
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';

export default function CatalogOfferings({ books }) {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {books.length > 0 ? (
        books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={book.coverImageUrl || "/default-cover.jpg"}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.description}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                  Get this Book
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          No new books available.
        </Typography>
      )}
    </Grid>
  );
}