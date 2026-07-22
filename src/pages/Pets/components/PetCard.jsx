import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography
} from "@mui/material";

import PetsIcon from "@mui/icons-material/Pets";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";

export default function PetCard({

    pet,

    onDoubleClick

}) {

    return (

        <Card

            elevation={3}

            sx={{

                borderRadius: 4,

                cursor: "pointer",

                transition: ".25s",

                "&:hover": {

                    transform: "translateY(-3px)",

                    boxShadow: 8

                }

            }}

            onDoubleClick={() => onDoubleClick(pet)}

        >

            <CardContent>

                <Stack

                    direction="row"

                    spacing={3}

                    alignItems="center"

                >

                    <Avatar

                        src={pet.photo}

                        sx={{

                            width: 80,

                            height: 80

                        }}

                    >

                        <PetsIcon sx={{ fontSize: 45 }} />

                    </Avatar>

                    <Box flex={1}>

                        <Typography

                            fontWeight={700}

                            fontSize={24}

                        >

                            {pet.name}

                        </Typography>

                        <Typography

                            color="text.secondary"

                            fontSize={18}

                        >

                            {pet.breed}

                        </Typography>

                        <Typography

                            mt={1}

                            fontSize={16}

                        >

                            Tutor:

                            <strong>

                                {" "}

                                {pet.owner}

                            </strong>

                        </Typography>

                    </Box>

                    <Stack

                        spacing={1}

                        alignItems="flex-end"

                    >

                        <Chip

                            color="success"

                            icon={<VaccinesIcon />}

                            label="Vacinas OK"

                        />

                        <Chip

                            color="primary"

                            icon={<MonitorWeightIcon />}

                            label={`${pet.weight} Kg`}

                        />

                        <Chip

                            label={pet.status}

                            color={

                                pet.status === "Hospedado"

                                    ? "warning"

                                    : "success"

                            }

                        />

                    </Stack>

                </Stack>

            </CardContent>

        </Card>

    );

}