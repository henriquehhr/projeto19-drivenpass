import app from "./index.js";

import dotenv from "dotenv";
dotenv.config();

const port = +process.env.PORT || 5001;
app.listen(port, () => console.log(`Server live at port: ${port}`));