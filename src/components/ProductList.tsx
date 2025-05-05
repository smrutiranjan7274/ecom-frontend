import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import apiClient from '../api/client';
import { Alert, CircularProgress } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * Product interface defining the shape of product data
 * received from the API
 */
interface Product {
    id: number;
    name: string;
    description: string;
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
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
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
                            src={product.imageUrl}
                            alt={product.name}
                            height={200}
                            width="100%"
                            effect="blur" // Blur-to-load effect
                            placeholderSrc="/placeholder-lowres.jpg" // Tiny placeholder (1-2KB)
                            style={{
                                objectFit: 'cover',
                                borderBottom: '1px solid rgba(0,0,0,0.1)',
                                minHeight: '200px'
                            }}
                        />


                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {product.description}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                        </CardContent>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 'auto',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0'
                                }
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;