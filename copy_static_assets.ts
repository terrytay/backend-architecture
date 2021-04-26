import * as shell from "shelljs";

shell.cp("-R", ".env.dev","dist/");
shell.cp("-R", ".env.production", "dist/");

//shell.cp("-R", "src/public/js/lib", "dist/public/js/");
//shell.cp("-R", "src/public/fonts", "dist/public/");
//shell.cp("-R", "src/public/images", "dist/public/");

