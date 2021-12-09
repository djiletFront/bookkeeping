import React from "react"
import {Box, Button} from "@mui/material"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import {inputFileInterface} from "../../../types/inputFile.interface"
import "./index.scss"

const CustomInputFile = ({
	register,
	errors,
	name
}: inputFileInterface) => (
	<Box sx={{position: "relative"}}>
		<Button
			variant="contained"
			component="label"
			className="button-file"
		>
			<AddAPhotoIcon/>
			<input
				type="file"
				hidden
				accept="image/jpeg, image/png, image/jpg"
				{...register(name)}
			/>
		</Button>
		{
			!!errors?.[name]?.message &&
			<p className="file-error-text">
				{errors?.[name]?.message}
			</p>
		}
	</Box>
)


export default CustomInputFile
