import { useForm} from "react-hook-form";
import {
  Button,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      date: "",
      country: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert('Enviando datos')
    reset();
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "primary.main",
      }}
    >
      <Grid
        sx={{
          bgcolor: "white",
          p: { xs: 2, sm: 3 },
          m: { xs: 2, sm: 3 },
          borderRadius: 2,
          maxWidth: "500px",
        }}
      >
        <form onSubmit={onSubmit}>
          <TextField
            label="Nombre"
            type="text"
          
            fullWidth
            {...register("name", {
              required: {
                value: true,
                message: "Nombre es requerido",
              },
              minLength: {
                value: 3,
                message: "Nombre es demasiado corto",
              },
            })}
          />
          {errors.name && <span>{errors.name.message}</span>}

          <TextField
            label="Email"
            type="email"
           
            fullWidth
            sx={{ mt: 1 }}
            {...register("email", {
              required: {
                value: true,
                message: "Correo es requerido",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo no es valido",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <TextField
            label="Contraseña"
            type="password"
           
            fullWidth
            sx={{ mt: 1 }}
            {...register("password", { required: true })}
          />
          {errors.password && <span className="">Contraseña es requerido</span>}

          <TextField
            type="date"
            fullWidth
            sx={{ mt: 1 }}
            {...register("date", {
              required: {
                value: true,
                message: "Fecha es requerida",
              },
              validate: (value) => {
                const dateIngresada = new Date(value);
                const fechaActual = new Date();
                const edad =
                  fechaActual.getFullYear() - dateIngresada.getFullYear();
                return edad >= 18 ? true : "Debes ser mayor de edad";
              },
            })}
          />
          {errors.date && <span>{errors.date.message}</span>}

          <FormControl fullWidth  sx={{ mt: 1 }}>
            <InputLabel id="pais">Pais</InputLabel>
            <Select
              label="Pais"
              defaultValue=""
              {...register("country")}
            >
              <MenuItem value="ec">Ecuador</MenuItem>
              <MenuItem value="ar">Argentina</MenuItem>
              <MenuItem value="col">Colombia</MenuItem>
            </Select>
          </FormControl>
          
          {watch("country") === "ec" && (
            <>
              <TextField
                type="text"
                fullWidth
                label="Provincia"
                sx={{ mt: 1 }}
                {...register("provincia", {
                  required: {
                    value: true,
                    message: "Provincia es requerida",
                  },
                })}
              />
              {errors.provincia && <span>{errors.provincia.message}</span>}
              
            </>
          )}

          <Grid container justifyContent="center">
            <Grid size={{ xs: 10, sm: 6 }} sx={{ mt: 2 }}>
              <Button variant="contained" fullWidth type="submit">
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default App;
