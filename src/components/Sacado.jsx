import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

const Sacado = () => {
    const [nomeSacado, setNomeSacado] = useState(JSON.parse(sessionStorage.getItem('nomeSacado')) || "");
    const [endereco, setEndereco] = useState(JSON.parse(sessionStorage.getItem('enderecoSacado')) || "");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para salvar os dados do formulário
        sessionStorage.setItem('nomeSacado', JSON.stringify(nomeSacado));
        sessionStorage.setItem('enderecoSacado', JSON.stringify(endereco));
        toast.success('Dados salvos com sucesso!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <h3>Sacado</h3>
                <TextField
                    label="Nome do Sacado"
                    value={nomeSacado}
                    onChange={(event) => setNomeSacado(event.target.value)}
                />
                <TextField
                    label="Endereço"
                    value={endereco}
                    onChange={(event) => setEndereco(event.target.value)}
                />
                <Stack direction="row" spacing={2} justifyContent='space-between'>
                    <Button fullWidth type="submit" variant="contained" color="primary">
                        Salvar
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}

export default Sacado;