import { 
    Box, 
    Typography, 
    Paper, 
    TextField, 
    Avatar, 
    Button,
    Divider,
    Stack
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import PersonIcon from '@mui/icons-material/Person';

const ProfilePage = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    if (!user) {
        return (
            <Box sx={{ py: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    You are not logged in.
                </Typography>
            </Box>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <Box sx={{ 
            py: 6, 
            display: 'flex', 
            justifyContent: 'center',
            minHeight: '80vh'
        }}>
            <Paper elevation={3} sx={{ 
                p: 4, 
                width: '100%', 
                maxWidth: 500, 
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
            }}>
                <Avatar 
                    sx={{ 
                        width: 100, 
                        height: 100, 
                        bgcolor: 'primary.main'
                    }}
                >
                    <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>

                <Typography variant="h4" gutterBottom>
                    My Profile
                </Typography>

                <Divider sx={{ width: '100%' }} />

                <Stack spacing={3} sx={{ width: '100%' }}>
                    <TextField
                        label="Name"
                        name="name"
                        value={isEditing ? formData.name : (user.name || 'N/A')}
                        onChange={handleChange}
                        disabled={!isEditing}
                        fullWidth
                        variant="outlined"
                    />

                    <TextField
                        label="Email"
                        name="email"
                        value={user.email}
                        disabled
                        fullWidth
                        variant="outlined"
                        helperText="Email cannot be changed"
                    />

                    <TextField
                        label="Role"
                        value={user.role}
                        disabled
                        fullWidth
                        variant="outlined"
                    />

                    <Button 
                        variant="contained" 
                        onClick={() => setIsEditing(!isEditing)}
                        sx={{ mt: 2 }}
                    >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default ProfilePage;