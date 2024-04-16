const SignInPage = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [loginUser, { loading, data, error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(formState.email)) {
            setEmailError('Invalid email format');
            return;
        }
        try {
            const response = await loginUser({
                variables: {
                    email: formState.email,
                    password: formState.password
                }
            });

            if (response.data.signIn.token) {
                localStorage.setItem('token', response.data.signIn.token);
                navigate('/pages/UserDashboardPage');
            } else {
                console.error('Login succeeded but no token received.');
            }
        } catch (error) {
            console.error('Sign in error:', error);
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmailError(validateEmail(value) ? '' : 'Invalid email format');
        }
        setFormState({ ...formState, [name]: value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ p: 3, mt: 7 }}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formState.email}
                        onChange={handleChange}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading || !!emailError}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                    {error && <Alert severity="error">{error.message || 'Login failed. Please check your credentials.'}</Alert>}
                </form>
            </Paper>
        </Container>
    );
};

export default SignInPage;
