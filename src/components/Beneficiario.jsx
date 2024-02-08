import { Image } from "@mui/icons-material";
import { Stack, TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid, Input, IconButton } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

const Beneficiario = () => {
    const [nome, setNome] = useState(JSON.parse(sessionStorage.getItem('nomePix')) || "");
    const [tipoChavePix, setTipoChavePix] = useState(JSON.parse(sessionStorage.getItem('tipoChavePix')) || "");
    const [chavePix, setChavePix] = useState(JSON.parse(sessionStorage.getItem('chavePix')) || "");
    const [cidade, setCidade] = useState(JSON.parse(sessionStorage.getItem('cidade')) || "");
    const [imagem, setImagem] = useState(JSON.parse(sessionStorage.getItem('imagem')) || "");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        sessionStorage.setItem('nomePix', JSON.stringify(nome));
        sessionStorage.setItem('tipoChavePix', JSON.stringify(tipoChavePix));
        sessionStorage.setItem('chavePix', JSON.stringify(chavePix));
        sessionStorage.setItem('cidade', JSON.stringify(cidade));
        sessionStorage.setItem('imagem', JSON.stringify(imagem));

        toast.success('Beneficiário salvo com sucesso!')
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result;
            setImagem(base64)
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <h3>Beneficiário</h3>
            <TextField
                label="Nome do Beneficiário"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
            />
            <FormControl required>
                <InputLabel>Tipo da Chave Pix</InputLabel>
                <Select
                    label="Tipo da Chave Pix"
                    value={tipoChavePix}
                    onChange={(event) => setTipoChavePix(event.target.value)}
                >
                    <MenuItem value="cpf">CPF</MenuItem>
                    <MenuItem value="cnpj">CNPJ</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="telefone">Telefone</MenuItem>
                    <MenuItem value="aleatoria">Chave Aleatória</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Chave Pix"
                value={chavePix}
                onChange={(event) => setChavePix(event.target.value)}
                required
            />
            <TextField
                label="Cidade"
                value={cidade}
                onChange={(event) => setCidade(event.target.value)}
                required
            />
            <Stack direction="row" spacing={2} justifyContent='space-between'>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    inputProps={{ style: { display: 'none' } }}
                    id="upload-button" // Adicione o atributo id aqui
                    style={{ display: 'none' }}
                />
                <label htmlFor="upload-button">
                    <Button fullWidth variant="contained" size="small" component="span">
                        Carregar logomarca
                    </Button>
                </label>
                {imagem ? (
                    <img src={imagem} alt="Imagem carregada" style={{ width: '50px', height: '50px'}} />
                ) : (
                        <IconButton disabled>
                            <Image />
                        </IconButton>
                )}
            </Stack>
            <Stack direction="row" spacing={2} justifyContent='space-between'>
                <Button fullWidth variant="contained" color="primary" type="submit">
                    Salvar
                </Button>
            </Stack>
        </Stack>
    );
}

export default Beneficiario;