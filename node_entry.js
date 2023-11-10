import * as app from "./public/script.js";
import { data } from "./src/sampleData.js";

const workItem = app.getWorkItem(data);

app.ConsolePrintProject(workItem);

