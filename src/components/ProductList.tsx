import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import apiClient from '../api/client';
import { Alert, CircularProgress, Stack } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeholderImage from '../assets/placeholder_400x400.svg';  // adjust path as needed
import { useDocumentTitle } from '../hooks/useDocumentTitle';

/**
 * Product interface defining the shape of product data
 * received from the API
 */
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
}

/**
 * ProductList component displays a grid of products fetched from the API
 * Features:
 * - Lazy loading images for better performance
 * - Loading states with spinner
 * - Error handling with alert messages
 * - Responsive grid layout using Material-UI
 * - Hover animations on cards
 */
const ProductList = () => {
    useDocumentTitle('Products');

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; // Cleanup flag

        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/products');
                if (isMounted) {
                    setProducts(response.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to load products. Please try again later.');
                    console.error('API Error:', err);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProducts();

        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, []);

    if (loading) {
        return (
            <Grid container justifyContent="center" sx={{ py: 4 }}>
                <CircularProgress />
            </Grid>
        );
    }

    if (error) {
        return (
            <Grid container justifyContent="center" sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Grid>
        );
    }

    return (
        <Grid container spacing={3} sx={{ px: { xs: 2, sm: 0 } }}>
            {products.map((product) => (
                <Grid size={{ xs: 12, md: 4, sm: 6 }} key={product.id}>
                    <Card sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s',
                        '&:hover': {
                            transform: 'scale(1.03)'
                        }
                    }}>
                        {/* Lazy-loaded Image */}
                        <LazyLoadImage
                            src={product.imageUrl || placeholderImage}
                            alt={product.name}
                            effect="blur" // Blur-to-load effect
                            placeholderSrc={placeholderImage} // Tiny placeholder (1-2KB)
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = placeholderImage;
                            }}
                            style={{
                                width: '100%',
                                height: '250px',
                                objectFit: 'contain',
                                padding: '1rem',
                                backgroundColor: '#f5f5f5'
                            }}
                        />

                        <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                        </CardContent>

                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1,
                                    backgroundColor: '#1976d2',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <ShoppingCartIcon />
                                    <span>Add to Cart</span>
                                </Stack>
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;